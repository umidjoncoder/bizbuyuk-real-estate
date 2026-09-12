import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TeamMasthead } from "@/components/team/TeamMasthead";
import { TeamStrip } from "@/components/team/TeamStrip";
import { dictionary } from "@/lib/i18n";
import { TEAM } from "@/lib/team";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.teamPage;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  alternates: {
    canonical: `${SITE}/team`,
    languages: {
      en: `${SITE}/team`,
      ru: `${SITE}/team`,
      uz: `${SITE}/team`,
      "x-default": `${SITE}/team`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE}/team`,
    title: `${en.metaTitle} | BIZBUYUK Real Estate`,
    description: en.metaDescription,
    siteName: "BIZBUYUK Real Estate",
  },
};

// Names the search engines can attach to the organisation rather than leaving
// seven portraits as anonymous decoration.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BIZBUYUK Real Estate",
  url: SITE,
  employee: TEAM.map((m) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    image: `${SITE}${m.photo}`,
    worksFor: { "@type": "Organization", name: "BIZBUYUK Real Estate" },
  })),
};

export default function TeamRoute() {
  return (
    <>
      <Nav />
      <main id="top" className="pb-24">
        <TeamMasthead />
        <TeamStrip />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
