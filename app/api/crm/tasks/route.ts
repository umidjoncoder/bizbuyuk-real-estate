import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role, TaskType, TaskStatus } from "@prisma/client";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let tasks;

    if (user.role === Role.DRIVER) {
      // Drivers only see logistics tasks assigned to them
      tasks = await prisma.task.findMany({
        where: {
          assignedToId: user.id,
          type: TaskType.LOGISTICS,
        },
        include: {
          assignedTo: { select: { fullName: true, role: true } },
          creator: { select: { fullName: true } },
        },
        orderBy: { deadline: "asc" },
      });
    } else if (user.role === Role.BROKER) {
      // Brokers only see their own assigned tasks
      tasks = await prisma.task.findMany({
        where: {
          assignedToId: user.id,
        },
        include: {
          assignedTo: { select: { fullName: true, role: true } },
          creator: { select: { fullName: true } },
        },
        orderBy: { deadline: "asc" },
      });
    } else {
      // Directors and Admins see all tasks
      tasks = await prisma.task.findMany({
        include: {
          assignedTo: { select: { fullName: true, role: true } },
          creator: { select: { fullName: true } },
        },
        orderBy: { deadline: "asc" },
      });
    }

    return NextResponse.json({ tasks });
  } catch (err: any) {
    console.error("GET Tasks error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Driver and Broker cannot assign tasks to others
    if (user.role === Role.DRIVER || user.role === Role.BROKER) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { title, description, type, deadline, assignedToId, recurring } = await req.json();

    if (!title || !assignedToId) {
      return NextResponse.json({ error: "Title and Assignee are required" }, { status: 400 });
    }

    const assignee = await prisma.user.findUnique({
      where: { id: assignedToId },
    });

    if (!assignee) {
      return NextResponse.json({ error: "Assignee not found" }, { status: 400 });
    }
    if (assignee.isActive === false) {
      return NextResponse.json({ error: "Cannot assign a task to a deactivated employee" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : null,
        type: type || TaskType.DAILY,
        recurring: !!recurring,
        deadline: deadline ? new Date(deadline) : null,
        assignedToId,
        creatorId: user.id,
      },
    });

    // Write audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CREATE_TASK",
        details: JSON.stringify({ taskId: newTask.id, title: newTask.title, assignee: assignee.fullName }),
      },
    });

    // Send email notification to assignee's email via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.LEAD_EMAIL_FROM || "BIZBUYUK <leads@bizbuyuk.com>";
    
    if (resendApiKey && assignee.email) {
      const formattedDeadline = deadline
        ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(deadline))
        : "No Deadline";
 
      const htmlContent = `
        <div style="font-family:Helvetica,Arial,sans-serif;background:#08080a;color:#f3ede1;padding:32px;border-radius:12px;max-width:520px;border:1px solid #c8a15a">
          <h2 style="color:#c8a15a;font-weight:400;letter-spacing:1px">New Task Assigned</h2>
          <p>You have been assigned a new task:</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr><td style="padding:8px 0;color:#9c9488">Subject:</td><td style="padding:8px 0;font-weight:bold">${newTask.title}</td></tr>
            <tr><td style="padding:8px 0;color:#9c9488">Description:</td><td style="padding:8px 0">${newTask.description || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#9c9488">Type:</td><td style="padding:8px 0">${newTask.type}</td></tr>
            <tr><td style="padding:8px 0;color:#9c9488">Deadline:</td><td style="padding:8px 0;color:#c8a15a">${formattedDeadline}</td></tr>
            <tr><td style="padding:8px 0;color:#9c9488">Assigned By:</td><td style="padding:8px 0">${user.fullName}</td></tr>
          </table>
          <div style="margin-top:24px;text-align:center">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/crm/tasks" 
               style="background:#c8a15a;color:#08080a;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block">
              Open CRM
            </a>
          </div>
        </div>`;
 
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [assignee.email],
            subject: `New Task: ${newTask.title}`,
            html: htmlContent,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send task email notification:", emailErr);
      }
    }
 
    return NextResponse.json({ success: true, task: newTask });
  } catch (err: any) {
    console.error("POST Task Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
