"use client";

import { ChevronRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { waLink } from "../services/shared";

export function CalculatorsHero() {
  const { t } = useLang();
  const c = t.calculatorsPage;

  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs tracking-wide text-muted">
              <li>
                <a href="/" className="transition-colors hover:text-gold">
                  {c.home}
                </a>
              </li>
              <li aria-hidden className="text-muted/40">
                <ChevronRight size={13} strokeWidth={1.6} className="rtl:-scale-x-100" />
              </li>
              <li aria-current="page" className="text-cream/80">
                {c.current}
              </li>
            </ol>
          </nav>
        </Reveal>

        <div className="max-w-[62ch]">
          <Reveal>
            <p className="eyebrow mb-5">{c.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display text-[clamp(2.2rem,6vw,4rem)]">{c.title}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[54ch] text-[1.05rem] leading-relaxed text-muted">{c.sub}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <a
              href={waLink(c.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-9 inline-flex text-cream"
            >
              <span>{c.leadCapture.whatsapp}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
