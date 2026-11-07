import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role } from "@prisma/client";
import {
  INVOICE_CATEGORY,
  INVOICE_TEMPLATE_CATEGORY,
  commissionOf,
  nextNumber,
  parseInvoiceInput,
  rowToInvoice,
  sortInvoices,
  type Invoice,
  type InvoiceData,
} from "@/lib/invoices";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

async function allInvoices(): Promise<Invoice[]> {
  const rows = await prisma.setting.findMany({
    where: { category: INVOICE_CATEGORY },
    select: { id: true, value: true, createdAt: true },
  });
  return sortInvoices(rows.map(rowToInvoice).filter((i): i is Invoice => i !== null));
}

// GET: every invoice (newest first), the next free number, and whether the
// blank template has been uploaded (id only — the PDF itself is fetched
// separately, and only when a PDF is actually made). Owner only.
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 });

    const [items, template] = await Promise.all([
      allInvoices(),
      prisma.setting.findFirst({
        where: { category: INVOICE_TEMPLATE_CATEGORY },
        select: { id: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      items,
      nextNumber: nextNumber(items),
      template: template ? { id: template.id, uploadedAt: template.createdAt.toISOString() } : null,
    });
  } catch (err) {
    console.error("GET Invoices error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: issue a new invoice. Owner only.
export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 });

    const parsed = parseInvoiceInput(await req.json());
    if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const input = parsed.data;

    const existing = await allInvoices();
    if (existing.some((i) => i.number === input.number)) {
      return NextResponse.json({ error: "This invoice number is already used", field: "number" }, { status: 409 });
    }

    const data: InvoiceData = {
      ...input,
      commissionAmount: commissionOf(input.propertyValue, input.commissionRate),
      createdById: user.id ?? null,
      createdByName: user.fullName ?? user.username ?? null,
      updatedAt: new Date().toISOString(),
    };
    const row = await prisma.setting.create({
      data: { category: INVOICE_CATEGORY, value: JSON.stringify(data) },
      select: { id: true, value: true, createdAt: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CREATE_INVOICE",
        details: JSON.stringify({ id: row.id, number: data.number, billToName: data.billToName, commissionAmount: data.commissionAmount }),
      },
    });

    return NextResponse.json({ success: true, invoice: rowToInvoice(row) });
  } catch (err) {
    console.error("POST Invoice error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
