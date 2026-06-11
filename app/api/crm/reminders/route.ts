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

// GET: all reminders for the current user (own reminders only), newest-due first.
// Read-only — the notification bell polls this.
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const reminders = await prisma.reminder.findMany({
      where: { userId: user.id, done: false },
      include: {
        lead: { select: { id: true, name: true, phone: true } },
        task: { select: { id: true, title: true } },
        comment: { select: { id: true, text: true } },
      },
      orderBy: { remindAt: "asc" },
    });

    return NextResponse.json({ reminders });
  } catch (err) {
    console.error("GET Reminders error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: create a reminder for myself attached to a lead/comment/task.
export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { message, remindAt, leadId, commentId, taskId } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Reminder message is required" }, { status: 400 });
    }
    if (!remindAt) {
      return NextResponse.json({ error: "Reminder date is required" }, { status: 400 });
    }

    const when = new Date(remindAt);
    if (isNaN(when.getTime())) {
      return NextResponse.json({ error: "Invalid reminder date" }, { status: 400 });
    }

    // If a lead is referenced, make sure the user is actually allowed to see it
    // (brokers can only attach reminders to their own leads).
    if (leadId) {
      const lead = await prisma.lead.findUnique({ where: { id: leadId }, select: { brokerId: true } });
      if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      if (user.role === "BROKER" && lead.brokerId !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
    // If a task is referenced, it must be one assigned to this user.
    if (taskId) {
      const task = await prisma.task.findUnique({ where: { id: taskId }, select: { assignedToId: true } });
      if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
      if ((user.role === "BROKER" || user.role === "DRIVER") && task.assignedToId !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const reminder = await prisma.reminder.create({
      data: {
        userId: user.id,
        message: message.trim(),
        remindAt: when,
        leadId: leadId || null,
        commentId: commentId || null,
        taskId: taskId || null,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CREATE_REMINDER",
        details: JSON.stringify({ reminderId: reminder.id, remindAt: when.toISOString(), leadId, commentId, taskId }),
      },
    });

    return NextResponse.json({ success: true, reminder });
  } catch (err) {
    console.error("POST Reminder error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
