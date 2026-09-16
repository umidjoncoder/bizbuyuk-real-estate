"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BeforeAfter } from "./BeforeAfter";

/* Concept renders, not case studies.
   `lib/renovationProjects.ts` is reserved for real, photographed work — its
   own comment says so, and the BeforeAfter slider there carries a specific
   location and duration for each project. Mixing generated art into that
   list would misrepresent a job as delivered when it wasn't.
   This section sits above it with its own framing and an explicit
   disclaimer, so a visitor never mistakes a rendered mood board for a
   finished BIZBUYUK renovation. */
export function RenovationVision() {
  const { t } = useLang();
  const v = t.renovationPage.vision;
  const c = t.renovationPage.beforeAfter;
  const [active, setActive] = useState(0);
  const item = v.items[active];

  return (
    <section className="scroll-mt-24 border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow mb-4">{v.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display max-w-[20ch] text-[clamp(2rem,5vw,3.6rem)]">{v.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[62ch] text-[1rem] leading-relaxed text-muted">{v.lead}</p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap gap-2">
            {v.items.map((it, i) => (
              <button
                key={it.slug}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-colors duration-300 ${
                  i === active ? "border-gold bg-gold text-ink" : "border-line text-muted hover:text-cream"
                }`}
              >
                {it.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10">
            <BeforeAfter
              key={item.slug}
              before={`/renovation/vision/${item.slug}-before.webp`}
              after={`/renovation/vision/${item.slug}-after.webp`}
              beforeLabel={c.before}
              afterLabel={c.after}
              hint={c.hint}
              alt={`${item.label} — concept render`}
            />
            <p className="mt-4 flex items-start gap-2 text-[0.82rem] leading-relaxed text-muted/70">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-[3px] shrink-0" aria-hidden>
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.1" />
                <path d="M8 7.2v4M8 5.2v.1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              {v.disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
