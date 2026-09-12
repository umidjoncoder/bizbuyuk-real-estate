/* ============================================================
   The Dubai office roster.

   Names and job titles are not translated: they are how the team
   presents itself on cards and in the CRM. Only the language names
   are localised, through `teamPage.langs` in the dictionary.

   Portraits come from one sitting against the same backdrop and are
   pre-cropped to 660x1100 with every subject's head-line parked at
   9% of the frame, so the strip reads as a single photograph rather
   than seven unrelated headshots. Replacing one means matching that
   crop, otherwise it will sit visibly high or low against the rest.
   ============================================================ */

export const LANG_IDS = ["ru", "en", "uz", "kz", "tj", "az", "ar", "zh", "af"] as const;
export type LangId = (typeof LANG_IDS)[number];

/** Flag sprite symbol for each language, or null where no single country stands behind it. */
export const LANG_FLAG: Record<LangId, string | null> = {
  ru: "ru",
  en: "gb",
  uz: "uz",
  kz: "kz",
  tj: "tj",
  az: "az",
  ar: "ae",
  zh: "cn",
  // African Union flag. No one on the roster carries this at the moment; the
  // entry stays so it can be switched back on without redrawing the flag.
  af: "af",
};

export type Member = {
  id: string;
  name: string;
  role: string;
  photo: string;
  langs: LangId[];
  /** Marks the founder: takes the standing gold rule, and the full-width row on mobile. */
  lead?: boolean;
};

export const TEAM: Member[] = [
  { id: "shakh", name: "Shakh Mavlyanov", role: "CEO", photo: "/team/shakh-mavlyanov.webp", langs: ["en", "ar", "uz", "tj", "ru"], lead: true },
  { id: "zarina", name: "Zarina Sultanova", role: "Sales Director", photo: "/team/zarina-sultanova.webp", langs: ["en", "kz", "ru"] },
  { id: "umid", name: "Umid Nasrullah", role: "Marketing Director", photo: "/team/umid-nasrullah.webp", langs: ["en", "uz", "zh", "tj", "ru"] },
  { id: "davlatbek", name: "Davlatbek Akhmedov", role: "Broker", photo: "/team/davlatbek-akhmedov.webp", langs: ["en", "uz", "ru"] },
  { id: "anna", name: "Anna Ragozina", role: "Broker", photo: "/team/anna-ragozina.webp", langs: ["ru", "ar", "en", "tj"] },
  { id: "dustin", name: "Dustin Fabulous", role: "Broker", photo: "/team/dustin-fabulous.webp", langs: ["en"] },
  { id: "ilkin", name: "Ilkin Bakirov", role: "Broker", photo: "/team/ilkin-bakirov.webp", langs: ["az", "en", "ru"] },
];

/** Languages the office covers, most-spoken first, with the headcount behind each. */
export function langTally(): { id: LangId; count: number }[] {
  const counts = new Map<LangId, number>();
  TEAM.forEach((m) => m.langs.forEach((l) => counts.set(l, (counts.get(l) ?? 0) + 1)));
  return [...counts.entries()]
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count || LANG_IDS.indexOf(a.id) - LANG_IDS.indexOf(b.id));
}
