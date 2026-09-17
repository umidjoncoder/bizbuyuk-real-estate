import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PaymentPlanCalculator } from "@/components/calculators/PaymentPlanCalculator";
import { dictionary } from "@/lib/i18n";

const SITE = "https://bizbuyuk.com";
const en = dictionary.en.calculatorsPage.paymentPlan;

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  alternates: {
    canonical: `${SITE}/calculators/payment-plan`,
    languages: {
      en: `${SITE}/calculators/payment-plan`, ru: `${SITE}/calculators/payment-plan`,
      uz: `${SITE}/calculators/payment-plan`, "x-default": `${SITE}/calculators/payment-plan`,
    },
  },
  openGraph: {
    type: "website", url: `${SITE}/calculators/payment-plan`,
    title: `${en.metaTitle} | BIZBUYUK Real Estate`,
    description: en.metaDescription, siteName: "BIZBUYUK Real Estate",
  },
};

export default function PaymentPlanRoute() {
  return (
    <>
      <Nav />
      <main id="top" className="pt-24 sm:pt-28">
        <PaymentPlanCalculator />
      </main>
      <Footer />
    </>
  );
}
