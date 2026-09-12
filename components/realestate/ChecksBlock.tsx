"use client";

import { Check } from "lucide-react";
import { Reveal } from "../Reveal";

/** The verification list on the off-plan and ready pages. */
export function ChecksBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="surface-light scroll-mt-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[13ch] text-[clamp(1.9rem,4.4vw,3rem)]">{title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="lg:pt-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 border-b border-line-dark py-4 text-[0.98rem] leading-relaxed last:border-b-0"
              >
                <Check size={16} strokeWidth={2.2} className="mt-1 shrink-0 text-bronze" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
