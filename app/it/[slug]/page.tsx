import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ITGroupHero } from "@/components/it/ITGroupHero";
import { ITGroupServices } from "@/components/it/ITGroupServices";
import { ITGroupFooter } from "@/components/it/ITGroupFooter";
import { IT_GROUPS, itGroupBySlug } from "@/lib/itServices";

const SITE = "https://bizbuyuk.com";

export function generateStaticParams() {
  return IT_GROUPS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const group = itGroupBySlug(slug);
  if (!group) return {};

  const title = `${group.title.en} | BIZBUYUK GROUP Technology`;
  const description = group.blurb.en;
  const url = `${SITE}/it/${group.slug}`;

  return {
    title: group.title.en,
    description,
    alternates: {
      canonical: url,
      languages: { en: url, ru: url, uz: url, "x-default": url },
    },
    openGraph: { type: "website", url, title, description, siteName: "BIZBUYUK GROUP" },
  };
}

export default async function ITGroupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const group = itGroupBySlug(slug);
  if (!group) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: group.title.en,
    description: group.blurb.en,
    provider: { "@type": "Organization", name: "BIZBUYUK GROUP", url: SITE },
    areaServed: { "@type": "Place", name: "Worldwide" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: group.title.en,
      itemListElement: group.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.en },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <ITGroupHero group={group} />
        <ITGroupServices group={group} />
        <ITGroupFooter group={group} />
      </main>
      <Footer />
    </>
  );
}
