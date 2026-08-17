// Single source of truth for turning what a person actually types into a full
// email address. Staff accounts are Gmail, so nobody should have to type
// "@gmail.com" by hand — "sardor" is enough. Shared by the CRM forms and the
// user APIs so the client preview and the stored value can never drift apart.

export const DEFAULT_EMAIL_DOMAIN = "gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "sardor"            -> "sardor@gmail.com"
// "sardor@"           -> "sardor@gmail.com"
// "Sardor@Gmail.com"  -> "sardor@gmail.com"
// "sardor@company.uz" -> "sardor@company.uz"   (own domain is left alone)
export function normalizeEmail(raw?: string | null): string {
  const value = String(raw ?? "")
    .replace(/\s+/g, "")
    .toLowerCase()
    .replace(/^@+/, "");
  if (!value) return "";

  const at = value.indexOf("@");
  if (at === -1) return `${value}@${DEFAULT_EMAIL_DOMAIN}`;

  const local = value.slice(0, at);
  const domain = value.slice(at + 1).replace(/^@+/, "");
  if (!local) return "";
  return `${local}@${domain || DEFAULT_EMAIL_DOMAIN}`;
}

// The forms drop `type="email"` (browsers reject a bare "sardor" before we ever
// get to normalize it), so validation happens here instead.
export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}
