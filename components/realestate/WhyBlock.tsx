"use client";

import { Reveal } from "../Reveal";

/** Two-column hairline list. Used for "how we work" and "what we check". */
export function WhyBlock({
  title,
  cards,
  tone = "dark",
}: {
  title: string;
  cards: { title: string; body: string }[];
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <section className={`scroll-mt-24 ${light ? "surface-light" : "border-t border-line bg-ink"}`}>
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display max-w-[14ch] text-[clamp(2rem,5vw,3.4rem)]">{title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-x-12 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={0.05 * i}>
              <div className={`flex gap-6 border-t py-7 ${light ? "border-line-dark" : "border-line"}`}>
                <span className={`display shrink-0 text-[1.4rem] ${light ? "text-bronze/70" : "text-gold/60"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[1.05rem] font-extrabold tracking-tight">{c.title}</h3>
                  <p className={`mt-2 max-w-[44ch] text-[0.92rem] leading-relaxed ${light ? "text-muted-dark" : "text-muted"}`}>
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
