"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { Flag, FlagSprite } from "./team/Flags";
import { TESTIMONIALS, TESTIMONIAL_LANGS, testimonialsByLang, type TestimonialLang } from "@/lib/testimonials";

/* Each quote stays in the language it was written in — a Russian client's
   words don't get run through translation just because the visitor is
   browsing the English site, the same way a Google review widget works.
   Attribution is first name + initial + city, not a portrait: see the
   comment at the top of lib/testimonials.ts for why. */
export function Testimonials() {
  const { t } = useLang();
  const c = t.testimonials;
  const [active, setActive] = useState<TestimonialLang | "all">("all");
  const shown = testimonialsByLang(active);

  return (
    <section id="testimonials" className="bg-ink-2 py-24 sm:py-28">
      <FlagSprite />
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">{c.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display max-w-[16ch] text-[clamp(1.9rem,4.5vw,3.2rem)]">{c.title}</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-[0.95rem] text-muted">{c.lead}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActive("all")}
                aria-pressed={active === "all"}
                className={`rounded-full border px-3.5 py-1.5 text-[0.76rem] font-semibold transition-colors duration-300 ${
                  active === "all" ? "border-gold bg-gold text-ink" : "border-line text-muted hover:text-cream"
                }`}
              >
                {c.allLabel}
              </button>
              {TESTIMONIAL_LANGS.map((l) => {
                const on = active === l.id;
                const count = TESTIMONIALS.filter((x) => x.lang === l.id).length;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setActive(l.id)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-2 pr-3 text-[0.76rem] font-semibold transition-colors duration-300 ${
                      on ? "border-gold bg-[rgba(200,161,90,0.14)] text-cream" : "border-line text-muted hover:text-cream"
                    }`}
                  >
                    <Flag code={l.flag} className="h-[11px] w-4" />
                    {count}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <Reveal key={item.id} delay={0.04 * (i % 6)}>
              <figure className="flex h-full flex-col rounded-[1.3rem] border border-line bg-ink-3 p-6">
                <Stars rating={item.rating} />
                <blockquote
                  dir={item.lang === "ar" ? "rtl" : "ltr"}
                  className={`mt-4 flex-1 text-[0.92rem] leading-relaxed text-cream/90 ${item.lang === "ar" ? "text-right" : ""}`}
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2.5 border-t border-line pt-4">
                  <Flag code={item.flag} className="h-[15px] w-[22px] shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-[0.86rem] font-bold text-cream">{item.name}</p>
                    <p className="truncate text-[0.74rem] text-muted">
                      {item.city} · {item.service}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" aria-hidden fill={i < rating ? "currentColor" : "none"} className="text-gold">
          <path
            d="M10 1.5 12.47 7.1 18.5 7.72 13.97 11.8 15.27 17.8 10 14.7 4.73 17.8 6.03 11.8 1.5 7.72 7.53 7.1Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}
