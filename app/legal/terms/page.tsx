import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TermsContent } from "@/components/legal/TermsContent";

const SITE = "https://bizbuyuk.com";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply to using the BIZBUYUK Real Estate website.",
  alternates: { canonical: `${SITE}/legal/terms` },
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
  return (
    <>
      <Nav />
      <main>
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
