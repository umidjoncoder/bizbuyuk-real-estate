import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";

// Public pages read news and reviews through Next's data cache instead of
// querying Postgres on every visit. Neon's free compute only sleeps after 5
// quiet minutes, so one query per visitor kept it running around the clock
// until the monthly quota ran out — and the CRM login went down with it.
// The CRM routes that change this content call revalidateTag with these tags,
// so edits appear at once; the timed revalidate is only a safety net.
export const NEWS_TAG = "public-news";
export const TESTIMONIALS_TAG = "public-testimonials";
const SAFETY_REVALIDATE = 6 * 60 * 60; // seconds

const NEWS_FIELDS = {
  slug: true,
  titleEn: true,
  titleRu: true,
  titleUz: true,
  titleAr: true,
  bodyEn: true,
  bodyRu: true,
  bodyUz: true,
  bodyAr: true,
  coverImage: true,
  publishedAt: true,
} as const;

// Published posts only, newest first.
export const getPublishedNews = unstable_cache(
  () =>
    prisma.newsPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: NEWS_FIELDS,
    }),
  ["public-news-list"],
  { tags: [NEWS_TAG], revalidate: SAFETY_REVALIDATE }
);

// One post by slug, drafts included — callers check `status` themselves.
export const getNewsPost = unstable_cache(
  (slug: string) =>
    prisma.newsPost.findUnique({
      where: { slug },
      select: { ...NEWS_FIELDS, status: true },
    }),
  ["public-news-post"],
  { tags: [NEWS_TAG], revalidate: SAFETY_REVALIDATE }
);

// Approved visitor reviews, newest first.
export const getApprovedTestimonials = unstable_cache(
  () =>
    prisma.testimonial.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, city: true, flag: true, lang: true, rating: true, service: true, quote: true },
    }),
  ["public-testimonials"],
  { tags: [TESTIMONIALS_TAG], revalidate: SAFETY_REVALIDATE }
);
