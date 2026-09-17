import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RelocationCostCalculator } from "@/components/calculators/RelocationCostCalculator";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.calculatorsPage.relocationCost;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  alternates: {
    canonical: `${SITE}/calculators/relocation-cost`,
    languages: {
      en: `${SITE}/calculators/relocation-cost`, ru: `${SITE}/calculators/relocation-cost`,
      uz: `${SITE}/calculators/relocation-cost`, "x-default": `${SITE}/calculators/relocation-cost`,
    },
  },
  openGraph: {
    type: "website", url: `${SITE}/calculators/relocation-cost`,
    title: `${en.metaTitle} | BIZBUYUK Real Estate`,
    description: en.metaDescription, siteName: "BIZBUYUK Real Estate",
  },
};

export default function RelocationCostRoute() {
  return (
    <>
      <Nav />
      <main id="top" className="pt-24 sm:pt-28">
        <RelocationCostCalculator />
      </main>
      <Footer />
    </>
  );
}
