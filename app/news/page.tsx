import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NewsList } from "@/components/news/NewsList";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.newsPage;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  alternates: {
    canonical: `${SITE}/news`,
    languages: { en: `${SITE}/news`, ru: `${SITE}/news`, uz: `${SITE}/news`, "x-default": `${SITE}/news` },
  },
  openGraph: {
    type: "website",
    url: `${SITE}/news`,
    title: `${en.metaTitle} — BIZBUYUK`,
    description: en.metaDescription,
    siteName: "BIZBUYUK Real Estate",
  },
};

export default function NewsPage() {
  return (
    <>
      <Nav />
      <main>
        <NewsList />
      </main>
      <Footer />
    </>
  );
}
