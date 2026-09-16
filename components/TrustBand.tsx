"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";

/* The ledger strip directly under the hero: the hero makes the claim, this
   answers it with the firm's own figures before the visitor scrolls further.

   The lead figure carries the weight on its own and the remaining five sit in a
   quiet secondary register — an even row of six equal tiles would flatten the
   hierarchy and read as filler. The note under the lead figure says what the
   number counts, so "clients" is never mistaken for "transactions". */
export function TrustBand() {
  const { t } = useLang();

  return (
    <section
      aria-label={t.trust.eyebrow}
      className="border-y border-line bg-ink-2 py-14 sm:py-16"
    >
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16">

        {/* lead figure */}
        <Reveal>
          <p className="eyebrow mb-5">{t.trust.eyebrow}</p>
          <p className="display text-gold-foil text-[clamp(3.2rem,9vw,5.6rem)] tabular-nums">
            {t.trust.lead.value}
          </p>
          <p className="mt-1 text-[1.05rem] font-semibold tracking-tight text-cream">
            {t.trust.lead.label}
          </p>
          <p className="mt-3 max-w-[34ch] text-[0.83rem] leading-relaxed text-muted">
            {t.trust.lead.note}
          </p>
        </Reveal>

        {/* secondary register */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:gap-x-8">
          {t.trust.items.map((item, i) => (
            <Reveal key={item.label} delay={0.05 + i * 0.05}>
              <div className="border-t border-line pt-3">
                <p className="text-[clamp(1.35rem,2.6vw,1.85rem)] font-extrabold tracking-tight text-cream tabular-nums">
                  {item.value}
                </p>
                <p className="mt-1 max-w-[16ch] text-[0.72rem] font-semibold uppercase leading-snug tracking-[0.13em] text-muted">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
