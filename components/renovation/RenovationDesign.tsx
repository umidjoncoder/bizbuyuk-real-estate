"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BRAND } from "@/lib/images";
import { CONTACT } from "@/lib/i18n";

export function RenovationDesign() {
  const { t } = useLang();
  const d = t.renovationPage.design;

  return (
    <section id="design" className="surface-light scroll-mt-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="card-img group relative aspect-square overflow-hidden rounded-[1.75rem] ring-1 ring-line-dark">
            <img
              src={BRAND.renoDesign}
              width={820}
              height={820}
              alt="Detail of a finished interior: seating, lighting and materials"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <h2 className="display max-w-[14ch] text-[clamp(2rem,5vw,3.6rem)]">{d.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-[1.15rem] font-semibold leading-snug">{d.lead}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 max-w-[54ch] text-[1rem] leading-relaxed text-muted-dark">{d.body}</p>
          </Reveal>
        </div>
      </div>

      {/* Style gallery. A plain 4-up grid reads as a spec sheet; nudging every
          second tile down breaks that without needing different image crops. */}
      <div className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 sm:pb-32">
        <Reveal delay={0.06}>
          <p className="eyebrow mb-6">{d.stylesLabel}</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {d.styles.map((s, i) => (
            <Reveal key={s.slug} delay={0.05 * (i % 4)} className={i % 4 === 1 || i % 4 === 3 ? "lg:mt-9" : ""}>
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`${d.styleAsk}: ${s.label}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-img group relative block aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-line-dark"
              >
                <img
                  src={`/renovation/styles/${s.slug}.webp`}
                  width={960}
                  height={1200}
                  alt={`${s.label} interior style`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-lux group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-coal/0 to-transparent" />
                <span className="absolute bottom-3.5 start-3.5 text-[0.82rem] font-bold tracking-tight text-sand-2 sm:bottom-4 sm:start-4 sm:text-[0.92rem]">
                  {s.label}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
