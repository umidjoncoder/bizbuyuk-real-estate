"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

export function TeamMasthead() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-12 pt-32 sm:px-8 sm:pt-36">
      <Reveal>
        <span className="inline-flex items-center rounded-full border border-line bg-[rgba(200,161,90,0.06)] px-3.5 py-1.5">
          <span className="eyebrow">{t.teamPage.eyebrow}</span>
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.1rem,4.6vw,3.6rem)] text-cream">
          {t.teamPage.titleA} <span className="text-gold-foil">{t.teamPage.titleEm}</span>
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed text-muted">{t.teamPage.lead}</p>
      </Reveal>
    </section>
  );
}
