"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/i18n";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BRAND } from "@/lib/images";

export function ClosingCta({
  title,
  body,
  image = BRAND.cta,
  // cta.webp packs its skyline into the bottom ~15% of the frame; a center
  // crop on a wide, short section lands in the empty sky above it. The other
  // banners callers pass in are framed normally, so this defaults to
  // "center" and only the caller using the default image opts into "bottom".
  imagePosition = "center",
}: {
  title: string;
  body: string;
  image?: string;
  imagePosition?: "center" | "bottom";
}) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-line">
      <motion.div style={{ y }} className="absolute inset-0 z-0 scale-105">
        <img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          className={`h-full w-full object-cover ${imagePosition === "bottom" ? "object-bottom" : "object-center"}`}
        />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/80 to-ink/35" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-28 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display max-w-[17ch] text-[clamp(2rem,5.4vw,3.8rem)]">{title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted">{body}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="/#contact" className="btn-gold">
              {t.nav.cta}
              <ArrowRight size={16} strokeWidth={2.4} />
            </a>
            <a
              href={`${CONTACT.whatsapp}?text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-cream"
            >
              <span>WhatsApp</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
