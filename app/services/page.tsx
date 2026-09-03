import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesSubnav } from "@/components/services/ServicesSubnav";
import { RealEstateSection } from "@/components/services/RealEstateSection";
import { ProtectionSection } from "@/components/services/ProtectionSection";
import { RelocationSection } from "@/components/services/RelocationSection";
import { ManagementSection } from "@/components/services/ManagementSection";
import { ServicesCta } from "@/components/services/ServicesCta";
import { HashScroll } from "@/components/HashScroll";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.servicesPage;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  alternates: {
    canonical: `${SITE}/services`,
    languages: {
      en: `${SITE}/services`,
      ru: `${SITE}/services`,
      uz: `${SITE}/services`,
      "x-default": `${SITE}/services`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE}/services`,
    title: `${en.metaTitle} | BIZBUYUK Real Estate`,
    description: en.metaDescription,
    siteName: "BIZBUYUK Real Estate",
  },
};

export default function ServicesRoute() {
  return (
    <>
      <Nav />
      <HashScroll />
      <main id="top">
        <ServicesHero />
        <ServicesSubnav />
        <RealEstateSection />
        <ProtectionSection />
        <RelocationSection />
        <ManagementSection />
        <ServicesCta />
      </main>
      <Footer />
    </>
  );
}
