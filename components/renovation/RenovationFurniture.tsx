"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

export function RenovationFurniture() {
  const { t } = useLang();
  const f = t.renovationPage.furniture;

  return (
    <section id="furniture" className="scroll-mt-24 border-t border-line bg-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display max-w-[12ch] text-[clamp(2.2rem,6vw,4.4rem)]">{f.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[54ch] text-[1.05rem] leading-relaxed text-muted">{f.lead}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {f.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.1}>
              <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold">{g.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="rounded-full border border-line px-3.5 py-1.5 text-[0.85rem] text-cream/80">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <a href="#quote" className="btn-gold mt-14">
            {f.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
