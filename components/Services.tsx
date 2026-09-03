"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { BRAND } from "@/lib/images";

/* One entry per direction, in the same order as `services.items` in the
   dictionary. Kept here rather than in i18n because a destination and a photo
   are not translatable content. */
const DIRECTIONS = [
  { href: "/services#real-estate", image: BRAND.dirRealEstate, alt: "Dubai Marina at night" },
  { href: "/services#protection", image: BRAND.dirProtection, alt: "Tower facade in evening light" },
  { href: "/services#relocation", image: BRAND.dirTourism, alt: "Waterfront villas in the UAE at sunset" },
  { href: "/services#management", image: BRAND.dirManagement, alt: "Sheikh Zayed Road at dusk" },
  { href: "/renovation", image: BRAND.dirRenovation, alt: "A finished, furnished UAE apartment" },
];

export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="surface-light">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">{t.services.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display max-w-[16ch] text-[clamp(2rem,5vw,3.6rem)]">{t.services.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <a href="/services" className="btn-outline text-coal shrink-0">
              <span>{t.hero.ctaAlt}</span>
            </a>
          </Reveal>
        </div>

        {/* Six columns so five cards fill the grid exactly: three across on the
            first row, two wider ones on the second. */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {t.services.items.map((s, i) => {
            const dir = DIRECTIONS[i];
            const wide = i >= 3;
            return (
              <Reveal
                key={s.tag}
                delay={0.1 + i * 0.09}
                className={wide ? "lg:col-span-3" : "lg:col-span-2"}
              >
                <a
                  href={dir.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-sand-2 shadow-[0_2px_30px_-12px_rgba(21,18,13,0.18)] ring-1 ring-line-dark transition-all duration-500 hover:shadow-[0_30px_60px_-24px_rgba(21,18,13,0.35)]"
                >
                  <div className={`card-img relative ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <img
                      src={dir.image}
                      width={900}
                      height={675}
                      alt={dir.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/85 text-sm font-bold text-gold backdrop-blur">
                      {s.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-xl font-extrabold tracking-tight">{s.title}</h3>
                    <p className="mt-3 text-[0.94rem] leading-relaxed text-muted-dark">{s.body}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-bronze">
                      {t.hero.ctaAlt}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
