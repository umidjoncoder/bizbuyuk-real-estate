import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Public: returns the company logo (if set) so the login page and sidebar can
// show it. The logo is not sensitive.
export async function GET() {
  try {
    const row = await prisma.setting.findFirst({ where: { category: "branding" }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ logo: row?.value || null });
  } catch {
    return NextResponse.json({ logo: null });
  }
}
