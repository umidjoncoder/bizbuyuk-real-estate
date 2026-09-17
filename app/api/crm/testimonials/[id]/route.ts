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

const CAN_MODERATE = [Role.OWNER, Role.ADMIN, Role.MARKETING_DIRECTOR];

// PUT: approve or reject a submission.
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!CAN_MODERATE.includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const { status } = await req.json();
    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { status, reviewedById: user.id },
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: "MODERATE_TESTIMONIAL", details: JSON.stringify({ name: existing.name, status }) },
    });

    return NextResponse.json({ testimonial });
  } catch (err) {
    console.error("PUT CRM Testimonial error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!CAN_MODERATE.includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.testimonial.delete({ where: { id } });
    await prisma.auditLog.create({
      data: { userId: user.id, action: "DELETE_TESTIMONIAL", details: JSON.stringify({ name: existing.name }) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE CRM Testimonial error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
