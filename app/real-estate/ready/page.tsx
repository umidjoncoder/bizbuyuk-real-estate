import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HashScroll } from "@/components/HashScroll";
import { ReadyPage } from "@/components/realestate/ReadyPage";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.realEstatePage.ready;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  keywords: [
    "ready property Dubai", "secondary market Dubai", "buy apartment Dubai",
    "title deed transfer Dubai", "готовая недвижимость Дубай", "вторичка Дубай",
  ],
  alternates: {
    canonical: `${SITE}/real-estate/ready`,
    languages: {
      en: `${SITE}/real-estate/ready`, ru: `${SITE}/real-estate/ready`,
      uz: `${SITE}/real-estate/ready`, "x-default": `${SITE}/real-estate/ready`,
    },
  },
  openGraph: {
    type: "website", url: `${SITE}/real-estate/ready`,
    title: `${en.metaTitle} | BIZBUYUK Real Estate`,
    description: en.metaDescription, siteName: "BIZBUYUK Real Estate",
  },
};

export default function ReadyRoute() {
  return (
    <>
      <HashScroll />
      <Nav />
      <main id="top">
        <ReadyPage />
      </main>
      <Footer />
    </>
  );
}
