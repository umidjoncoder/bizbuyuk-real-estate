import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RentalYieldCalculator } from "@/components/calculators/RentalYieldCalculator";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.calculatorsPage.rentalYield;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  alternates: {
    canonical: `${SITE}/calculators/rental-yield`,
    languages: {
      en: `${SITE}/calculators/rental-yield`, ru: `${SITE}/calculators/rental-yield`,
      uz: `${SITE}/calculators/rental-yield`, "x-default": `${SITE}/calculators/rental-yield`,
    },
  },
  openGraph: {
    type: "website", url: `${SITE}/calculators/rental-yield`,
    title: `${en.metaTitle} | BIZBUYUK Real Estate`,
    description: en.metaDescription, siteName: "BIZBUYUK Real Estate",
  },
};

export default function RentalYieldRoute() {
  return (
    <>
      <Nav />
      <main id="top" className="pt-24 sm:pt-28">
        <RentalYieldCalculator />
      </main>
      <Footer />
    </>
  );
}
