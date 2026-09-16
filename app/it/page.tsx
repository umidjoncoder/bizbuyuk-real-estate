import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ITHero } from "@/components/it/ITHero";
import { ITProof } from "@/components/it/ITProof";
import { ITGroupsGrid } from "@/components/it/ITGroupsGrid";
import { ITProcess } from "@/components/it/ITProcess";
import { ITCta } from "@/components/it/ITCta";
import { IT_GROUPS } from "@/lib/itServices";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.itPage;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  alternates: {
    canonical: `${SITE}/it`,
    languages: { en: `${SITE}/it`, ru: `${SITE}/it`, uz: `${SITE}/it`, "x-default": `${SITE}/it` },
  },
  openGraph: {
    type: "website",
    url: `${SITE}/it`,
    title: `${en.metaTitle} | BIZBUYUK GROUP`,
    description: en.metaDescription,
    siteName: "BIZBUYUK GROUP",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software development and IT services",
  provider: { "@type": "Organization", name: "BIZBUYUK GROUP", url: SITE },
  areaServed: { "@type": "Place", name: "Worldwide" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technology services",
    itemListElement: IT_GROUPS.map((g) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: g.title.en, description: g.blurb.en },
    })),
  },
};

export default function ITHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <ITHero />
        <ITProof />
        <ITGroupsGrid />
        <ITProcess />
        <ITCta />
      </main>
      <Footer />
    </>
  );
}
