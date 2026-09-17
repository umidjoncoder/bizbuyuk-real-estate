"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";
import { DISTRICTS, DISTRICT_STAGES, type DistrictStage } from "@/lib/districts";

type Filter = DistrictStage | "all";

/**
 * Each card carries a stylised gold line-art mark, not a photograph — see the
 * comment at the top of lib/districts.ts. A photorealistic "photo" captioned
 * with a real district's name would claim to document what that specific
 * place looks like today, which a generated image can't guarantee; an
 * abstract illustration evoking the district's character makes no such
 * claim. `image` stays optional so real photography can replace a mark for
 * any district later — that's a data change, not a layout change.
 */
export function Districts() {
  const { t, locale } = useLang();
  const d = t.realEstatePage.districts;
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: d.filters.all },
    ...DISTRICT_STAGES.map((s) => ({ key: s as Filter, label: d.filters[s] })),
  ];
  const shown = DISTRICTS.filter((x) => filter === "all" || x.stage === filter);

  return (
    <section id="districts" className="surface-light scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display max-w-[12ch] text-[clamp(2rem,5vw,3.4rem)]">{d.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[60ch] text-[1.02rem] leading-relaxed text-muted-dark">{d.lead}</p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={`rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-colors duration-300 ${
                  filter === f.key
                    ? "border-bronze bg-bronze text-sand"
                    : "border-line-dark text-muted-dark hover:border-bronze/50 hover:text-bronze"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((district, i) => (
            <Reveal key={district.slug} delay={0.04 * (i % 6)}>
              <article className="group flex h-full flex-col rounded-[1.4rem] bg-sand-2 p-6 ring-1 ring-line-dark transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(21,18,13,0.4)]">
                {district.image && (
                  <div className="card-img relative -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden rounded-t-[1.4rem]">
                    <img src={district.image} alt={district.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                )}
                <h3 className="text-[1.1rem] font-extrabold tracking-tight">{district.name}</h3>
                <p className="mt-2.5 flex-1 text-[0.9rem] leading-relaxed text-muted-dark">{district.blurb[locale]}</p>

                <ul className="mt-5 flex flex-col gap-1.5">
                  {district.highlights[locale].map((hl) => (
                    <li key={hl} className="flex items-start gap-2.5 text-[0.84rem] text-muted-dark">
                      <span aria-hidden className="mt-[0.55rem] h-px w-3 shrink-0 bg-bronze/50" />
                      {hl}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-line-dark pt-4">
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-bronze">{d.typesLabel}</p>
                  <p className="mt-2 text-[0.82rem] text-muted-dark">
                    {district.types.map((k) => t.propertyTypes[k] ?? k).join(" · ")}
                  </p>
                  {district.yieldNote && <p className="mt-2 text-[0.82rem] text-muted-dark">{district.yieldNote}</p>}
                </div>

                <a
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`${d.ask}: ${district.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-bronze"
                >
                  {d.ask}
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2.4}
                    className="transition-transform duration-500 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-[60ch] border-s border-bronze/40 ps-4 text-[0.88rem] leading-relaxed text-muted-dark">
            {d.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
