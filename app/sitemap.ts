import type { MetadataRoute } from "next";
import { IT_GROUPS } from "@/lib/itServices";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsPosts = await prisma.newsPost
    .findMany({ where: { status: "PUBLISHED" }, select: { slug: true, publishedAt: true } })
    .catch(() => []);

  return [
    {
      url: "https://bizbuyuk.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://bizbuyuk.com/real-estate",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://bizbuyuk.com/real-estate/off-plan",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://bizbuyuk.com/real-estate/ready",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://bizbuyuk.com/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://bizbuyuk.com/renovation",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://bizbuyuk.com/it",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...IT_GROUPS.map((g) => ({
      url: `https://bizbuyuk.com/it/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: "https://bizbuyuk.com/legal/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://bizbuyuk.com/legal/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://bizbuyuk.com/team",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://bizbuyuk.com/news",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...newsPosts.map((p) => ({
      url: `https://bizbuyuk.com/news/${p.slug}`,
      lastModified: p.publishedAt || new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
