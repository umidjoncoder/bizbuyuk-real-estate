"use client";

import { ArrowRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BRAND } from "@/lib/images";

export function BuyingPaths() {
  const { t } = useLang();
  const p = t.realEstatePage.paths;

  const cards = [
    { ...p.offplan, href: "/real-estate/off-plan", image: BRAND.reOffplan, alt: "Dubai under construction at dusk" },
    { ...p.ready, href: "/real-estate/ready", image: BRAND.reReady, alt: "Completed waterfront homes in the UAE" },
  ];

  return (
    <section id="how-to-buy" className="scroll-mt-24 border-t border-line bg-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display max-w-[14ch] text-[clamp(2rem,5vw,3.4rem)]">{p.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[60ch] text-[1.02rem] leading-relaxed text-muted">{p.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={0.1 * i}>
              <a
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink-2 ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_36px_80px_-40px_rgba(0,0,0,0.9)]"
              >
                <div className="card-img relative aspect-[16/9]">
                  <img src={c.image} width={1300} height={810} alt={c.alt} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink/25 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="display text-[1.8rem]">{c.title}</h3>
                  <p className="mt-4 max-w-[48ch] flex-1 text-[0.96rem] leading-relaxed text-muted">{c.body}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-gold">
                    {c.cta}
                    <ArrowRight
                      size={16}
                      strokeWidth={2.4}
                      className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
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
