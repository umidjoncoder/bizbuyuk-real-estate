// Single source of truth for the preferred-contact channel whitelist, shared by
// the public lead form API and the CRM lead APIs so both enforce the same values.

export const CONTACT_CHANNELS = ["Call", "WhatsApp", "Telegram", "Email"] as const;
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];

// Returns a canonical channel name (case-insensitive, trimmed) or null if the
// input is empty / not one of the allowed channels.
export function normalizePref(raw?: string | null): string | null {
  if (!raw) return null;
  const match = CONTACT_CHANNELS.find((c) => c.toLowerCase() === String(raw).trim().toLowerCase());
  return match || null;
}
