"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { IT_GROUPS } from "@/lib/itServices";
import type { Locale } from "@/lib/i18n";

/* Each tile is a link to a full page, not a text block, so it needs to read
   as one at rest — not just on hover. The icon chip, the ring instead of a
   flat fill, the lift on hover, and a labelled "View services" line (not a
   bare arrow) are all doing that job together. */
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {IT_GROUPS.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.slug} delay={0.03 * (i % 6)}>
                <a
                  href={`/it/${group.slug}`}
                  className="group flex h-full flex-col rounded-[1.4rem] border border-line bg-ink-2 p-7 transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/45 hover:bg-ink-3 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.85)] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-[0.9rem] border border-line bg-gold/[0.07] text-gold transition-all duration-500 ease-lux group-hover:scale-105 group-hover:border-gold/50 group-hover:bg-gold/15">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                    <p className="text-[0.72rem] font-bold tracking-[0.22em] text-bronze/70">{String(i + 1).padStart(2, "0")}</p>
                  </div>

                  <h3 className="mt-5 text-[1.14rem] font-extrabold tracking-tight text-cream">{group.title[loc]}</h3>
                  <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-muted">{group.blurb[loc]}</p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.items.slice(0, 2).map((it) => (
                      <li
                        key={it.label[loc]}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.68rem] font-medium text-muted/90"
                      >
                        {it.label[loc]}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-5 text-[0.82rem] font-bold text-gold">
                    {g.viewLabel}
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.4}
                      className="transition-transform duration-500 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
