"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquarePlus } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { Flag, FlagSprite } from "./team/Flags";
import { TestimonialForm } from "./TestimonialForm";
import { TESTIMONIALS, TESTIMONIAL_LANGS, type TestimonialLang, type Testimonial } from "@/lib/testimonials";

/* Each quote stays in the language it was written in — a Russian client's
   words don't get run through translation just because the visitor is
   browsing the English site, the same way a Google review widget works.
   Attribution is first name + initial + city, not a portrait: see the
   comment at the top of lib/testimonials.ts for why.

   A fixed grid forced every quote onto the screen at once, at a size too
   small to read comfortably. A slider gives each one real room and reads as
   a sequence of statements, not a wall of small print — native scroll-snap
   for smoothness and touch/trackpad momentum, with a light pointer-drag
   layered on for the mouse, plus arrow buttons for anyone who'd rather click. */
export function Testimonials() {
  const { t } = useLang();
  const c = t.testimonials;
  const [active, setActive] = useState<TestimonialLang | "all">("all");
  const [submitted, setSubmitted] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);

  // Visitor-submitted reviews, approved via the CRM — merged on top of the
  // curated launch quotes rather than replacing them.
  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => setSubmitted((d.testimonials || []) as Testimonial[]))
      .catch(() => {});
  }, []);

  const all = [...submitted, ...TESTIMONIALS];
  const shown = active === "all" ? all : all.filter((x) => x.lang === active);
  const countFor = (id: TestimonialLang) => all.filter((x) => x.lang === id).length;

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.getBoundingClientRect().width ?? 340) + 16;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (el && drag.current) el.releasePointerCapture(e.pointerId);
    drag.current = null;
  };
  // A drag that moved the track shouldn't also fire the card's own click/tap.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current?.moved) e.preventDefault();
  };

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
                const count = countFor(l.id);
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setActive(l.id)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-2 rounded-full border py-1.5 ps-2 pe-3 text-[0.76rem] font-semibold transition-colors duration-300 ${
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

        <Reveal delay={0.14}>
          <div className="relative mt-12">
            <div
              ref={trackRef}
              dir="ltr"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onClickCapture={onClickCapture}
              // Scroll math (scrollLeft / scrollBy({ left })) is only
              // consistent across Chrome/Firefox/Safari when the scroll
              // container's own dir is ltr — pinning it here keeps the drag
              // and button logic simple regardless of the page's direction.
              // pr-5/sm:pr-8 stay physical to match: they pad the trailing
              // (always physical-right) edge of this pinned-ltr track.
              className="flex touch-pan-y cursor-grab gap-4 overflow-x-auto pb-3 pr-5 [scroll-snap-type:x_mandatory] [scrollbar-width:none] active:cursor-grabbing sm:pr-8 [&::-webkit-scrollbar]:hidden"
            >
              {shown.map((item) => (
                <figure
                  key={item.id}
                  data-card
                  className="flex h-full w-[280px] shrink-0 flex-col rounded-[1.3rem] border border-line bg-ink-3 p-6 [scroll-snap-align:start] sm:w-[330px]"
                >
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
              ))}
              {/* Trailing spacer so the last card can snap flush with the edge
                  instead of stopping short with dead space beside it. */}
              <div className="w-px shrink-0" aria-hidden />
            </div>

            {/* Masks the trailing edge of the pinned-ltr track above, so this
                stays physical right/bg-gradient-to-l regardless of page dir —
                it always has to line up with that track's own physical-right
                "more cards this way" edge. */}
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-ink-2 to-transparent sm:block" />

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 text-[0.82rem] font-bold text-gold transition-colors duration-300 hover:text-cream"
              >
                <MessageSquarePlus size={16} strokeWidth={2.2} />
                {c.writeReview}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByCards(-1)}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                >
                  <ChevronLeft size={18} strokeWidth={2.2} className="rtl:-scale-x-100" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCards(1)}
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                >
                  <ChevronRight size={18} strokeWidth={2.2} className="rtl:-scale-x-100" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {showForm && <TestimonialForm onClose={() => setShowForm(false)} onSubmitted={() => {}} />}
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
