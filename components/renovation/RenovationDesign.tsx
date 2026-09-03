"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BRAND } from "@/lib/images";

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
          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {d.styles.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line-dark px-4 py-2 text-[0.85rem] font-semibold text-coal/80 transition-colors duration-500 ease-lux hover:border-bronze/50 hover:text-bronze"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
