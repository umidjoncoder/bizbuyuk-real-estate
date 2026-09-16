"use client";

import { ChevronRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";
import { BRAND } from "@/lib/images";

export function ITHero() {
  const { t } = useLang();
  const h = t.itPage.hero;

  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs tracking-wide text-muted">
              <li>
                <a href="/" className="transition-colors hover:text-gold">
                  {t.itPage.home}
                </a>
              </li>
              <li aria-hidden className="text-muted/40">
                <ChevronRight size={13} strokeWidth={1.6} />
              </li>
              <li aria-current="page" className="text-cream/80">
                {t.itPage.current}
              </li>
            </ol>
          </nav>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">{h.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display max-w-[16ch] text-[clamp(2.3rem,6vw,4.4rem)]">{h.title}</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[50ch] text-[1.05rem] leading-relaxed text-muted">{h.sub}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={`${CONTACT.whatsappIt}?text=${encodeURIComponent(h.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  {h.ctaPrimary}
                </a>
                <a href={CONTACT.telegramIt} target="_blank" rel="noopener noreferrer" className="btn-outline text-cream">
                  <span>{h.ctaSecondary}</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="card-img group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-line">
              <img
                src={BRAND.itHero}
                width={1300}
                height={975}
                alt="A developer workspace at dusk, city lights beyond the window"
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
