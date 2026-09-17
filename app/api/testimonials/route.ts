import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const VALID_LANGS = ["ru", "ar", "uz", "en", "az"];
// Flag codes actually drawn in components/team/Flags.tsx.
const VALID_FLAGS = ["ru", "gb", "uz", "kz", "tj", "ae", "cn", "af", "az", "ca", "sg", "by", "ng"];

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
    if (!VALID_FLAGS.includes(flag)) {
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

    await prisma.testimonial.create({
      data: {
        name: String(name).trim().slice(0, 80),
        city: String(city).trim().slice(0, 80),
        flag,
        lang,
        rating: ratingNum,
        service: String(service).trim().slice(0, 80),
        quote: String(quote).trim().slice(0, 1200),
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST Testimonial error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
