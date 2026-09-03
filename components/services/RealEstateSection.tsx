"use client";

import { Building2, KeyRound, TrendingUp, ListChecks, FileSignature } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { img, IMAGES } from "@/lib/images";
import { AskLine, IconChip } from "./shared";
import { ProcessStepper } from "./ProcessStepper";

const icons = [Building2, KeyRound, TrendingUp, ListChecks, FileSignature];

/** Bento: one photo-led feature tile spanning 2x2, plus four compact tiles. */
export function RealEstateSection() {
  const { t } = useLang();
  const b = t.servicesPage.blocks[0];
  const [lead, ...rest] = b.items;

  return (
    <section id={b.id} className="surface-light scroll-mt-[132px]">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="display max-w-[14ch] text-[clamp(1.9rem,4.6vw,3.2rem)]">{b.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted-dark">{b.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-sand-2 ring-1 ring-line-dark transition-shadow duration-500 hover:shadow-[0_30px_60px_-24px_rgba(21,18,13,0.35)]">
              <div className="card-img relative min-h-[220px] flex-1">
                <img
                  src={img(IMAGES.livingBright, 820, 620)}
                  alt="Bright modern apartment interior in the UAE"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-7">
                <IconChip icon={icons[0]} tone="light" />
                <h3 className="mt-4 text-xl font-extrabold tracking-tight">{lead.title}</h3>
                <p className="mt-2.5 text-[0.94rem] leading-relaxed text-muted-dark">{lead.body}</p>
              </div>
            </article>
          </Reveal>

          {rest.map((it, i) => {
            const Icon = icons[i + 1];
            return (
              <Reveal key={it.title} delay={0.06 * (i + 1)}>
                <article className="group h-full rounded-[1.6rem] bg-sand-2 p-6 ring-1 ring-line-dark transition-shadow duration-500 hover:shadow-[0_24px_50px_-26px_rgba(21,18,13,0.35)]">
                  <IconChip icon={Icon} tone="light" />
                  <h3 className="mt-4 text-[1.05rem] font-extrabold tracking-tight">{it.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-dark">{it.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <ProcessStepper />
        <AskLine topic={b.title} />
      </div>
    </section>
  );
}
