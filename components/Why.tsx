"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { img, IMAGES } from "@/lib/images";

export function Why() {
  const { t } = useLang();

  return (
    <section id="why" className="surface-light">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* left */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <p className="eyebrow mb-4">{t.why.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-[clamp(2rem,5vw,3.4rem)]">{t.why.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted-dark">{t.why.lead}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="card-img group mt-10 hidden aspect-[16/10] overflow-hidden rounded-[1.6rem] ring-1 ring-line-dark lg:block">
              <img
                src={img(IMAGES.livingBright, 800, 500)}
                alt="Modern bright Dubai apartment interior"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* right: steps */}
        <ol className="flex flex-col">
          {t.why.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08}>
              <div className="group flex gap-6 border-t border-line-dark py-7 transition-colors duration-500 last:border-b">
                <span className="text-lg font-extrabold text-bronze">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-dark">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
