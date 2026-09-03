"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/i18n";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BRAND } from "@/lib/images";

export function RenovationCta() {
  const { t } = useLang();
  const c = t.renovationPage.finalCta;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-line">
      <motion.div style={{ y }} className="absolute inset-0 z-0 scale-110">
        <img
          src={BRAND.renoCta}
          width={1900}
          height={780}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/80 to-ink/35" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-28 sm:px-8 sm:py-36">
        <Reveal>
          <h2 className="display max-w-[16ch] text-[clamp(2.2rem,6vw,4.4rem)]">{c.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[46ch] text-[1.1rem] leading-relaxed text-muted">{c.lead}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#quote" className="btn-gold">
              {c.cta}
              <ArrowRight size={16} strokeWidth={2.4} />
            </a>
            <a
              href={`${CONTACT.whatsapp}?text=${encodeURIComponent(c.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-cream"
            >
              <span>{c.ctaAlt}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
