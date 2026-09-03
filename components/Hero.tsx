"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "./LanguageProvider";
import { MagneticButton } from "./MagneticButton";
import { img, IMAGES } from "@/lib/images";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* parallax image */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <img
          src={img(IMAGES.heroSkyline, 2000)}
          srcSet={`${img(IMAGES.heroSkyline, 1100)} 1100w, ${img(IMAGES.heroSkyline, 2000)} 2000w`}
          sizes="100vw"
          alt="Dubai skyline at dusk with the Burj Khalifa"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* legibility overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/88 to-ink/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink via-ink/40 to-ink/55" />

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1280px] flex-col justify-center px-5 pt-28 pb-28 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="text-[0.72rem] font-semibold tracking-[0.18em] text-cream/90 uppercase">{t.hero.eyebrow}</span>
        </motion.div>

        <h1 className="display max-w-[15ch] text-[clamp(2.3rem,5.4vw,4.4rem)]">
          <Line delay={0.36}>{t.hero.titleA}</Line>{" "}
          <Line delay={0.46}>
            <span className="text-gold-foil">{t.hero.titleEm}</span> {t.hero.titleB}
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mt-7 max-w-[50ch] text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.85 }}
          className="mt-10 flex flex-col items-start gap-3.5 sm:flex-row sm:items-center"
        >
          <MagneticButton href="#contact" className="btn-gold">
            {t.hero.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </MagneticButton>
          <a href="/services" className="btn-outline text-cream">
            <span>{t.hero.ctaAlt}</span>
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cream/60">{t.hero.scroll}</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gold"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
