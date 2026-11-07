import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role } from "@prisma/client";
import { INVOICE_CATEGORY, commissionOf, parseInvoiceInput, rowToInvoice, type InvoiceData } from "@/lib/invoices";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

// PUT: correct an invoice (all fields are resent by the form). Owner only.
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 });

    const { id } = await params;
    const row = await prisma.setting.findFirst({ where: { id, category: INVOICE_CATEGORY } });
    const before = row ? rowToInvoice(row) : null;
    if (!row || !before) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

    const parsed = parseInvoiceInput(await req.json());
    if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    const input = parsed.data;

    if (input.number !== before.number) {
      const others = await prisma.setting.findMany({
        where: { category: INVOICE_CATEGORY, NOT: { id } },
        select: { id: true, value: true, createdAt: true },
      });
      if (others.some((r) => rowToInvoice(r)?.number === input.number)) {
        return NextResponse.json({ error: "This invoice number is already used", field: "number" }, { status: 409 });
      }
    }

    const data: InvoiceData = {
      ...input,
      commissionAmount: commissionOf(input.propertyValue, input.commissionRate),
      createdById: before.createdById,
      createdByName: before.createdByName,
      updatedAt: new Date().toISOString(),
    };
    const updated = await prisma.setting.update({
      where: { id },
      data: { value: JSON.stringify(data) },
      select: { id: true, value: true, createdAt: true },
    });

    const changed = (Object.keys(input) as (keyof typeof input)[]).filter((k) => input[k] !== before[k]);
    await prisma.auditLog.create({
      data: { userId: user.id, action: "UPDATE_INVOICE", details: JSON.stringify({ id, number: data.number, changed }) },
    });

    return NextResponse.json({ success: true, invoice: rowToInvoice(updated) });
  } catch (err) {
    console.error("PUT Invoice error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: remove an invoice record. A PDF already sent is unaffected. Owner only.
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 });

    const { id } = await params;
    const row = await prisma.setting.findFirst({ where: { id, category: INVOICE_CATEGORY } });
    if (!row) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    const inv = rowToInvoice(row);

    await prisma.setting.delete({ where: { id } });
    await prisma.auditLog.create({
      data: { userId: user.id, action: "DELETE_INVOICE", details: JSON.stringify({ id, number: inv?.number, billToName: inv?.billToName }) },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE Invoice error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
