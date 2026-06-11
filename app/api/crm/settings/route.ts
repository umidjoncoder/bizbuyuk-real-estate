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

const LIST_CATEGORIES = ["leadSource", "developer", "propertyType"];

// GET: all custom settings, grouped. Any logged-in user may read (to populate
// dropdowns + show the logo).
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const rows = await prisma.setting.findMany({ orderBy: { sortOrder: "asc" } });
    const grouped: Record<string, { id: string; value: string }[]> = { leadSource: [], developer: [], propertyType: [] };
    let logo: string | null = null;
    for (const r of rows) {
      if (r.category === "branding") logo = r.value;
      else if (grouped[r.category]) grouped[r.category].push({ id: r.id, value: r.value });
    }

    return NextResponse.json({ ...grouped, logo });
  } catch (err) {
    console.error("GET Settings error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: add a custom option, or set the logo (branding). Admin / Owner only.
export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER && user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Forbidden: only Admin/Owner can change settings" }, { status: 403 });
    }

    const { category, value } = await req.json();
    if (!category || !value || !String(value).trim()) {
      return NextResponse.json({ error: "Category and value required" }, { status: 400 });
    }

    // Branding (logo) is a singleton — replace any existing.
    if (category === "branding") {
      await prisma.setting.deleteMany({ where: { category: "branding" } });
      const row = await prisma.setting.create({ data: { category: "branding", value: String(value) } });
      await prisma.auditLog.create({ data: { userId: user.id, action: "UPDATE_SETTING", details: JSON.stringify({ category: "branding (logo)" }) } });
      return NextResponse.json({ success: true, setting: { id: row.id } });
    }

    if (!LIST_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const val = String(value).trim();
    // Avoid duplicates within a category.
    const existing = await prisma.setting.findFirst({ where: { category, value: val } });
    if (existing) return NextResponse.json({ success: true, setting: { id: existing.id, value: val } });

    const row = await prisma.setting.create({ data: { category, value: val } });
    await prisma.auditLog.create({ data: { userId: user.id, action: "UPDATE_SETTING", details: JSON.stringify({ category, added: val }) } });
    return NextResponse.json({ success: true, setting: { id: row.id, value: val } });
  } catch (err) {
    console.error("POST Setting error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
