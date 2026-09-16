"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { IT_GROUPS } from "@/lib/itServices";
import type { Locale } from "@/lib/i18n";

/* Twelve disciplines read as a catalogue, not a gallery — a stock photo of
   "cloud" or "AI" says nothing a real project doesn't already say better. The
   number carries the visual weight instead, the same way the process rail on
   /services does; the first two services of each group stand in for the rest,
   so the card is scannable without needing the full six-item list. */
export function ITGroupsGrid() {
  const { t, locale } = useLang();
  const g = t.itPage.groupsIntro;
  const loc = locale as Locale;

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-4">{g.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display max-w-[18ch] text-[clamp(1.9rem,4.6vw,3.2rem)]">{g.title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">{g.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.4rem] bg-line sm:grid-cols-2 lg:grid-cols-3">
          {IT_GROUPS.map((group, i) => (
            <Reveal key={group.slug} delay={0.03 * (i % 6)}>
              <a
                href={`/it/${group.slug}`}
                className="group flex h-full flex-col bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-3 sm:p-8"
              >
                <p className="text-[0.72rem] font-bold tracking-[0.22em] text-bronze/90">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-[1.12rem] font-extrabold tracking-tight text-cream">{group.title[loc]}</h3>
                <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-muted">{group.blurb[loc]}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.slice(0, 2).map((it) => (
                    <li
                      key={it[loc]}
                      className="rounded-full border border-line px-2.5 py-1 text-[0.68rem] font-medium text-muted/90"
                    >
                      {it[loc]}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-gold transition-all duration-500 ease-lux group-hover:border-gold/50 group-hover:bg-gold/10">
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2.4}
                    className="transition-transform duration-500 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
