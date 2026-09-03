"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

/**
 * "How it works" timeline. The rail draws itself as the block scrolls through
 * the viewport; each step's marker fills as it comes into view.
 */
export function ProcessStepper() {
  const { t } = useLang();
  const p = t.servicesPage.process;
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 65%"],
  });
  const drawn = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="mt-20 grid gap-10 border-t border-line-dark pt-14 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-16">
      <div>
        <Reveal>
          <h3 className="text-xl font-extrabold tracking-tight">{p.title}</h3>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-muted-dark">{p.body}</p>
        </Reveal>
      </div>

      <div ref={railRef} className="relative pl-9">
        <span aria-hidden className="absolute left-[5px] top-2 bottom-2 w-px bg-line-dark" />
        <motion.span
          aria-hidden
          style={{ height: reduce ? "100%" : drawn }}
          className="absolute left-[5px] top-2 w-px bg-gradient-to-b from-gold-soft to-bronze"
        />

        <ol className="space-y-8">
          {p.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <motion.span
                aria-hidden
                initial={reduce ? false : { scale: 0.4, opacity: 0.3 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-9 top-[7px] block h-[11px] w-[11px] rounded-full bg-bronze ring-4 ring-sand"
              />
              <Reveal delay={i * 0.06}>
                <p className="text-[0.68rem] font-bold tracking-[0.22em] text-bronze">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1.5 text-base font-bold tracking-tight">{s.title}</p>
                <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-muted-dark">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
