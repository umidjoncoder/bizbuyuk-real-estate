"use client";

import { Check } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

export function RenovationInvestor() {
  const { t } = useLang();
  const inv = t.renovationPage.investor;

  return (
    <section id="investors" className="surface-light scroll-mt-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="display max-w-[13ch] text-[clamp(2rem,5vw,3.6rem)]">{inv.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[50ch] text-[1.05rem] leading-relaxed text-muted-dark">{inv.lead}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <a href="#quote" className="btn-outline text-coal mt-10">
              <span>{inv.cta}</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <ul className="lg:pt-3">
            {inv.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 border-b border-line-dark py-4 text-[1rem] last:border-b-0"
              >
                <Check size={16} strokeWidth={2.2} className="shrink-0 text-bronze" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
