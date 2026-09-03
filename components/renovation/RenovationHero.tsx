"use client";

import { ChevronRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BRAND } from "@/lib/images";
import { CONTACT } from "@/lib/i18n";

export function RenovationHero() {
  const { t } = useLang();
  const r = t.renovationPage;

  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-xs tracking-wide text-muted">
              <li>
                <a href="/" className="transition-colors hover:text-gold">
                  {r.home}
                </a>
              </li>
              <li aria-hidden className="text-muted/40">
                <ChevronRight size={13} strokeWidth={1.6} />
              </li>
              <li aria-current="page" className="text-cream/80">
                {r.current}
              </li>
            </ol>
          </nav>
        </Reveal>

        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">{r.hero.eyebrow}</p>
            </Reveal>
            <h1 className="display text-[clamp(2.5rem,7.5vw,5.6rem)]">
              <Reveal as="span" className="block">
                {r.hero.l1}
              </Reveal>
              <Reveal as="span" delay={0.09} className="block text-gold-foil">
                {r.hero.l2}
              </Reveal>
              <Reveal as="span" delay={0.18} className="block">
                {r.hero.l3}
              </Reveal>
            </h1>
            <Reveal delay={0.26}>
              <p className="mt-8 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted">{r.hero.sub}</p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#quote" className="btn-gold">
                  {r.hero.cta}
                </a>
                <a href="#portfolio" className="btn-outline text-cream">
                  <span>{r.hero.ctaAlt}</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="card-img group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-line">
              <img
                src={BRAND.renoHero}
                width={1000}
                height={1250}
                alt="Finished living room in a UAE apartment, furnished and ready to live in"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <a
            href={`${CONTACT.whatsapp}?text=${encodeURIComponent(r.hero.cta)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
          >
            <span className="inline-block h-px w-6 bg-gold/50" />
            {r.finalCta.ctaAlt}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
