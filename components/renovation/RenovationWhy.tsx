"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

/** Numerals carry the hierarchy here, so this section reads differently from
 *  the icon grid further up the page. */
export function RenovationWhy() {
  const { t } = useLang();
  const w = t.renovationPage.why;

  return (
    <section id="why-us" className="surface-light scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display max-w-[14ch] text-[clamp(2rem,5vw,3.6rem)]">{w.title}</h2>
        </Reveal>

        <div className="mt-14 grid gap-x-12 md:grid-cols-2">
          {w.cards.map((c, i) => (
            <Reveal key={c.title} delay={0.06 * i}>
              <div className="flex gap-6 border-t border-line-dark py-7">
                <span className="display shrink-0 text-[1.5rem] text-bronze/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight">{c.title}</h3>
                  <p className="mt-2 max-w-[42ch] text-[0.94rem] leading-relaxed text-muted-dark">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
