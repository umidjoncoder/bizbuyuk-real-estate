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

// GET: every submission (pending/approved/rejected) for the moderation
// queue — any logged-in CRM user may read, matching Settings' pattern.
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const testimonials = await prisma.testimonial.findMany({
      include: { reviewedBy: { select: { fullName: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ testimonials });
  } catch (err) {
    console.error("GET CRM Testimonials error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
