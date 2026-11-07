import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role } from "@prisma/client";
import { INVOICE_TEMPLATE_CATEGORY, MAX_TEMPLATE_BYTES } from "@/lib/invoices";

// The blank invoice page carries the founder's signature and the company
// stamp, so it never lives in the (public) repo or under /public. The Owner
// uploads it once; it is stored in the DB and served to the Owner only.

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

// GET: the template as base64. The page asks for it with ?v=<row id>, so the
// browser may keep its private copy: a replaced template gets a new id and URL.
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 });

    const row = await prisma.setting.findFirst({
      where: { category: INVOICE_TEMPLATE_CATEGORY },
      orderBy: { createdAt: "desc" },
    });
    if (!row) return NextResponse.json({ error: "Invoice template is not uploaded yet" }, { status: 404 });

    return NextResponse.json(
      { id: row.id, pdf: row.value },
      { headers: { "Cache-Control": "private, max-age=2592000" } },
    );
  } catch (err) {
    console.error("GET Invoice template error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT: upload / replace the template ({ pdf: base64 }). Owner only.
export async function PUT(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 });

    const { pdf } = await req.json();
    const b64 = String(pdf || "").replace(/^data:application\/pdf;base64,/, "").replace(/\s+/g, "");
    if (!b64 || !/^[A-Za-z0-9+/]+=*$/.test(b64)) {
      return NextResponse.json({ error: "Please choose a PDF file" }, { status: 400 });
    }
    const bytes = Buffer.from(b64, "base64");
    if (bytes.length > MAX_TEMPLATE_BYTES) {
      return NextResponse.json({ error: "The PDF is too large (max 3 MB)" }, { status: 400 });
    }
    if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") {
      return NextResponse.json({ error: "This file is not a PDF" }, { status: 400 });
    }

    // Singleton: replace whatever was there, in one transaction.
    const [, row] = await prisma.$transaction([
      prisma.setting.deleteMany({ where: { category: INVOICE_TEMPLATE_CATEGORY } }),
      prisma.setting.create({
        data: { category: INVOICE_TEMPLATE_CATEGORY, value: b64 },
        select: { id: true, createdAt: true },
      }),
    ]);

    await prisma.auditLog.create({
      data: { userId: user.id, action: "UPDATE_INVOICE_TEMPLATE", details: JSON.stringify({ bytes: bytes.length }) },
    });

    return NextResponse.json({ success: true, template: { id: row.id, uploadedAt: row.createdAt.toISOString() } });
  } catch (err) {
    console.error("PUT Invoice template error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
