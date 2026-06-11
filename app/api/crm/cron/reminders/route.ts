import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

// Vercel Cron hits this endpoint (see vercel.json). It emails users about
// reminders that are now due and haven't been notified yet. Best-effort:
// if Resend isn't configured it simply marks them notified so the in-CRM
// bell remains the source of truth.
export async function GET(req: Request) {
  // Protect the endpoint (fail closed): Vercel Cron sends
  // `Authorization: Bearer <CRON_SECRET>`. Without a configured secret the
  // endpoint refuses to run so it can never be triggered anonymously.
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 503 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Include reminders that came due in the recent past too, to tolerate clock
  // skew and missed cron ticks.
  const now = new Date();
  const due = await prisma.reminder.findMany({
    where: { done: false, notified: false, remindAt: { lte: now } },
    include: {
      user: { select: { email: true, fullName: true } },
      lead: { select: { name: true, phone: true } },
    },
    take: 100,
  });

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.LEAD_EMAIL_FROM || "BIZBUYUK <leads@bizbuyuk.com>";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  let sent = 0;
  for (const r of due) {
    if (resendApiKey && r.user?.email) {
      const ctx = r.lead ? `${r.lead.name} (${r.lead.phone})` : "";
      const html = `
        <div style="font-family:Helvetica,Arial,sans-serif;background:#0d0d10;color:#f3ede1;padding:32px;border-radius:12px;max-width:520px;border:1px solid #c8a15a">
          <h2 style="color:#c8a15a;font-weight:600;letter-spacing:1px">⏰ Reminder</h2>
          <p style="font-size:16px;margin:16px 0">${escapeHtml(r.message)}</p>
          ${ctx ? `<p style="color:#9c9488">Client: ${escapeHtml(ctx)}</p>` : ""}
          <div style="margin-top:24px">
            <a href="${appUrl}/crm/leads" style="background:#c8a15a;color:#08080a;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">Open CRM</a>
          </div>
        </div>`;
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: fromEmail,
            to: [r.user.email],
            subject: `⏰ Reminder: ${r.message.slice(0, 60)}`,
            html,
          }),
        });
        if (res.ok) sent++;
      } catch (e) {
        console.error("[cron][reminder email]", e);
      }
    }
  }

  // Mark all due reminders as notified (in-CRM bell still shows them until done).
  const ids = due.map((d) => d.id);
  if (ids.length) {
    await prisma.reminder.updateMany({ where: { id: { in: ids } }, data: { notified: true } });
  }

  return NextResponse.json({ processed: due.length, emailed: sent });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}
