import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Why } from "@/components/Why";
import { Partners } from "@/components/Partners";
import { CtaBand } from "@/components/CtaBand";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Why />
        <Partners />
        <CtaBand />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
