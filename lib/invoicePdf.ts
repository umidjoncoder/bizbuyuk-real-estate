import { PDFDict, PDFDocument, PDFName, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

/*
 * Fills the BIZBUYUK commission invoice in the browser. The template is the
 * owner's own PDF ("INVOICE 2013087 DANUBE PROPERTIES LLC.pdf") with only the
 * variable text removed, so the logo, tables, bank details, signature and
 * stamp stay exactly as issued. Every position below was measured from that
 * PDF (points, top-left origin, text baselines).
 *
 * The template itself is NOT in this repo (the repo is public and the page
 * carries the signature and stamp). The Owner uploads it once on the
 * Invoices page; it is stored in the Setting table and served Owner-only.
 */

export interface InvoiceFields {
  number: string;
  /** yyyy-mm-dd */
  issuedAt: string;
  billToName: string;
  billToAddress?: string | null;
  billToTrn?: string | null;
  projectName?: string | null;
  unitNo?: string | null;
  buyerName?: string | null;
  propertyValue?: number | null;
  commissionRate: number;
  commissionAmount?: number | null;
}

const PAGE_HEIGHT = 841.92;
const INK = rgb(0, 0, 0);

const AT = {
  number: { x: 273.84, base: 45.36, size: 10.08, maxWidth: 285 },
  date: { x: 273.84, base: 78.96, size: 10.08, maxWidth: 285 },
  billTo: { x: 97.47, base: 185.52, size: 12, maxWidth: 468 },
  // "Address: ..." was Aptos Bold 11.52 (not a free font) on up to two lines
  // above the TRN line. Helvetica Bold at 10.93 sets the same line length, and
  // 500pt is the column width the original wrapped at.
  address: { x: 22.35, base: 209.04, size: 10.93, maxWidth: 500, lastBase: 224.5, leading: 14.16 / 10.93 },
  trn: { x: 54.1, base: 237.36, size: 11.04, maxWidth: 500 },
  project: { x: 180.96, base: 312.24, size: 10.08, maxWidth: 158 },
  unit: { x: 180.96, base: 334.08, size: 10.08, maxWidth: 158 },
  buyer: { x: 180.96, base: 355.92, size: 10.08, maxWidth: 158 },
  value: { x: 180.96, base: 377.76, size: 10.08, maxWidth: 158 },
  // Right-aligned, ending where "7%" and "122,713.5 AED" ended in the original.
  rate: { right: 397.39, base: 421.44, size: 10.08, maxWidth: 52 },
  commission: { right: 561.92, base: 421.44, size: 10.08, maxWidth: 155 },
  total: { right: 561.92, base: 449.28, size: 10.08, maxWidth: 155 },
} as const;

const GROUPED = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

/** 122713.5 -> "122,713.5", the way the original prints amounts. */
export const formatAed = (value: number | null | undefined) =>
  value === null || value === undefined ? "" : GROUPED.format(value);

export const formatRate = (rate: number) => `${GROUPED.format(rate)}%`;

/** 2026-07-20 -> 20.07.2026, the way the office writes it. */
export function formatInvoiceDate(value: string) {
  const [y, m, d] = value.slice(0, 10).split("-");
  return y && m && d ? `${d}.${m}.${y}` : value;
}

/* The standard PDF fonts only cover Latin-1. Buyers are sometimes typed in
 * Cyrillic, so transliterate rather than fail or print blanks. */
const CYRILLIC: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  ў: "o'", қ: "q", ғ: "g'", ҳ: "h",
};

export function toPdfText(text: string) {
  let out = "";
  for (const char of text.normalize("NFC")) {
    const lower = char.toLowerCase();
    if (lower in CYRILLIC) {
      const latin = CYRILLIC[lower];
      out += char === lower ? latin : latin.charAt(0).toUpperCase() + latin.slice(1);
    } else if (char === "‘" || char === "’" || char === "ʻ" || char === "ʼ") {
      out += "'";
    } else if (char.charCodeAt(0) <= 0xff) {
      out += char;
    }
  }
  return out.replace(/\s+/g, " ").trim();
}

/** Largest size, down to `min`, at which the text fits on one line. */
function fitSize(text: string, font: PDFFont, size: number, maxWidth: number, min = 6.5) {
  let s = size;
  while (s > min && font.widthOfTextAtSize(text, s) > maxWidth) s -= 0.25;
  return s;
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && font.widthOfTextAtSize(next, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function put(page: PDFPage, text: string, font: PDFFont, spot: { x: number; base: number; size: number; maxWidth: number }) {
  const clean = toPdfText(text);
  if (!clean) return;
  const size = fitSize(clean, font, spot.size, spot.maxWidth);
  page.drawText(clean, { x: spot.x, y: PAGE_HEIGHT - spot.base, size, font, color: INK });
}

function putRight(page: PDFPage, text: string, font: PDFFont, spot: { right: number; base: number; size: number; maxWidth: number }) {
  const clean = toPdfText(text);
  if (!clean) return;
  const size = fitSize(clean, font, spot.size, spot.maxWidth);
  const width = font.widthOfTextAtSize(clean, size);
  page.drawText(clean, { x: spot.right - width, y: PAGE_HEIGHT - spot.base, size, font, color: INK });
}

/**
 * Is this PDF usable as the blank template? The fields are drawn straight onto
 * the page, so a PDF that already carries invoice details (one downloaded from
 * the CRM, or an issued invoice) would print the new details on top of the old
 * ones. Returns null when the PDF is a clean blank, else why it is not.
 *
 * Tells a filled page apart by what filling adds: the CRM signs its PDFs as
 * "BIZBUYUK CRM" and draws with the standard Times-Bold / Helvetica-Bold fonts
 * the blank never uses; an issued invoice has its address in Aptos Bold, which
 * the blank no longer has.
 */
export type TemplateProblem = "unreadable" | "pageSize" | "filled";

export async function checkTemplate(bytes: Uint8Array | ArrayBuffer): Promise<TemplateProblem | null> {
  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(bytes, { updateMetadata: false });
  } catch {
    return "unreadable";
  }
  if (doc.getPageCount() < 1) return "unreadable";

  const page = doc.getPage(0);
  const { width, height } = page.getSize();
  // Every position above was measured on this A4 page.
  if (Math.abs(width - 595.2) > 3 || Math.abs(height - PAGE_HEIGHT) > 3) return "pageSize";

  if (/BIZBUYUK CRM|LaWEra CRM/i.test(`${doc.getProducer() ?? ""} ${doc.getCreator() ?? ""}`)) return "filled";

  const fonts = page.node.Resources()?.lookupMaybe(PDFName.of("Font"), PDFDict);
  for (const [, ref] of fonts?.entries() ?? []) {
    const base = doc.context.lookupMaybe(ref, PDFDict)?.get(PDFName.of("BaseFont"))?.toString() ?? "";
    if (/^\/(Times-Bold|Helvetica-Bold)$/.test(base) || /Aptos-Bold/i.test(base)) return "filled";
  }
  return null;
}

export async function fillInvoice(template: Uint8Array | ArrayBuffer, fields: InvoiceFields) {
  const doc = await PDFDocument.load(template);
  const page = doc.getPage(0);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const sans = await doc.embedFont(StandardFonts.HelveticaBold);

  put(page, fields.number, bold, AT.number);
  put(page, formatInvoiceDate(fields.issuedAt), bold, AT.date);
  put(page, fields.billToName, bold, AT.billTo);

  const address = toPdfText(fields.billToAddress ?? "");
  if (address) {
    const a = AT.address;
    const text = `Address: ${address}`;
    // Shrink until the block still ends above the TRN line.
    let size: number = a.size;
    let lines = wrap(text, sans, size, a.maxWidth);
    while (size > 7 && a.base + (lines.length - 1) * size * a.leading > a.lastBase) {
      size -= 0.25;
      lines = wrap(text, sans, size, a.maxWidth);
    }
    lines.forEach((line, i) => {
      page.drawText(line, { x: a.x, y: PAGE_HEIGHT - (a.base + i * size * a.leading), size, font: sans, color: INK });
    });
  }

  put(page, fields.billToTrn ?? "", bold, AT.trn);
  put(page, fields.projectName ?? "", bold, AT.project);
  put(page, fields.unitNo ?? "", bold, AT.unit);
  put(page, fields.buyerName ?? "", bold, AT.buyer);
  if (fields.propertyValue !== null && fields.propertyValue !== undefined) {
    put(page, `AED ${formatAed(fields.propertyValue)}`, bold, AT.value);
  }

  putRight(page, formatRate(fields.commissionRate), bold, AT.rate);
  if (fields.commissionAmount !== null && fields.commissionAmount !== undefined) {
    const amount = `${formatAed(fields.commissionAmount)} AED`;
    putRight(page, amount, bold, AT.commission);
    putRight(page, amount, bold, AT.total);
  }

  doc.setTitle(`Invoice ${fields.number}`);
  doc.setAuthor("BIZ BUYUK REAL ESTATE LLC");
  doc.setProducer("BIZBUYUK CRM");
  doc.setCreator("BIZBUYUK CRM");
  return doc.save();
}

/** Same name pattern the office already uses: "INVOICE 2013087 DANUBE PROPERTIES LLC.pdf". */
export function invoiceFileName(fields: Pick<InvoiceFields, "number" | "billToName">) {
  const who = toPdfText(fields.billToName).replace(/[\\/:*?"<>|]+/g, " ").trim();
  return `INVOICE ${fields.number}${who ? ` ${who}` : ""}.pdf`;
}
