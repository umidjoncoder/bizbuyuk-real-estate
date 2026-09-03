import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RenovationHero } from "@/components/renovation/RenovationHero";
import { RenovationScope } from "@/components/renovation/RenovationScope";
import { RenovationProcess } from "@/components/renovation/RenovationProcess";
import { RenovationDesign } from "@/components/renovation/RenovationDesign";
import { RenovationCompare } from "@/components/renovation/RenovationCompare";
import { RenovationFullService } from "@/components/renovation/RenovationFullService";
import { RenovationFurniture } from "@/components/renovation/RenovationFurniture";
import { RenovationInvestor } from "@/components/renovation/RenovationInvestor";
import { RenovationPortfolio } from "@/components/renovation/RenovationPortfolio";
import { QuoteForm } from "@/components/renovation/QuoteForm";
import { RenovationWhy } from "@/components/renovation/RenovationWhy";
import { RenovationFaq } from "@/components/renovation/RenovationFaq";
import { RenovationCta } from "@/components/renovation/RenovationCta";
import { WhatsAppFab } from "@/components/renovation/WhatsAppFab";
import { HashScroll } from "@/components/HashScroll";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.renovationPage;
const TITLE = "Turnkey Renovation in Dubai | Interior Design & Full Property Renovation";

export const metadata: Metadata = {
  title: TITLE,
  description: en.metaDescription,
  keywords: [
    "turnkey renovation Dubai",
    "renovation Dubai",
    "interior design Dubai",
    "apartment renovation Dubai",
    "villa renovation Dubai",
    "fit out Dubai",
    "furniture Dubai",
    "ремонт под ключ Дубай",
    "дизайн интерьера Дубай",
  ],
  alternates: {
    canonical: `${SITE}/renovation`,
    languages: {
      en: `${SITE}/renovation`,
      ru: `${SITE}/renovation`,
      uz: `${SITE}/renovation`,
      "x-default": `${SITE}/renovation`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE}/renovation`,
    title: `${TITLE} — BIZBUYUK`,
    description: en.metaDescription,
    siteName: "BIZBUYUK Real Estate",
  },
};

/** Q&A markup so the FAQ can win a rich result rather than just sitting there. */
function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: en.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export default function RenovationRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <HashScroll />
      <Nav />
      <main id="top">
        <RenovationHero />
        <RenovationScope />
        <RenovationProcess />
        <RenovationDesign />
        <RenovationCompare />
        <RenovationFullService />
        <RenovationFurniture />
        <RenovationInvestor />
        <RenovationPortfolio />
        <QuoteForm />
        <RenovationWhy />
        <RenovationFaq />
        <RenovationCta />
      </main>
      <WhatsAppFab />
      <Footer />
    </>
  );
}
