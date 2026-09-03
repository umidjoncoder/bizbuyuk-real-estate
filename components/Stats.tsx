"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { img, IMAGES } from "@/lib/images";

export function Stats() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* image */}
        <Reveal className="order-2 lg:order-1">
          <div className="card-img group relative aspect-[5/6] overflow-hidden rounded-[1.75rem] ring-1 ring-line sm:aspect-[4/3] lg:aspect-[5/6]">
            <img
              src={img(IMAGES.downtown, 900)}
              alt="Downtown Dubai skyline"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-ink/70 px-5 py-4 backdrop-blur-md">
              <p className="text-2xl font-extrabold text-gold-foil">Est. 2020</p>
              <p className="text-xs tracking-wide text-cream/70">United Arab Emirates</p>
            </div>
          </div>
        </Reveal>

        {/* stats */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-4">{t.stats.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-[clamp(1.9rem,4.5vw,3.2rem)]">{t.stats.title}</h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
            {t.stats.items.map((s, i) => (
              <Reveal key={s.label} delay={0.12 + i * 0.1}>
                <div className="border-t border-line pt-4">
                  <Counter value={s.value} />
                  <p className="mt-2 max-w-[20ch] text-sm leading-snug text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState("0");

  const num = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, "");
  const decimals = (value.split(".")[1]?.replace(/[^0-9]/g, "") || "").length;

  useEffect(() => {
    if (!inView || isNaN(num)) return;
    // MotionConfig only governs declarative components, so the imperative
    // animate() call has to check the preference itself.
    if (reduce) {
      setDisplay(num.toFixed(decimals));
      return;
    }
    const controls = animate(0, num, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, num, decimals, reduce]);

  return (
    <span ref={ref} className="display block text-[clamp(2.6rem,6vw,4rem)] text-gold-foil">
      {isNaN(num) ? value : display}
      {suffix}
    </span>
  );
}
