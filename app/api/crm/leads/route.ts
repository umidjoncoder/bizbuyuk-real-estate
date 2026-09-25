import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { phoneKey } from "@/lib/format";
import { normalizePref } from "@/lib/contact";
import { Prisma, Role } from "@prisma/client";

// Get current session helper
async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export async function GET(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Driver cannot access leads
    if (user.role === Role.DRIVER) {
      return NextResponse.json({ leads: [] });
    }

    // ?archived=1 shows the archive (Owner only); default shows active leads.
    const wantArchived = new URL(req.url).searchParams.get("archived") === "1";
    const archived = wantArchived && user.role === Role.OWNER;

    // Reminders are personal — include only the current user's pending ones so
    // each comment can show its own ⏰ badge.
    const myReminders = { where: { userId: user.id, done: false } } as const;

    // The list carries only counts of comments and unreviewed edits; the texts
    // load per lead from GET /api/crm/leads/[id] when its drawer opens. Sending
    // every comment and every edit ever made on each load was ~2.7 MB a click
    // and ran the database's monthly transfer allowance out.
    const include = {
      broker: { select: { fullName: true, id: true } },
      properties: { include: { property: true } },
      reminders: myReminders,
      _count: { select: { comments: true, history: { where: { seen: false } } } },
    } satisfies Prisma.LeadInclude;

    // Brokers only see their own assigned, non-archived leads. Owners, Admins,
    // Sales and Marketing Directors see all leads.
    const rows = await prisma.lead.findMany({
      where: user.role === Role.BROKER ? { brokerId: user.id, archived: false } : { archived },
      include,
      orderBy: { updatedAt: "desc" },
    });

    // Marketing only needs sources/analytics — it must NOT learn anything about
    // brokers' private client comments or the edit history, not even counts.
    const includePrivate = user.role !== Role.MARKETING_DIRECTOR;
    const leads = rows.map(({ _count, ...lead }) => ({
      ...lead,
      commentCount: includePrivate ? _count.comments : 0,
      unseenHistory: includePrivate ? _count.history : 0,
    }));

    return NextResponse.json({ leads });
  } catch (err: any) {
    console.error("GET Leads API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Drivers/Marketing Directors cannot manually create leads
    if (user.role === Role.DRIVER || user.role === Role.MARKETING_DIRECTOR) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { name, phone, email, hotel, budget, source, preferredContact, propertyIds, force } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    // Hotel is mandatory for leads entered through the CRM. Website leads come
    // in via /api/lead, which has no hotel to ask for, so the column stays
    // nullable and the rule lives here rather than in the schema.
    const cleanHotel = typeof hotel === "string" ? hotel.trim() : "";
    if (!cleanHotel) {
      return NextResponse.json({ error: "Hotel name is required" }, { status: 400 });
    }

    const cleanPhone = phone.trim();

    // Duplicate check by normalised phone (last 9 digits) so "+998 90 123 45 67",
    // "998901234567" and "0901234567" all collide.
    const key = phoneKey(cleanPhone);
    let existing = null as any;
    if (key.length >= 7) {
      // Compare normalised keys in JS (stored phones may have spaces / +).
      const candidates = await prisma.lead.findMany({
        where: { archived: false },
        select: { id: true, phone: true, name: true, createdAt: true, broker: { select: { fullName: true } } },
      });
      existing = candidates.find((c) => phoneKey(c.phone) === key) || null;
    }

    if (existing && !force) {
      const timeDiff = Math.abs(Date.now() - existing.createdAt.getTime());
      const monthsDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 30));
      return NextResponse.json({
        warning: "duplicate",
        message: `Bu telefon raqami allaqachon tizimda mavjud. Mijoz ${monthsDiff} oy oldin ${
          existing.broker?.fullName || "Boshqa xodim"
        } tomonidan kiritilgan.`,
      }, { status: 409 });
    }

    // Create the lead
    const newLead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: cleanPhone,
        email: email ? email.trim() : null,
        hotel: cleanHotel,
        budget: budget ? parseFloat(budget) : null,
        source: source || "Manual",
        preferredContact: normalizePref(preferredContact),
        // If Broker creates, auto-assign to self, otherwise assign to specified or leave null
        brokerId: user.role === Role.BROKER ? user.id : null,
        creatorId: user.id,
      },
    });

    // Link properties if provided
    if (propertyIds && Array.isArray(propertyIds) && propertyIds.length > 0) {
      await prisma.leadProperty.createMany({
        data: propertyIds.map((pid: string) => ({
          leadId: newLead.id,
          propertyId: pid,
        })),
      });
    }

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CREATE_LEAD",
        details: JSON.stringify({ leadId: newLead.id, name: newLead.name, phone: newLead.phone }),
      },
    });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: any) {
    console.error("POST Lead API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
