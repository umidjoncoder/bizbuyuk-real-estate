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

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "BIZBUYUK Real Estate — Your trusted partner in the Dubai property market",
  description:
    "Off-plan launches from Dubai's leading developers, protected investments, and full relocation support. 0% commission to buyers. Get a free consultation.",
  keywords: [
    "Dubai real estate",
    "off-plan Dubai",
    "buy property Dubai",
    "Dubai investment",
    "Emaar",
    "Damac",
    "Dubai relocation",
    "BIZBUYUK",
  ],
  authors: [{ name: "BIZBUYUK Real Estate LLC" }],
  openGraph: {
    type: "website",
    title: "BIZBUYUK Real Estate — Dubai",
    description:
      "Your trusted partner in the Dubai property market. Off-plan, investment protection, relocation. 0% buyer commission.",
    siteName: "BIZBUYUK Real Estate",
    locale: "en_US",
    alternateLocale: ["ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BIZBUYUK Real Estate — Dubai",
    description: "Your trusted partner in the Dubai property market.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "BIZBUYUK Real Estate LLC",
  description: "Dubai real estate agency — buying, selling, leasing, off-plan investment and relocation.",
  url: SITE,
  telephone: "+971554791313",
  email: "info@bizbuyuk.com",
  areaServed: "Dubai, United Arab Emirates",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  foundingDate: "2023",
  sameAs: [
    "https://instagram.com/bizbuyukrealestate",
    "https://facebook.com/bizbuyukrealestate",
    "https://youtube.com/@bizbuyukrealestate",
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
