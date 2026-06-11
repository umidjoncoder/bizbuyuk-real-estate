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

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: leadId } = await params;
    const { text, remindAt, reminderMessage } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Comment text is required" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // Broker can only comment on their own leads
    if (user.role === Role.BROKER && lead.brokerId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // Marketing Director cannot view/add private comments on brokers' personal leads
    if (user.role === Role.MARKETING_DIRECTOR) {
      return NextResponse.json({ error: "Forbidden: Marketing cannot see or add broker comments" }, { status: 403 });
    }

    const comment = await prisma.comment.create({
      data: {
        leadId,
        authorId: user.id,
        author: user.fullName,
        text: text.trim(),
      },
    });

    // Optionally attach a reminder to this comment (e.g. "call client in 28 days")
    let reminder = null;
    if (remindAt) {
      const when = new Date(remindAt);
      if (!isNaN(when.getTime())) {
        reminder = await prisma.reminder.create({
          data: {
            userId: user.id,
            message: (reminderMessage && reminderMessage.trim()) || `${lead.name}: ${text.trim().slice(0, 80)}`,
            remindAt: when,
            leadId,
            commentId: comment.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true, comment, reminder });
  } catch (err: any) {
    console.error("POST comment Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
