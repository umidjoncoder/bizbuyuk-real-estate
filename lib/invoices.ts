// Commission invoices to developers (Owner only).
//
// Stored in the generic Setting table, so shipping this needed no schema
// change on the production database:
//   category "invoice"          -> one row per invoice, `value` = JSON (InvoiceData)
//   category "invoiceTemplate"  -> singleton, `value` = base64 of the blank PDF
// The Setting row id is the invoice id; the row's createdAt is when it was made.
// Volumes are tiny (a few invoices a month), so scanning the rows is fine.

export const INVOICE_CATEGORY = "invoice";
export const INVOICE_TEMPLATE_CATEGORY = "invoiceTemplate";
export const DEFAULT_RATE = 7;

// The template is ~430 KB of base64; refuse anything far beyond a one-page PDF.
export const MAX_TEMPLATE_BYTES = 3 * 1024 * 1024;

export type InvoiceData = {
  number: string;
  issuedAt: string; // yyyy-mm-dd
  billToName: string;
  billToAddress: string | null;
  billToTrn: string | null;
  projectName: string | null;
  unitNo: string | null;
  buyerName: string | null;
  propertyValue: number | null; // AED
  commissionRate: number; // percent
  commissionAmount: number | null; // AED, = value x rate, to the fil
  createdById: string | null;
  createdByName: string | null;
  updatedAt: string;
};

export type Invoice = InvoiceData & { id: string; createdAt: string };

/** Commission = property value x rate, kept to the fil (2 decimals). */
export const commissionOf = (value: number | null, rate: number) =>
  value === null ? null : Math.round(value * rate) / 100;

export function rowToInvoice(row: { id: string; value: string; createdAt: Date }): Invoice | null {
  try {
    const data = JSON.parse(row.value) as InvoiceData;
    if (!data || typeof data.number !== "string") return null;
    return { ...data, id: row.id, createdAt: row.createdAt.toISOString() };
  } catch {
    return null;
  }
}

/** Newest first: by invoice date, then by when it was entered. */
export function sortInvoices(items: Invoice[]) {
  return items.sort((a, b) =>
    a.issuedAt === b.issuedAt ? b.createdAt.localeCompare(a.createdAt) : b.issuedAt.localeCompare(a.issuedAt),
  );
}

/** The numbers run as plain integers (2013087, 2013088...); suggest the next one. */
export function nextNumber(items: Invoice[]) {
  const numeric = items.map((i) => i.number).filter((n) => /^\d{1,15}$/.test(n)).map(Number);
  return numeric.length ? String(Math.max(...numeric) + 1) : null;
}

type Input = Omit<InvoiceData, "commissionAmount" | "createdById" | "createdByName" | "updatedAt">;

function text(raw: unknown, max: number): string | null {
  if (raw === null || raw === undefined) return null;
  const s = String(raw).replace(/\s+/g, " ").trim();
  return s ? s.slice(0, max) : null;
}

function amount(raw: unknown): number | null | "bad" {
  if (raw === null || raw === undefined || raw === "") return null;
  const n = typeof raw === "number" ? raw : Number(String(raw).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : "bad";
}

/** Validates a create/update body. Returns the clean fields or an error message. */
export function parseInvoiceInput(body: any): { data: Input } | { error: string } {
  const number = text(body?.number, 40);
  if (!number) return { error: "Invoice number is required" };

  const issuedAt = String(body?.issuedAt ?? "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(issuedAt) || isNaN(Date.parse(issuedAt))) {
    return { error: "Invoice date is required" };
  }

  const billToName = text(body?.billToName, 200);
  if (!billToName) return { error: "Developer (Invoice to) is required" };

  const propertyValue = amount(body?.propertyValue);
  if (propertyValue === "bad") return { error: "Property value must be a positive number" };

  const rateRaw = body?.commissionRate === undefined || body?.commissionRate === "" ? DEFAULT_RATE : Number(body.commissionRate);
  if (!Number.isFinite(rateRaw) || rateRaw < 0 || rateRaw > 100) {
    return { error: "Commission rate must be between 0 and 100" };
  }

  // Addresses keep their line breaks out: the PDF wraps them itself.
  return {
    data: {
      number,
      issuedAt,
      billToName,
      billToAddress: text(body?.billToAddress, 500),
      billToTrn: text(body?.billToTrn, 40),
      projectName: text(body?.projectName, 160),
      unitNo: text(body?.unitNo, 80),
      buyerName: text(body?.buyerName, 160),
      propertyValue,
      commissionRate: Math.round(rateRaw * 100) / 100,
    },
  };
}
