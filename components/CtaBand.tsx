"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { img, IMAGES } from "@/lib/images";

export function CtaBand() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0 scale-110">
        <img
          src={img(IMAGES.sunset, 1900)}
          alt="Dubai skyline at sunset"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/75 to-ink/30" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-28 sm:px-8 sm:py-36">
        <Reveal>
          <p className="eyebrow mb-5">{t.hero.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display max-w-[18ch] text-[clamp(2.2rem,6vw,4.4rem)]">
            {t.lead.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <a href="#contact" className="btn-gold mt-9">
            {t.hero.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
