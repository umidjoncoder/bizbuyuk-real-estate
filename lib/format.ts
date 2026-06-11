// Shared display formatters for the CRM (readable money + phone numbers).

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
