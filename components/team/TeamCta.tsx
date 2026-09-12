"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

export function TeamCta() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
      <Reveal className="flex flex-col items-start justify-between gap-8 border-t border-line pt-10 md:flex-row md:items-end">
        <div>
          <h2 className="display max-w-[18ch] text-[clamp(1.5rem,2.8vw,2.2rem)] text-cream">{t.teamPage.ctaTitle}</h2>
          <p className="mt-3.5 max-w-[52ch] text-muted">{t.teamPage.ctaBody}</p>
        </div>
        <a href="/#contact" className="btn-gold shrink-0">
          {t.teamPage.ctaButton}
        </a>
      </Reveal>
    </section>
  );
}
