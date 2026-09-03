"use client";

import {
  PencilRuler, Hammer, Wrench, CookingPot, ShowerHead,
  Lightbulb, Sofa, Frame, WashingMachine,
} from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

const icons = [PencilRuler, Hammer, Wrench, CookingPot, ShowerHead, Lightbulb, Sofa, Frame, WashingMachine];

export function RenovationFullService() {
  const { t } = useLang();
  const f = t.renovationPage.fullService;

  return (
    <section id="full-service" className="surface-light scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <h2 className="display max-w-[13ch] text-[clamp(2rem,5vw,3.6rem)]">{f.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[54ch] self-end text-[1rem] leading-relaxed text-muted-dark lg:pb-2">{f.lead}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.6rem] bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {f.cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={c.title} delay={0.04 * i}>
                <article className="group h-full bg-sand p-7 transition-colors duration-500 ease-lux hover:bg-sand-2">
                  <Icon
                    size={22}
                    strokeWidth={1.4}
                    className="text-bronze transition-transform duration-500 ease-lux group-hover:scale-110"
                  />
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted-dark">{c.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
