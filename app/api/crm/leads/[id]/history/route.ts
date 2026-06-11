import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role } from "@prisma/client";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

// GET: full edit history for a lead.
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // Drivers and Marketing must not read edit history of brokers' leads.
    if (user.role === Role.DRIVER || user.role === Role.MARKETING_DIRECTOR) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const lead = await prisma.lead.findUnique({ where: { id }, select: { brokerId: true } });
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    if (user.role === Role.BROKER && lead.brokerId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const history = await prisma.leadHistory.findMany({
      where: { leadId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ history });
  } catch (err) {
    console.error("GET Lead history error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT: acknowledge (mark seen) all edit-history entries for a lead. Clears the
// red "unreviewed change" highlight. Only Owner / Admin can acknowledge.
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER && user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.leadHistory.updateMany({
      where: { leadId: id, seen: false },
      data: { seen: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT Lead history error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
