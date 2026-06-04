import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  locale?: string;
  page?: string;
  /** honeypot — bots fill this, humans don't */
  company?: string;
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, 120);
  const phone = (body.phone || "").trim().slice(0, 40);
  const email = (body.email || "").trim().slice(0, 160);
  const locale = (body.locale || "—").slice(0, 5);

  // honeypot: silently accept & drop
  if (body.company) return NextResponse.json({ ok: true });

  if (!name || phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const when = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dubai",
  }).format(new Date());

  const results = await Promise.allSettled([
    sendTelegram({ name, phone, email, locale, when }),
    sendEmail({ name, phone, email, locale, when }),
  ]);

  const configured = results.filter((r) => r.status === "fulfilled" && r.value !== "skipped");
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === "sent");

  // No channel configured yet (e.g. preview before env is set): accept so the
  // form works, but make it visible in server logs.
  if (configured.length === 0) {
    console.warn("[lead] No delivery channel configured. Lead:", { name, phone, locale, when });
    return NextResponse.json({ ok: true, note: "logged" });
  }

  if (!delivered) {
    console.error("[lead] All configured channels failed", results);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

type Lead = { name: string; phone: string; email: string; locale: string; when: string };

async function sendTelegram(lead: Lead): Promise<"sent" | "skipped"> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  // Supports one or many comma-separated chat ids (e.g. a personal chat + a channel).
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) return "skipped";

  const text =
    `🏢 *New BIZBUYUK lead*\n\n` +
    `👤 *Name:* ${escapeMd(lead.name)}\n` +
    `📞 *Phone:* ${escapeMd(lead.phone)}\n` +
    (lead.email ? `✉️ *Email:* ${escapeMd(lead.email)}\n` : "") +
    `🌐 *Language:* ${lead.locale.toUpperCase()}\n` +
    `🕒 *Time (Dubai):* ${escapeMd(lead.when)}`;

  const sends = await Promise.allSettled(
    chatIds.map(async (chatId) => {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`telegram ${chatId} ${res.status} ${body.slice(0, 140)}`);
      }
      return chatId;
    })
  );

  for (const r of sends) {
    if (r.status === "rejected") console.error("[lead][telegram]", r.reason?.message || r.reason);
  }
  // Delivered if at least one chat id received the message.
  if (!sends.some((r) => r.status === "fulfilled")) {
    throw new Error("telegram: all chat ids failed");
  }
  return "sent";
}

async function sendEmail(lead: Lead): Promise<"sent" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO || "info@bizbuyuk.com";
  const from = process.env.LEAD_EMAIL_FROM; // e.g. "BIZBUYUK <leads@bizbuyuk.com>"
  if (!apiKey || !from) return "skipped";

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;background:#08080a;color:#f3ede1;padding:32px;border-radius:12px;max-width:520px">
      <h2 style="color:#c8a15a;font-weight:400;letter-spacing:1px">New consultation request</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        <tr><td style="padding:8px 0;color:#9c9488">Name</td><td style="padding:8px 0">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#9c9488">Phone</td><td style="padding:8px 0">${escapeHtml(lead.phone)}</td></tr>
        ${lead.email ? `<tr><td style="padding:8px 0;color:#9c9488">Email</td><td style="padding:8px 0">${escapeHtml(lead.email)}</td></tr>` : ""}
        <tr><td style="padding:8px 0;color:#9c9488">Language</td><td style="padding:8px 0">${lead.locale.toUpperCase()}</td></tr>
        <tr><td style="padding:8px 0;color:#9c9488">Time (Dubai)</td><td style="padding:8px 0">${escapeHtml(lead.when)}</td></tr>
      </table>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New lead — ${lead.name} (${lead.phone})`,
      ...(lead.email ? { reply_to: lead.email } : {}),
      html,
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
  return "sent";
}

function escapeMd(s: string) {
  return s.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}
function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}
