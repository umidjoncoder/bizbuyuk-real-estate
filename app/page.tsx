import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBand } from "@/components/TrustBand";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Why } from "@/components/Why";
import { Partners } from "@/components/Partners";
import { Testimonials } from "@/components/Testimonials";
import { CtaBand } from "@/components/CtaBand";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBand />
        <Services />
        <Stats />
        <Why />
        <Partners />
        <Testimonials />
        <CtaBand />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
