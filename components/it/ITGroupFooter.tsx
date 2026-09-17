"use client";

import { ArrowRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";
import { IT_GROUPS, itGroupBySlug } from "@/lib/itServices";
import type { Locale } from "@/lib/i18n";

export function ITGroupFooter({ slug }: { slug: string }) {
  const { t, locale } = useLang();
  const loc = locale as Locale;
  const s = t.itPage.group;
  const group = itGroupBySlug(slug);
  if (!group) return null;
  const others = IT_GROUPS.filter((g) => g.slug !== group.slug);

  return (
    <>
      <section className="bg-ink">
        <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-8">
          <Reveal>
            <p className="eyebrow mb-6">{s.otherLabel}</p>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            <Reveal delay={0}>
              <a
                href="/it"
                className="inline-flex items-center rounded-full border border-gold/40 px-4 py-2 text-[0.82rem] font-semibold text-gold transition-colors duration-300 hover:border-gold hover:text-champagne"
              >
                {s.backLabel}
              </a>
            </Reveal>
            {others.map((g, i) => (
              <Reveal key={g.slug} delay={0.02 * i}>
                <a
                  href={`/it/${g.slug}`}
                  className="inline-flex items-center rounded-full border border-line px-4 py-2 text-[0.82rem] font-medium text-muted transition-colors duration-300 hover:border-gold/50 hover:text-cream"
                >
                  {g.title[loc]}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2">
        <div className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="display max-w-[18ch] text-[clamp(1.8rem,4.2vw,2.8rem)]">{s.ctaTitle}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[56ch] text-[1rem] leading-relaxed text-muted">{s.ctaBody}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`${CONTACT.whatsappIt}?text=${encodeURIComponent(`${s.askLabel} ${group.title[loc]}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                {s.askButton}
                <ArrowRight size={16} strokeWidth={2.4} />
              </a>
              <a href={CONTACT.telegramIt} target="_blank" rel="noopener noreferrer" className="btn-outline text-cream">
                <span>{t.itPage.hero.ctaSecondary}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
