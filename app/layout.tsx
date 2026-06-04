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
const TITLE = "BIZBUYUK Real Estate — Your trusted partner in the UAE property market";
const DESCRIPTION =
  "Off-plan launches from the UAE's leading developers across Dubai, Abu Dhabi and the Emirates, protected investments, and full relocation support. 0% commission to buyers. Get a free consultation.";

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
    "UAE real estate",
    "real estate UAE",
    "real estate Emirates",
    "property UAE",
    "Dubai real estate",
    "real estate Dubai",
    "Dubai property",
    "Abu Dhabi real estate",
    "off-plan UAE",
    "off-plan Dubai",
    "buy property UAE",
    "UAE investment",
    "Emaar",
    "Damac",
    "Sobha",
    "Nakheel",
    "Danube",
    "UAE relocation",
    "UAE residence visa",
    "BIZBUYUK",
    "недвижимость ОАЭ",
    "недвижимость Дубай",
    "купить квартиру в ОАЭ",
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
      foundingDate: "2020",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "City", name: "Dubai" },
      ],
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
