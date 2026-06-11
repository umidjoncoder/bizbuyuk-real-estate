// Built-in default options. Admins can ADD more via Settings (stored in the DB);
// the UI merges defaults + custom so dropdowns work out of the box and grow
// without code changes.
export const DEFAULT_SOURCES = ["Manual", "Facebook", "Instagram", "Google", "Website", "Telegram"];
// Pipeline stages. WON/LOST are special (sale / requires reason) and always kept.
export const DEFAULT_STATUSES = ["NEW", "CONTACTED", "NEGOTIATION", "VIEWING", "WON", "LOST"];
export const DEFAULT_DEVELOPERS = ["Emaar", "DAMAC", "Nakheel", "Sobha", "Danube", "Binghatti"];
export const DEFAULT_PROPERTY_TYPES = ["Off-plan", "Secondary"];
// Job titles (labels). Admin can add more; the security role is separate.
export const DEFAULT_POSITIONS = ["Owner", "Administrator", "Sales Director", "Marketing Director", "Broker", "Senior Broker", "Driver", "Receptionist"];

export type SettingsBundle = {
  leadSource: string[];
  developer: string[];
  propertyType: string[];
  logo: string | null;
};

// Merge defaults with custom values (custom appended, de-duplicated).
export function mergeOptions(defaults: string[], custom: string[] | undefined): string[] {
  const seen = new Set(defaults.map((d) => d.toLowerCase()));
  const extra = (custom || []).filter((c) => c && !seen.has(c.toLowerCase()));
  return [...defaults, ...extra];
}
