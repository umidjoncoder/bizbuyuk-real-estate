"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";

export function ITProcess() {
  const { t } = useLang();
  const p = t.itPage.process;

  return (
    <section className="surface-light">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-4">{p.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display max-w-[18ch] text-[clamp(1.9rem,4.6vw,3.2rem)]">{p.title}</h2>
        </Reveal>

        <ol className="mt-14 grid border-t border-bronze/40 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((step, i) => {
            const last = i === p.steps.length - 1;
            return (
              <Reveal as="li" key={step.title} delay={i * 0.08}>
                <div
                  className={`h-full border-line-dark px-0 py-7 sm:px-6 sm:first:ps-0 lg:border-s lg:px-6 lg:first:border-s-0 lg:first:ps-0 ${
                    last ? "" : "border-b sm:border-b-0"
                  }`}
                >
                  <p className="text-[0.68rem] font-bold tracking-[0.22em] text-bronze">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-[1.02rem] font-extrabold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-dark">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
