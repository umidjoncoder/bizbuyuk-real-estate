/* Curated Dubai / luxury-property imagery (Unsplash CDN, free license).
   `img()` builds an optimised, auto-formatted, cropped URL at a given width. */

const BASE = "https://images.unsplash.com/photo-";

export const IMAGES = {
  heroSkyline: "1512453979798-5ea266f8880c", // Dubai skyline + Burj Khalifa at dusk
  downtown: "1580674684081-7617fbf3d745",     // Burj Khalifa downtown, daylight
  burjAlArab: "1518684079-3c830dcef090",       // Burj Al Arab aerial
  sunset: "1607414851776-f2fcc379fb48",        // Dubai skyline sunset over water
  livingGold: "1611094016919-36b65678f3d6",    // luxury living room, navy + gold
  livingBright: "1628592102751-ba83b0314276",  // bright modern living room
  bedroom: "1638454668466-e8dbd5462f20",       // bright modern bedroom
} as const;

export function img(id: string, w = 1200, h?: number) {
  const crop = h ? `&h=${h}&fit=crop` : "&fit=max";
  return `${BASE}${id}?auto=format&q=72&w=${w}${crop}`;
}
