import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role } from "@prisma/client";

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

    let leads;
    if (user.role === Role.BROKER) {
      // Brokers only see their own assigned leads
      leads = await prisma.lead.findMany({
        where: { brokerId: user.id },
        include: {
          broker: { select: { fullName: true, id: true } },
          comments: { orderBy: { createdAt: "desc" } },
          properties: { include: { property: true } },
          history: { orderBy: { createdAt: "desc" } },
        },
        orderBy: { updatedAt: "desc" },
      });
    } else {
      // Owners, Admins, Sales Directors, Marketing Directors see all leads.
      // Marketing only needs sources/analytics — it must NOT read brokers'
      // private client comments or the edit history, so we omit those relations.
      const includePrivate = user.role !== Role.MARKETING_DIRECTOR;
      leads = await prisma.lead.findMany({
        include: {
          broker: { select: { fullName: true, id: true } },
          properties: { include: { property: true } },
          ...(includePrivate
            ? {
                comments: { orderBy: { createdAt: "desc" } },
                history: { orderBy: { createdAt: "desc" } },
              }
            : {}),
        },
        orderBy: { updatedAt: "desc" },
      });

      // Ensure the client always receives the arrays (empty for Marketing).
      if (!includePrivate) {
        leads = leads.map((l) => ({ ...l, comments: [], history: [] }));
      }
    }

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

    const { name, phone, email, budget, source, propertyIds, force } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    // Clean phone number format for check (digits only or direct string check)
    const cleanPhone = phone.trim();

    // Duplicate Check
    const existing = await prisma.lead.findFirst({
      where: { phone: cleanPhone },
      include: { broker: { select: { fullName: true } } },
    });

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
        budget: budget ? parseFloat(budget) : null,
        source: source || "Manual",
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
