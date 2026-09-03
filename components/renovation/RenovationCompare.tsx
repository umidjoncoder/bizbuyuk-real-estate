"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BeforeAfter } from "./BeforeAfter";
import { COMPARISON_PROJECTS } from "@/lib/renovationProjects";
import { CONTACT } from "@/lib/i18n";

export function RenovationCompare() {
  const { t, locale } = useLang();
  const c = t.renovationPage.beforeAfter;
  const [active, setActive] = useState(0);
  const project = COMPARISON_PROJECTS[active];

  return (
    <section id="before-after" className="scroll-mt-24 border-t border-line bg-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display max-w-[18ch] text-[clamp(2rem,5vw,3.6rem)]">{c.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[56ch] text-[1rem] leading-relaxed text-muted">
            {COMPARISON_PROJECTS.length ? c.lead : c.empty}
          </p>
        </Reveal>

        {/* Until a real pair exists, show the footprint the slider will occupy
            rather than a headline floating over empty space. */}
        {!project && (
          <Reveal delay={0.12}>
            <div className="mt-10 flex aspect-[16/10] w-full flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-line px-8 text-center">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold/50" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M12 5v14M7 10.5l-2 2 2 2M17 10.5l2 2-2 2" />
              </svg>
              <p className="mt-5 max-w-[42ch] text-[0.95rem] leading-relaxed text-muted">{c.hint}</p>
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(c.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-cream mt-7"
              >
                <span>{t.renovationPage.finalCta.ctaAlt}</span>
              </a>
            </div>
          </Reveal>
        )}

        {project && (
          <>
            {COMPARISON_PROJECTS.length > 1 && (
              <Reveal delay={0.12}>
                <div className="mt-10 flex flex-wrap gap-2">
                  {COMPARISON_PROJECTS.map((p, i) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={i === active}
                      className={`rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-colors duration-300 ${
                        i === active ? "border-gold bg-gold text-ink" : "border-line text-muted hover:text-cream"
                      }`}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.16}>
              <div className="mt-10">
                <BeforeAfter
                  before={project.before!}
                  after={project.after!}
                  beforeLabel={c.before}
                  afterLabel={c.after}
                  hint={c.hint}
                  alt={`${project.title}, ${project.location}`}
                />
                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span className="font-semibold text-cream">{project.title}</span>
                  <span>{project.location}</span>
                  <span>{project.style}</span>
                  <span>{project.duration}</span>
                </p>
                <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted">
                  {project.summary[locale]}
                </p>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
