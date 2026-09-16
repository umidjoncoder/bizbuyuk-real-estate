"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BRAND } from "@/lib/images";

/* The four blocks above are all real-estate services; Renovation and
   Technology are sibling things BIZBUYUK does that this page's own subnav
   doesn't cover. Without this, a visitor who lands directly on /services has
   no way to discover either — the homepage grid is the only other place
   they're linked from. */
export function ServicesAlso() {
  const { t } = useLang();
  const a = t.servicesPage.also;

  const cards = [
    { ...a.renovation, href: "/renovation", image: BRAND.dirRenovation, alt: "A finished, furnished UAE apartment" },
    { ...a.it, href: "/it", image: BRAND.dirIt, alt: "A modern developer workspace at dusk" },
  ];

  return (
    <section className="bg-ink border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow mb-4">{a.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display max-w-[16ch] text-[clamp(1.7rem,4vw,2.6rem)]">{a.title}</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={0.08 + i * 0.08}>
              <a
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-ink-2 ring-1 ring-line transition-all duration-500 ease-lux hover:-translate-y-1 hover:ring-gold/40 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.85)] sm:flex-row"
              >
                <div className="card-img relative aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-[42%]">
                  <img src={c.image} width={560} height={420} alt={c.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-[1.12rem] font-extrabold tracking-tight text-cream">{c.title}</h3>
                  <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-muted">{c.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-gold">
                    {c.cta}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2.4}
                      className="transition-transform duration-500 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
