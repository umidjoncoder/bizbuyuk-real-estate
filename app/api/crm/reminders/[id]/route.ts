import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

// PUT: dismiss / mark a reminder done (only the owner of the reminder).
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json().catch(() => ({}));

    const reminder = await prisma.reminder.findUnique({ where: { id } });
    if (!reminder) return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
    if (reminder.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.reminder.update({
      where: { id },
      data: {
        done: body.done !== undefined ? !!body.done : true,
        ...(body.notified !== undefined ? { notified: !!body.notified } : {}),
      },
    });

    return NextResponse.json({ success: true, reminder: updated });
  } catch (err) {
    console.error("PUT Reminder error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: remove a reminder entirely (only its owner).
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const reminder = await prisma.reminder.findUnique({ where: { id } });
    if (!reminder) return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
    if (reminder.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.reminder.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE Reminder error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
