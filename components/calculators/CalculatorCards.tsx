"use client";

import { ArrowUpRight, TrendingUp, CreditCard, Plane } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

const icons = [TrendingUp, CreditCard, Plane];

/** Hub grid, same tile family as ITGroupsGrid — a link that reads as one
    destination at rest, not just a text block waiting for a hover. */
export function CalculatorCards() {
  const { t } = useLang();
  const c = t.calculatorsPage;

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {c.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={card.slug} delay={0.05 * i}>
                <a
                  href={`/calculators/${card.slug}`}
                  className="group flex h-full flex-col rounded-[1.4rem] border border-line bg-ink-2 p-7 transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/45 hover:bg-ink-3 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.85)] sm:p-8"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[0.9rem] border border-line bg-gold/[0.07] text-gold transition-all duration-500 ease-lux group-hover:scale-105 group-hover:border-gold/50 group-hover:bg-gold/15">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-[1.14rem] font-extrabold tracking-tight text-cream">{card.title}</h3>
                  <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-muted">{card.body}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-5 text-[0.82rem] font-bold text-gold">
                    {card.cta}
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
