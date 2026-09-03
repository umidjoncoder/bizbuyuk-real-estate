"use client";

import { Plane, IdCard, Landmark, GraduationCap, House } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { AskLine, IconChip } from "./shared";

const icons = [Plane, IdCard, Landmark, GraduationCap, House];

/** A sequential rail: five stages of the move, read left to right. */
export function RelocationSection() {
  const { t } = useLang();
  const b = t.servicesPage.blocks[2];

  return (
    <section id={b.id} className="surface-light scroll-mt-[132px]">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="display max-w-[14ch] text-[clamp(1.9rem,4.6vw,3.2rem)]">{b.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted-dark">{b.intro}</p>
        </Reveal>

        <ol className="mt-14 grid border-t border-bronze/40 sm:grid-cols-2 lg:grid-cols-5">
          {b.items.map((it, i) => {
            const Icon = icons[i];
            const last = i === b.items.length - 1;
            return (
              <Reveal as="li" key={it.title} delay={i * 0.08}>
                <div
                  className={`group h-full border-line-dark px-0 py-7 transition-colors duration-500 sm:px-6 sm:first:pl-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 ${
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
          <p className="mt-10 max-w-[74ch] border-l border-bronze/40 pl-4 text-[0.86rem] leading-relaxed text-muted-dark">
            {t.servicesPage.visaNote}
          </p>
        </Reveal>

        <AskLine topic={b.title} />
      </div>
    </section>
  );
}
