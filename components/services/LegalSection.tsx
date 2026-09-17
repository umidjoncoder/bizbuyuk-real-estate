"use client";

import { Globe2, Briefcase, Clock3, HandCoins } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { AskLine, IconChip } from "./shared";

const icons = [Globe2, Briefcase, Clock3, HandCoins];

/** A four-up rail, same family as RelocationSection but sized for four items. */
export function LegalSection() {
  const { t } = useLang();
  const b = t.servicesPage.blocks[4];

  return (
    <section id={b.id} className="surface-light scroll-mt-[132px]">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="display max-w-[16ch] text-[clamp(1.9rem,4.6vw,3.2rem)]">{b.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted-dark">{b.intro}</p>
        </Reveal>

        <ol className="mt-14 grid border-t border-bronze/40 sm:grid-cols-2 lg:grid-cols-4">
          {b.items.map((it, i) => {
            const Icon = icons[i];
            const last = i === b.items.length - 1;
            return (
              <Reveal as="li" key={it.title} delay={i * 0.08}>
                <div
                  className={`group h-full border-line-dark px-0 py-7 transition-colors duration-500 sm:px-6 sm:first:ps-0 lg:border-s lg:px-6 lg:first:border-s-0 lg:first:ps-0 ${
                    last ? "" : "border-b sm:border-b-0"
                  }`}
                >
                  <p className="text-[0.68rem] font-bold tracking-[0.22em] text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-4">
                    <IconChip icon={Icon} tone="light" />
                  </div>
                  <h3 className="mt-4 text-[1.02rem] font-extrabold tracking-tight">{it.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-dark">{it.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal>
          <p className="mt-10 max-w-[74ch] border-s border-bronze/40 ps-4 text-[0.86rem] leading-relaxed text-muted-dark">
            {t.servicesPage.legalNote}
          </p>
        </Reveal>

        <AskLine topic={b.title} />
      </div>
    </section>
  );
}
