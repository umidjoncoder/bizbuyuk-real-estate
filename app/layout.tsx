import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE = "https://bizbuyuk.com";
const TITLE = "BIZBUYUK Real Estate — Your trusted partner in the Dubai property market";
const DESCRIPTION =
  "Off-plan launches from Dubai's leading developers, protected investments, and full relocation support. 0% commission to buyers. Get a free consultation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s | BIZBUYUK Real Estate",
  },
  description: DESCRIPTION,
  applicationName: "BIZBUYUK Real Estate",
  category: "real estate",
  keywords: [
    "Dubai real estate",
    "Dubai property",
    "off-plan Dubai",
    "buy property Dubai",
    "Dubai investment",
    "property for sale Dubai",
    "Emaar",
    "Damac",
    "Sobha",
    "Nakheel",
    "Dubai relocation",
    "Dubai residence visa",
    "BIZBUYUK",
    "недвижимость Дубай",
    "купить квартиру в Дубае",
  ],
  authors: [{ name: "BIZBUYUK Real Estate LLC", url: SITE }],
  creator: "BIZBUYUK Real Estate LLC",
  publisher: "BIZBUYUK Real Estate LLC",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: SITE,
    languages: { en: SITE, ru: SITE, "x-default": SITE },
  },
  openGraph: {
    type: "website",
    url: SITE,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "BIZBUYUK Real Estate",
    locale: "en_US",
    alternateLocale: ["ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Your trusted partner in the Dubai property market.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: { capable: true, title: "BIZBUYUK", statusBarStyle: "black-translucent" },
  manifest: "/manifest.webmanifest",
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${SITE}/#org`,
      name: "BIZBUYUK Real Estate LLC",
      alternateName: "BIZBUYUK",
      description:
        "Dubai real estate agency — buying, selling, leasing, off-plan investment and relocation. 0% commission to buyers.",
      url: SITE,
      logo: `${SITE}/icon.svg`,
      image: `${SITE}/opengraph-image`,
      telephone: "+971554791313",
      email: "info@bizbuyuk.com",
      priceRange: "$$$",
      foundingDate: "2023",
      areaServed: { "@type": "City", name: "Dubai" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      geo: { "@type": "GeoCoordinates", latitude: 25.2048, longitude: 55.2708 },
      knowsLanguage: ["en", "ru"],
      sameAs: [
        "https://instagram.com/bizbuyukrealestate",
        "https://facebook.com/bizbuyukrealestate",
        "https://youtube.com/@bizbuyukrealestate",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "BIZBUYUK Real Estate",
      inLanguage: ["en", "ru"],
      publisher: { "@id": `${SITE}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
