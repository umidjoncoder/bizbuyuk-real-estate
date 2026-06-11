import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { phoneKey } from "@/lib/format";
import { normalizePref } from "@/lib/contact";

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  preferredContact?: string;
  locale?: string;
  page?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
  referrer?: string;
  /** honeypot — bots fill this, humans don't */
  company?: string;
};

// Work out a human-friendly lead source from UTM params or the referrer host,
// so the CRM shows "Facebook" / "Instagram" / "Google" instead of a blank.
function deriveSource(utm?: LeadBody["utm"], referrer?: string): string {
  const norm = (s: string) => {
    const v = s.toLowerCase();
    if (/(facebook|fb|meta)/.test(v)) return "Facebook";
    if (/(instagram|insta|ig)/.test(v)) return "Instagram";
    if (/(google|adwords|gads|youtube)/.test(v)) return "Google";
    if (/(tiktok)/.test(v)) return "TikTok";
    if (/(telegram|t\.me)/.test(v)) return "Telegram";
    return "";
  };
  if (utm?.source) {
    return norm(utm.source) || utm.source.charAt(0).toUpperCase() + utm.source.slice(1);
  }
  if (referrer) {
    try {
      const host = new URL(referrer).hostname.replace(/^www\./, "");
      const mapped = norm(host);
      if (mapped) return mapped;
      if (host) return host;
    } catch {
      /* malformed referrer */
    }
  }
  return "Website";
}

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
  const preferredContact = normalizePref(body.preferredContact);
  const locale = (body.locale || "—").slice(0, 5);

  // honeypot: silently accept & drop
  if (body.company) return NextResponse.json({ ok: true });

  const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || phone.replace(/\D/g, "").length < 7 || !emailValid) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const when = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dubai",
  }).format(new Date());

  const source = deriveSource(body.utm, body.referrer);

  // Save to CRM database — but don't create duplicates. A repeat inquiry from the
  // same phone is logged as a comment on the existing lead instead.
  try {
    const key = phoneKey(phone);
    let dup = null as any;
    if (key.length >= 7) {
      // Compare normalised keys in JS — stored phones may contain spaces/+ which
      // a DB substring match would miss.
      const candidates = await prisma.lead.findMany({ where: { archived: false }, select: { id: true, phone: true } });
      dup = candidates.find((c) => phoneKey(c.phone) === key) || null;
    }

    if (dup) {
      await prisma.comment.create({
        data: { leadId: dup.id, author: "Website", text: `Repeat website inquiry (${source})${preferredContact ? ` · prefers ${preferredContact}` : ""}${email ? ` · ${email}` : ""}` },
      });
      await prisma.auditLog.create({
        data: { action: "WEBSITE_LEAD", details: JSON.stringify({ name, phone, source, preferredContact, duplicate: true, mergedInto: dup.id }) },
      });
    } else {
      await prisma.lead.create({
        data: { name, phone, email: email || null, source, status: "NEW", preferredContact },
      });
      await prisma.auditLog.create({
        data: {
          action: "WEBSITE_LEAD",
          details: JSON.stringify({ name, phone, email, preferredContact, locale, source, utm: body.utm || null, referrer: body.referrer || null, page: body.page || null }),
        },
      });
    }
  } catch (dbErr) {
    console.error("[lead] Database insertion failed:", dbErr);
  }

  const results = await Promise.allSettled([
    sendTelegram({ name, phone, email, preferredContact, locale, when, source }),
    sendEmail({ name, phone, email, preferredContact, locale, when, source }),
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


type Lead = { name: string; phone: string; email: string; preferredContact: string | null; locale: string; when: string; source: string };

// Emoji + label for the preferred channel, used in the Telegram alert.
function prefBadge(pref: string | null): string {
  switch (pref) {
    case "Call": return "📞 Call";
    case "WhatsApp": return "🟢 WhatsApp";
    case "Telegram": return "✈️ Telegram";
    case "Email": return "✉️ Email";
    default: return "—";
  }
}

async function sendTelegram(lead: Lead): Promise<"sent" | "skipped"> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  // Supports one or many comma-separated chat ids (e.g. a personal chat + a channel).
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) return "skipped";

  // HTML parse mode (not Markdown) so dots/plus signs in emails & phones are
  // shown verbatim instead of escaped as "gmail\.com" / "\+998...".
  const text =
    `🏢 <b>New BIZBUYUK lead</b>\n\n` +
    `👤 <b>Name:</b> ${escapeHtml(lead.name)}\n` +
    `📞 <b>Phone:</b> ${escapeHtml(lead.phone)}\n` +
    (lead.email ? `✉️ <b>Email:</b> ${escapeHtml(lead.email)}\n` : "") +
    `💬 <b>Prefers:</b> ${escapeHtml(prefBadge(lead.preferredContact))}\n` +
    `📍 <b>Source:</b> ${escapeHtml(lead.source)}\n` +
    `🌐 <b>Language:</b> ${lead.locale.toUpperCase()}\n` +
    `🕒 <b>Time (Dubai):</b> ${escapeHtml(lead.when)}`;

  const sends = await Promise.allSettled(
    chatIds.map(async (chatId) => {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
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
        <tr><td style="padding:8px 0;color:#9c9488">Prefers</td><td style="padding:8px 0">${escapeHtml(prefBadge(lead.preferredContact))}</td></tr>
        <tr><td style="padding:8px 0;color:#9c9488">Source</td><td style="padding:8px 0">${escapeHtml(lead.source)}</td></tr>
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

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}
