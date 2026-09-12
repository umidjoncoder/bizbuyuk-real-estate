import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HashScroll } from "@/components/HashScroll";
import { OffPlanPage } from "@/components/realestate/OffPlanPage";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.realEstatePage.offplan;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  keywords: [
    "off-plan Dubai", "off plan property Dubai", "payment plan Dubai", "post handover payment plan",
    "Dubai developer property", "off-plan ОАЭ", "рассрочка Дубай",
  ],
  alternates: {
    canonical: `${SITE}/real-estate/off-plan`,
    languages: {
      en: `${SITE}/real-estate/off-plan`, ru: `${SITE}/real-estate/off-plan`,
      uz: `${SITE}/real-estate/off-plan`, "x-default": `${SITE}/real-estate/off-plan`,
    },
  },
  openGraph: {
    type: "website", url: `${SITE}/real-estate/off-plan`,
    title: `${en.metaTitle} | BIZBUYUK Real Estate`,
    description: en.metaDescription, siteName: "BIZBUYUK Real Estate",
  },
};

export default function OffPlanRoute() {
  return (
    <>
      <HashScroll />
      <Nav />
      <main id="top">
        <OffPlanPage />
      </main>
      <Footer />
    </>
  );
}
