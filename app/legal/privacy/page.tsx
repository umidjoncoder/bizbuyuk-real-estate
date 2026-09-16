import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PrivacyContent } from "@/components/legal/PrivacyContent";

const SITE = "https://bizbuyuk.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BIZBUYUK Real Estate collects, uses and protects the information you share with us.",
  alternates: { canonical: `${SITE}/legal/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main>
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
