"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

/** Six stages on a rail that draws itself as the section scrolls past. */
export function RenovationProcess() {
  const { t } = useLang();
  const p = t.renovationPage.process;
  const railRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 80%", "end 70%"] });
  const drawn = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="scroll-mt-24 border-t border-line bg-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow mb-5">{p.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display max-w-[16ch] text-[clamp(2rem,5vw,3.6rem)]">{p.title}</h2>
        </Reveal>

        <ol ref={railRef} className="relative mt-16 pl-10 sm:pl-14">
          <span aria-hidden className="absolute left-[7px] top-3 bottom-3 w-px bg-line sm:left-[11px]" />
          <motion.span
            aria-hidden
            style={{ height: reduce ? "100%" : drawn }}
            className="absolute left-[7px] top-3 w-px bg-gradient-to-b from-champagne to-bronze sm:left-[11px]"
          />

          {p.steps.map((step, i) => (
            <li key={step.n} className="relative pb-12 last:pb-0">
              <motion.span
                aria-hidden
                initial={reduce ? false : { scale: 0.3, opacity: 0.25 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-10 top-2 block h-[15px] w-[15px] rounded-full bg-gold ring-4 ring-ink sm:-left-14 sm:h-[23px] sm:w-[23px]"
              />
              <Reveal delay={i * 0.05}>
                <div className="grid gap-x-10 gap-y-2 md:grid-cols-[7rem_1fr]">
                  <p className="display text-[1.6rem] text-gold-foil">{step.n}</p>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">{step.title}</h3>
                    <p className="mt-2 max-w-[46ch] text-[1rem] leading-relaxed text-cream/85">{step.lead}</p>
                    <p className="mt-2 max-w-[58ch] text-[0.92rem] leading-relaxed text-muted">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
