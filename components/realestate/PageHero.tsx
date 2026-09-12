"use client";

import { ChevronRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { Counter } from "../Stats";
import { CONTACT } from "@/lib/i18n";

type Crumb = { label: string; href?: string };

/** Shared hero for the real estate pages: breadcrumb, headline, one image. */
export function PageHero({
  eyebrow, title, sub, cta, ctaHref, ctaAlt, ctaAltHref, image, alt, crumbs, stats,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  ctaHref: string;
  ctaAlt?: string;
  ctaAltHref?: string;
  image: string;
  alt: string;
  crumbs: Crumb[];
  stats?: { value: string; label: string }[];
}) {
  const { t } = useLang();

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="text-muted/40">
                        <ChevronRight size={13} strokeWidth={1.6} />
                      </span>
                    )}
                    {c.href ? (
                      <a href={c.href} className="transition-colors hover:text-gold">
                        {c.label}
                      </a>
                    ) : (
                      <span aria-current="page" className="text-cream/80">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="min-w-0">
              <Reveal>
                <p className="eyebrow mb-5">{eyebrow}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display max-w-[15ch] text-[clamp(2.3rem,6vw,4.4rem)]">{title}</h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted">{sub}</p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a href={ctaHref} className="btn-gold">
                    {cta}
                  </a>
                  {ctaAlt && ctaAltHref && (
                    <a href={ctaAltHref} className="btn-outline text-cream">
                      <span>{ctaAlt}</span>
                    </a>
                  )}
                  <a
                    href={`${CONTACT.whatsapp}?text=${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
                  >
                    <span className="inline-block h-px w-5 bg-gold/50" />
                    {t.renovationPage.finalCta.ctaAlt}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="min-w-0">
              <div className="card-img group relative aspect-[16/10] overflow-hidden rounded-[1.75rem] ring-1 ring-line">
                <img src={image} width={1300} height={810} alt={alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {stats && (
        <section className="border-t border-line bg-ink-2">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-6 px-5 sm:grid-cols-3 sm:px-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="min-w-0 border-line py-9 sm:border-l sm:pl-7 sm:first:border-l-0 sm:first:pl-0">
                  <Counter value={s.value} />
                  <p className="mt-2 max-w-[22ch] text-xs leading-snug tracking-wide text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
