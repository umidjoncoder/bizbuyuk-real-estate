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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { status } = await req.json();

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Security check: Broker/Driver can only change status of tasks assigned to themselves
    if (
      (user.role === Role.BROKER || user.role === Role.DRIVER) &&
      task.assignedToId !== user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
    });

    // Write audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "UPDATE_TASK_STATUS",
        details: JSON.stringify({ taskId: id, status }),
      },
    });

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (err: any) {
    console.error("PUT Task detail Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
