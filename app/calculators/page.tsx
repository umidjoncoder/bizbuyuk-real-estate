import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CalculatorsHero } from "@/components/calculators/CalculatorsHero";
import { CalculatorCards } from "@/components/calculators/CalculatorCards";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.calculatorsPage;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  alternates: {
    canonical: `${SITE}/calculators`,
    languages: {
      en: `${SITE}/calculators`, ru: `${SITE}/calculators`,
      uz: `${SITE}/calculators`, "x-default": `${SITE}/calculators`,
    },
  },
  openGraph: {
    type: "website", url: `${SITE}/calculators`,
    title: `${en.metaTitle} | BIZBUYUK Real Estate`,
    description: en.metaDescription, siteName: "BIZBUYUK Real Estate",
  },
};

export default function CalculatorsRoute() {
  return (
    <>
      <Nav />
      <main id="top">
        <CalculatorsHero />
        <CalculatorCards />
      </main>
      <Footer />
    </>
  );
}
