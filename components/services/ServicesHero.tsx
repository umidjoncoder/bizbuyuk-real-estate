"use client";

import { ChevronRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Counter } from "../Stats";
import { img, IMAGES } from "@/lib/images";
import { waLink } from "./shared";

export function ServicesHero() {
  const { t } = useLang();
  const s = t.servicesPage;

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs tracking-wide text-muted">
                <li>
                  <a href="/" className="transition-colors hover:text-gold">
                    {s.home}
                  </a>
                </li>
                <li aria-hidden className="text-muted/40">
                  <ChevronRight size={13} strokeWidth={1.6} />
                </li>
                <li aria-current="page" className="text-cream/80">
                  {s.current}
                </li>
              </ol>
            </nav>
          </Reveal>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow mb-5">{s.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display text-[clamp(2.4rem,6.5vw,4.6rem)]">{s.title}</h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted">{s.sub}</p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a href="/#contact" className="btn-gold">
                    {s.ctaPrimary}
                  </a>
                  <a
                    href={waLink(s.cta.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-cream"
                  >
                    <span>{s.ctaSecondary}</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="card-img group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-line">
                <img
                  src={img(IMAGES.burjAlArab, 1000, 750)}
                  alt="Burj Al Arab on the Dubai coastline"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* figures band */}
      <section className="border-t border-line bg-ink-2">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 px-5 sm:px-8 lg:grid-cols-4">
          {s.stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.08}>
              <div className="border-line py-9 lg:border-l lg:pl-7 lg:first:border-l-0 lg:first:pl-0">
                <Counter value={st.value} />
                <p className="mt-2 max-w-[18ch] text-xs leading-snug tracking-wide text-muted">{st.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
