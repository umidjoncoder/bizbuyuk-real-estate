"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";
import { PROJECT_FILTERS, RENOVATION_PROJECTS, matchesFilter, type ProjectFilter } from "@/lib/renovationProjects";

export function RenovationPortfolio() {
  const { t, locale } = useLang();
  const p = t.renovationPage.portfolio;
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const shown = RENOVATION_PROJECTS.filter((proj) => matchesFilter(proj, filter));
  const hasProjects = RENOVATION_PROJECTS.length > 0;

  return (
    <section id="portfolio" className="scroll-mt-24 border-t border-line bg-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)]">{p.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[56ch] text-[1rem] leading-relaxed text-muted">{p.lead}</p>
        </Reveal>

        {/* Filters only earn their space once there is something to filter. */}
        {hasProjects && (
          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-wrap gap-2">
              {PROJECT_FILTERS.map((key, i) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                  className={`rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-colors duration-300 ${
                    filter === key ? "border-gold bg-gold text-ink" : "border-line text-muted hover:text-cream"
                  }`}
                >
                  {p.filters[i]}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {hasProjects ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((proj, i) => (
              <Reveal key={proj.slug} delay={0.05 * i}>
                <article className="group h-full overflow-hidden rounded-[1.6rem] bg-ink-2 ring-1 ring-line">
                  <div className="card-img relative aspect-[4/3]">
                    <img
                      src={proj.cover}
                      alt={`${proj.title}, ${proj.location}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-extrabold tracking-tight">{proj.title}</h3>
                    <p className="mt-1 text-sm text-muted">{proj.location}</p>
                    <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">{proj.summary[locale]}</p>
                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-4 text-[0.8rem]">
                      <div>
                        <dt className="text-muted/70">{proj.size}</dt>
                      </div>
                      <div>
                        <dt className="text-muted/70">{proj.style}</dt>
                      </div>
                      <div>
                        <dt className="text-muted/70">{proj.duration}</dt>
                      </div>
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.12}>
            <div className="mt-12 rounded-[1.6rem] border border-dashed border-line px-8 py-14 text-center">
              <p className="mx-auto max-w-[46ch] text-[0.98rem] leading-relaxed text-muted">{p.empty}</p>
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(p.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-cream mt-8"
              >
                <span>{t.renovationPage.finalCta.ctaAlt}</span>
                <ArrowUpRight size={15} strokeWidth={2.2} />
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
