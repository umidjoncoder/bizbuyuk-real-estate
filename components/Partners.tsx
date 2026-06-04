"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { DEVELOPERS } from "@/lib/i18n";

export function Partners() {
  const { t } = useLang();
  const row = [...DEVELOPERS, ...DEVELOPERS];

  return (
    <section id="partners" className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="mx-auto mb-14 max-w-[1280px] px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4">{t.partners.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mx-auto max-w-[20ch] text-[clamp(1.9rem,4.5vw,3.2rem)]">{t.partners.title}</h2>
        </Reveal>
      </div>

      <div className="marquee-mask relative">
        <div className="marquee-track">
          {row.map((name, i) => (
            <div key={i} className="flex shrink-0 items-center">
              <span className="whitespace-nowrap px-8 text-[clamp(1.3rem,2.6vw,2.1rem)] font-extrabold tracking-tight text-cream/35 transition-colors duration-300 hover:text-gold sm:px-12">
                {name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
