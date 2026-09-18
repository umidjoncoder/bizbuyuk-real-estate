import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { COUNTRIES, flagEmoji } from "@/lib/countries";

const VALID_LANGS = ["ru", "ar", "uz", "en", "az"];

// GET: approved, visitor-submitted reviews — merged client-side with the
// curated launch quotes in lib/testimonials.ts.
export async function GET() {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, city: true, flag: true, lang: true, rating: true, service: true, quote: true },
    });
    return NextResponse.json({ testimonials: rows });
  } catch (err) {
    console.error("GET Testimonials error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: a visitor submits their own review. Never shown publicly until a
// CRM admin approves it — see /crm/testimonials.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, city, flag, lang, rating, service, quote, website } = body;

    // Honeypot: a real visitor never fills this hidden field.
    if (typeof website === "string" && website.trim()) {
      return NextResponse.json({ success: true });
    }

    if (!name?.trim() || !city?.trim() || !quote?.trim() || !service?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!VALID_LANGS.includes(lang)) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }
    const country = COUNTRIES.find((c) => c.code === String(flag || "").toUpperCase());
    if (!country) {
      return NextResponse.json({ error: "Invalid country" }, { status: 400 });
    }
    const ratingNum = Number(rating);
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }
    if (String(name).length > 80 || String(city).length > 80 || String(service).length > 80) {
      return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }
    if (String(quote).length > 1200) {
      return NextResponse.json({ error: "Review is too long" }, { status: 400 });
    }

    const cleanName = String(name).trim().slice(0, 80);
    const cleanCity = String(city).trim().slice(0, 80);
    const cleanService = String(service).trim().slice(0, 80);
    const cleanQuote = String(quote).trim().slice(0, 1200);

    await prisma.testimonial.create({
      data: {
        name: cleanName,
        city: cleanCity,
        flag: country.code,
        lang,
        rating: ratingNum,
        service: cleanService,
        quote: cleanQuote,
        status: "PENDING",
      },
    });

    await notifyTelegram({ name: cleanName, city: cleanCity, country: country.name, flag: country.code, lang, rating: ratingNum, service: cleanService, quote: cleanQuote });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST Testimonial error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

const SITE = "https://bizbuyuk.com";

// A pending review only exists in the moderation queue — without a nudge,
// nobody knows to go look. Reuses the same bot/channel as lead alerts.
async function notifyTelegram(r: {
  name: string;
  city: string;
  country: string;
  flag: string;
  lang: string;
  rating: number;
  service: string;
  quote: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) return;

  const stars = "⭐".repeat(r.rating);
  const text =
    `📝 <b>New review — awaiting approval</b>\n\n` +
    `${flagEmoji(r.flag)} <b>${escapeHtml(r.name)}</b> — ${escapeHtml(r.city)}, ${escapeHtml(r.country)}\n` +
    `${stars} · ${escapeHtml(r.service)} · ${r.lang.toUpperCase()}\n\n` +
    `“${escapeHtml(r.quote)}”\n\n` +
    `Review it in the CRM: ${SITE}/crm/testimonials`;

  const sends = await Promise.allSettled(
    chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      }).then((res) => {
        if (!res.ok) throw new Error(`telegram ${chatId} ${res.status}`);
      })
    )
  );
  for (const s of sends) {
    if (s.status === "rejected") console.error("[testimonial][telegram]", s.reason?.message || s.reason);
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}
