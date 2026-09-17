import type { Metadata, Viewport } from "next";
import { Manrope, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { locales } from "@/lib/i18n";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Manrope carries no Arabic glyphs — Cairo takes over for Arabic copy only,
// scoped by `[dir="rtl"]` in globals.css.
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

// Read by the anti-flash script below, so the allow-list can never drift
// from the real one.
const LOCALES_JSON = JSON.stringify(locales);

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
    languages: { en: SITE, ru: SITE, uz: SITE, ar: SITE, "x-default": SITE },
  },
  openGraph: {
    type: "website",
    url: SITE,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "BIZBUYUK Real Estate",
    locale: "en_US",
    alternateLocale: ["ru_RU", "uz_UZ", "ar_AE"],
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
        streetAddress: "Prime Business Center, Jumeirah Village Circle, Al Barsha South 4",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50 },
      /* Three Dubai offices. No geo coordinate is claimed for any of them —
         a single pin on the wrong one is worse than none. */
      hasPOS: [
        {
          "@type": "Place",
          name: "BIZBUYUK — Business Bay",
          address: { "@type": "PostalAddress", addressLocality: "Business Bay, Dubai", addressCountry: "AE" },
        },
        {
          "@type": "Place",
          name: "BIZBUYUK — Jumeirah Village Circle",
          address: { "@type": "PostalAddress", addressLocality: "Jumeirah Village Circle, Dubai", addressCountry: "AE" },
        },
        {
          "@type": "Place",
          name: "BIZBUYUK — Palm Jumeirah",
          address: { "@type": "PostalAddress", addressLocality: "Palm Jumeirah, Dubai", addressCountry: "AE" },
        },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+971554791313",
          contactType: "sales",
          availableLanguage: ["en", "ar", "tr", "ru", "zh", "uz", "kk", "ky", "it", "fr"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+971503230058",
          contactType: "technical support",
          availableLanguage: ["en", "ru", "uz"],
        },
      ],
      /* The desk works in ten languages; the interface is translated into three.
         These are different claims and are kept apart on purpose. */
      knowsLanguage: ["en", "ar", "tr", "ru", "zh", "uz", "kk", "ky", "it", "fr"],
      sameAs: [
        "https://instagram.com/bizbuyukrealestate",
        "https://www.facebook.com/profile.php?id=61590479769092",
        "https://youtube.com/@bizbuyukrealestate",
        "https://t.me/bizbuyukrealestate",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "BIZBUYUK Real Estate",
      inLanguage: ["en", "ru", "uz", "ar"],
      publisher: { "@id": `${SITE}/#org` },
    },
  ],
};

// Runs before hydration so a returning Arabic visitor (or a first-time one
// whose browser is set to Arabic) never sees a left-to-right flash before
// LanguageProvider's own effect catches up. Mirrors LanguageProvider's own
// detection order: stored choice first, then the browser's language.
const ANTI_FLASH_SCRIPT = `(function(){try{
  var L=${LOCALES_JSON};
  var v=localStorage.getItem("bb-locale");
  var l=(v&&L.indexOf(v)!==-1)?v:null;
  if(!l){var n=(navigator.language||"en").slice(0,2); if(L.indexOf(n)!==-1) l=n;}
  if(l==="ar"){document.documentElement.dir="rtl";document.documentElement.lang="ar";}
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body className="grain">
        <script dangerouslySetInnerHTML={{ __html: ANTI_FLASH_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          {children}
          <WhatsAppFab />
        </LanguageProvider>
      </body>
    </html>
  );
}
