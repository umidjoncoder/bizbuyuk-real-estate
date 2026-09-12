"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

export function TeamCta() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-[1280px] px-5 pt-20 sm:px-8">
      <Reveal className="flex flex-col items-start justify-between gap-8 rounded-[22px] border border-line bg-linear-to-br from-[rgba(200,161,90,0.08)] to-[rgba(200,161,90,0.02)] p-9 md:flex-row md:items-center md:p-11">
        <div>
          <h2 className="display max-w-[20ch] text-[clamp(1.4rem,2.4vw,2rem)] text-cream">{t.teamPage.ctaTitle}</h2>
          <p className="mt-3 max-w-[54ch] text-muted">{t.teamPage.ctaBody}</p>
        </div>
        <a href="/#contact" className="btn-gold shrink-0">
          {t.teamPage.ctaButton}
        </a>
      </Reveal>
    </section>
  );
}
