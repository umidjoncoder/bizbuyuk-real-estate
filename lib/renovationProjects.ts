/* ============================================================
   Completed renovation projects shown on /renovation.

   To publish a project:
   1. Put its photos in /public/projects/<slug>/ (cover.webp,
      before.webp, after.webp, plus any gallery shots).
   2. Add an entry below. `before` and `after` must be the SAME
      room from the SAME angle, or the comparison slider is
      misleading rather than impressive.
   3. Nothing else to change. The filters, the comparison slider
      and the grid all read from this array, and each section
      hides itself while the array has nothing to show.

   Keep this list to work BIZBUYUK actually delivered.
   ============================================================ */

export type PropertyKind = "apartment" | "villa" | "studio";
export type Bedrooms = "studio" | "1br" | "2br" | "3br+";

export type RenovationProject = {
  slug: string;
  title: string;
  location: string;
  kind: PropertyKind;
  bedrooms: Bedrooms;
  /** Free text, e.g. "1,240 sq ft" */
  size: string;
  /** Free text, e.g. "Japandi" */
  style: string;
  /** Free text, e.g. "14 weeks" */
  duration: string;
  cover: string;
  /** Same room, same angle. Omit the pair to keep the project out of the slider. */
  before?: string;
  after?: string;
  gallery?: string[];
  summary: { en: string; ru: string; uz: string };
};

export const RENOVATION_PROJECTS: RenovationProject[] = [];

/** Filter keys in the order the chips render. */
export const PROJECT_FILTERS = ["all", "apartment", "villa", "studio", "1br", "2br", "3br+"] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export function matchesFilter(p: RenovationProject, f: ProjectFilter): boolean {
  if (f === "all") return true;
  if (f === "apartment" || f === "villa" || f === "studio") return p.kind === f;
  return p.bedrooms === f;
}

/** Projects that carry a usable before/after pair. */
export const COMPARISON_PROJECTS = RENOVATION_PROJECTS.filter((p) => p.before && p.after);
