"use client";

import { useEffect, useState } from "react";
import { useLang } from "../LanguageProvider";

/**
 * Sticky sub-navigation with scroll-spy. Sits directly under the fixed 72px
 * site header; sections carry a matching scroll-margin so anchor jumps land
 * below both bars.
 */
export function ServicesSubnav() {
  const { t } = useLang();
  const blocks = t.servicesPage.blocks;
  const [active, setActive] = useState(blocks[0]?.id ?? "");

  useEffect(() => {
    const ids = blocks.map((b) => b.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    // Track which sections cross a band across the middle of the viewport and
    // highlight the first one in document order, so a fast scroll or a deep
    // link can never leave a stale item lit.
    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        const first = ids.find((id) => inBand.has(id));
        if (first) setActive(first);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [blocks]);

  return (
    <nav
      aria-label={t.servicesPage.current}
      className="sticky top-[72px] z-40 border-y border-line bg-ink/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1280px] gap-1 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
        {blocks.map((b) => {
          const on = active === b.id;
          return (
            <a
              key={b.id}
              href={`#${b.id}`}
              aria-current={on ? "true" : undefined}
              className={`relative shrink-0 whitespace-nowrap px-4 py-4 text-[0.8rem] font-medium tracking-wide transition-colors duration-300 ${
                on ? "text-champagne" : "text-muted hover:text-cream"
              }`}
            >
              {b.nav}
              <span
                className={`absolute inset-x-4 bottom-0 h-px origin-left bg-gold transition-transform duration-500 ease-lux ${
                  on ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
