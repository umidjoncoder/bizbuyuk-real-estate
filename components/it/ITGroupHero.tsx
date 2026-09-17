"use client";

import { ChevronRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";
import { itGroupBySlug } from "@/lib/itServices";
import type { Locale } from "@/lib/i18n";

export function ITGroupHero({ slug }: { slug: string }) {
  const { t, locale } = useLang();
  const loc = locale as Locale;
  const h = t.itPage.hero;
  const group = itGroupBySlug(slug);
  if (!group) return null;
  const title = group.title[loc];

  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted">
              <li>
                <a href="/" className="transition-colors hover:text-gold">
                  {t.itPage.home}
                </a>
              </li>
              <li aria-hidden className="text-muted/40">
                <ChevronRight size={13} strokeWidth={1.6} className="rtl:-scale-x-100" />
              </li>
              <li>
                <a href="/it" className="transition-colors hover:text-gold">
                  {t.itPage.current}
                </a>
              </li>
              <li aria-hidden className="text-muted/40">
                <ChevronRight size={13} strokeWidth={1.6} className="rtl:-scale-x-100" />
              </li>
              <li aria-current="page" className="text-cream/80">
                {title}
              </li>
            </ol>
          </nav>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <Reveal delay={0.06}>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[1rem] border border-line bg-gold/[0.07] text-gold">
                <group.icon size={26} strokeWidth={1.5} />
              </div>
            </Reveal>
            <Reveal delay={0.09}>
              <p className="eyebrow mb-5">{h.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="display max-w-[16ch] text-[clamp(2.2rem,6vw,3.8rem)]">{title}</h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted">{group.blurb[loc]}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={`${CONTACT.whatsappIt}?text=${encodeURIComponent(`${t.itPage.group.askLabel} ${title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  {t.itPage.group.askButton}
                </a>
                <a href={CONTACT.telegramIt} target="_blank" rel="noopener noreferrer" className="btn-outline text-cream">
                  <span>{h.ctaSecondary}</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="min-w-0">
            <div className="card-img group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-line">
              <img
                src={group.heroImage}
                width={1300}
                height={975}
                alt={title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
