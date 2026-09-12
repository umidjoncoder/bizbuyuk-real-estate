import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HashScroll } from "@/components/HashScroll";
import { RealEstateHero } from "@/components/realestate/RealEstateHero";
import { PropertyTypes } from "@/components/realestate/PropertyTypes";
import { BuyingPaths } from "@/components/realestate/BuyingPaths";
import { Districts } from "@/components/realestate/Districts";
import { RealEstateWhy } from "@/components/realestate/RealEstateWhy";
import { RealEstateCta } from "@/components/realestate/RealEstateCta";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.realEstatePage;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  keywords: [
    "buy property Dubai", "Dubai real estate", "off-plan Dubai", "ready property Dubai",
    "apartment Dubai", "villa Dubai", "branded residences Dubai",
    "недвижимость Дубай", "купить квартиру в Дубае",
  ],
  alternates: {
    canonical: `${SITE}/real-estate`,
    languages: {
      en: `${SITE}/real-estate`, ru: `${SITE}/real-estate`,
      uz: `${SITE}/real-estate`, "x-default": `${SITE}/real-estate`,
    },
  },
  openGraph: {
    type: "website", url: `${SITE}/real-estate`,
    title: `${en.metaTitle} | BIZBUYUK Real Estate`,
    description: en.metaDescription, siteName: "BIZBUYUK Real Estate",
  },
};

export default function RealEstateRoute() {
  return (
    <>
      <HashScroll />
      <Nav />
      <main id="top">
        <RealEstateHero />
        <PropertyTypes />
        <BuyingPaths />
        <Districts />
        <RealEstateWhy />
        <RealEstateCta />
      </main>
      <Footer />
    </>
  );
}
