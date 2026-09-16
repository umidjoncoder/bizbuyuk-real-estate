import type { MetadataRoute } from "next";
import { IT_GROUPS } from "@/lib/itServices";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
}
