"use client";

import { ChevronRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";
import type { ITGroup } from "@/lib/itServices";
import type { Locale } from "@/lib/i18n";

export function ITGroupHero({ group }: { group: ITGroup }) {
  const { t, locale } = useLang();
  const loc = locale as Locale;
  const h = t.itPage.hero;
  const title = group.title[loc];

  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted">
              <li>
                <a href="/" className="transition-colors hover:text-gold">
                  {t.itPage.home}
                </a>
              </li>
              <li aria-hidden className="text-muted/40">
                <ChevronRight size={13} strokeWidth={1.6} />
              </li>
              <li>
                <a href="/it" className="transition-colors hover:text-gold">
                  {t.itPage.current}
                </a>
              </li>
              <li aria-hidden className="text-muted/40">
                <ChevronRight size={13} strokeWidth={1.6} />
              </li>
              <li aria-current="page" className="text-cream/80">
                {title}
              </li>
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="eyebrow mb-5">{h.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="display max-w-[16ch] text-[clamp(2.2rem,6vw,3.8rem)]">{title}</h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-relaxed text-muted">{group.blurb[loc]}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`${CONTACT.whatsappIt}?text=${encodeURIComponent(`${t.itPage.group.askLabel} ${title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              {t.itPage.group.askButton}
            </a>
            <a href={CONTACT.telegramIt} target="_blank" rel="noopener noreferrer" className="btn-outline text-cream">
              <span>{h.ctaSecondary}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
