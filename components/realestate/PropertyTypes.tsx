"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

export function PropertyTypes() {
  const { t } = useLang();
  const ty = t.realEstatePage.types;

  return (
    <section id="types" className="surface-light scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display max-w-[14ch] text-[clamp(2rem,5vw,3.4rem)]">{ty.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[64ch] text-[1.02rem] leading-relaxed text-muted-dark">{ty.lead}</p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16">
          {ty.groups.map((g, gi) => (
            <div key={g.title}>
              <Reveal>
                <div className="flex items-baseline gap-4 border-t border-line-dark pt-5">
                  <span className="text-[0.68rem] font-bold tracking-[0.22em] text-bronze">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight">{g.title}</h3>
                </div>
              </Reveal>
              <div className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.05}>
                    <div className="min-w-0">
                      <h4 className="text-[1.02rem] font-extrabold tracking-tight">{item.title}</h4>
                      <p className="mt-2 max-w-[42ch] text-[0.92rem] leading-relaxed text-muted-dark">{item.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
