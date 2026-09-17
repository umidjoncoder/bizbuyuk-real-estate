// Shared display formatters — money + phone numbers, used by the CRM and by
// the public calculators.

// Strips everything but digits and a single decimal point, e.g. "1,200,000"
// or "AED 1.2m" typed by hand -> 1200000. Returns 0 for an empty/invalid input.
export function parseNumber(raw: string): number {
  const cleaned = String(raw || "").replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

export function formatMoney(value: number | string | null | undefined, currency = "AED"): string {
  if (value === null || value === undefined || value === "") return "—";
  const n = Number(value);
  if (isNaN(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

// Normalised key for duplicate matching — last 9 digits, so "+998 90 123 45 67",
// "998901234567" and "0901234567" all collapse to the same key.
export function phoneKey(phone: string | null | undefined): string {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits.slice(-9);
}

// Groups a phone number into readable chunks, e.g.
//   "+998901234567" -> "+998 901 234 567"
//   "93938991"      -> "93 938 991"
export function formatPhone(raw: string | null | undefined): string {
  if (!raw) return "—";
  const s = String(raw).trim();
  const plus = s.startsWith("+") ? "+" : "";
  const digits = s.replace(/\D/g, "");
  if (!digits) return s;
  let out = "";
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && (digits.length - i) % 3 === 0) out += " ";
    out += digits[i];
  }
  return (plus + out).trim();
}
