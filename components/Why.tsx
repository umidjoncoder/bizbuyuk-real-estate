"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { img, IMAGES } from "@/lib/images";

export function Why() {
  const { t } = useLang();

  return (
    <section
      id="why"
      className="relative overflow-hidden border-t border-line/50 bg-ink py-24 sm:py-32"
    >
      {/* soft gold glow to set this dark block apart from the one above */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-12%] h-[460px] w-[460px] rounded-full bg-gold/10 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — About us (mission & vision) */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <p className="eyebrow mb-4">{t.why.about.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-[clamp(2rem,5vw,3.4rem)]">{t.why.about.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted">
              {t.why.about.body}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="card-img group mt-10 aspect-[16/11] overflow-hidden rounded-[1.6rem] ring-1 ring-line">
              <img
                src={img(IMAGES.livingGold, 900, 620)}
                alt="Premium Dubai apartment interior"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* RIGHT — Why choose us (card grid) */}
        <div>
          <Reveal>
            <p className="eyebrow mb-4">{t.why.eyebrow}</p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.why.cards.map((card, i) => (
              <Reveal as="div" key={card.title} delay={0.12 + i * 0.1}>
                <article className="group h-full rounded-2xl border border-line bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/45 hover:bg-white/[0.04]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-sm font-extrabold text-gold-foil">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight text-cream">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{card.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
