"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

/** Nineteen trades is too many for one list, so they read as three columns. */
export function RenovationScope() {
  const { t } = useLang();
  const s = t.renovationPage.scope;

  return (
    <section id="scope" className="surface-light scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display max-w-[18ch] text-[clamp(2rem,5vw,3.6rem)]">{s.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-muted-dark">{s.lead}</p>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 border-t border-line-dark pt-12 md:grid-cols-3">
          {s.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.1}>
              <p className="text-[0.68rem] font-bold tracking-[0.22em] text-bronze">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-extrabold tracking-tight">{g.title}</h3>
              <ul className="mt-5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line-dark/70 py-2.5 text-[0.94rem] text-muted-dark first:border-t-0 first:pt-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="display mt-16 max-w-[24ch] text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.15]">
            {s.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
