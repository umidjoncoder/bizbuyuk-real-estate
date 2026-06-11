import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role, TaskStatus } from "@prisma/client";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

function nextDeadline(from: Date | null, type: string): Date {
  const base = from && !isNaN(from.getTime()) ? new Date(from) : new Date();
  if (type === "WEEKLY") base.setDate(base.getDate() + 7);
  else if (type === "MONTHLY") base.setMonth(base.getMonth() + 1);
  else base.setDate(base.getDate() + 1); // DAILY / default
  return base;
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    const body = await req.json();
    const { status, title, description, type, deadline, assignedToId, recurring } = body;

    const isManager = user.role !== Role.BROKER && user.role !== Role.DRIVER;
    const editingFields =
      title !== undefined || description !== undefined || type !== undefined ||
      deadline !== undefined || assignedToId !== undefined || recurring !== undefined;

    // Broker / Driver may only change the status of their OWN tasks, nothing else.
    if (!isManager) {
      if (task.assignedToId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      if (editingFields) return NextResponse.json({ error: "Forbidden: cannot edit task fields" }, { status: 403 });
    }

    const data: any = {};
    if (status !== undefined) data.status = status;
    if (isManager) {
      if (title !== undefined && title.trim()) data.title = title.trim();
      if (description !== undefined) data.description = description ? description.trim() : null;
      if (type !== undefined) data.type = type;
      if (deadline !== undefined) data.deadline = deadline ? new Date(deadline) : null;
      if (recurring !== undefined) data.recurring = !!recurring;
      if (assignedToId !== undefined && assignedToId) {
        const assignee = await prisma.user.findUnique({ where: { id: assignedToId } });
        if (!assignee) return NextResponse.json({ error: "Assignee not found" }, { status: 400 });
        if (assignee.isActive === false) return NextResponse.json({ error: "Assignee is deactivated" }, { status: 400 });
        data.assignedToId = assignedToId;
      }
    }

    const updated = await prisma.task.update({ where: { id }, data });

    // Recurring tasks spawn the next occurrence when completed.
    if (status === TaskStatus.DONE && task.status !== TaskStatus.DONE && updated.recurring) {
      await prisma.task.create({
        data: {
          title: updated.title,
          description: updated.description,
          type: updated.type,
          status: TaskStatus.TODO,
          recurring: true,
          deadline: nextDeadline(updated.deadline, updated.type),
          assignedToId: updated.assignedToId,
          creatorId: updated.creatorId,
        },
      });
    }

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: editingFields ? "UPDATE_TASK" : "UPDATE_TASK_STATUS",
        details: JSON.stringify(editingFields ? { taskId: id, changed: Object.keys(data) } : { taskId: id, status }),
      },
    });

    return NextResponse.json({ success: true, task: updated });
  } catch (err) {
    console.error("PUT Task error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: remove a task (managers only).
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role === Role.BROKER || user.role === Role.DRIVER) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    await prisma.task.delete({ where: { id } });

    await prisma.auditLog.create({
      data: { userId: user.id, action: "DELETE_TASK", details: JSON.stringify({ taskId: id, title: task.title }) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE Task error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
