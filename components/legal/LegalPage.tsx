"use client";

import { ChevronRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { CONTACT } from "@/lib/i18n";

/* A legal document is read, not sold — no hero image, no stats band, just a
   dark masthead matching the rest of the site and then long-form text at a
   comfortable measure. Body copy stays in English across all three locales:
   translating a privacy policy or terms of use is a legal task, not a
   marketing one, and a mistranslated clause is worse than an English one with
   a note pointing readers to ask in their own language. */
export function LegalPage({
  eyebrow,
  title,
  updated,
  languageNote,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  languageNote: string;
  children: React.ReactNode;
}) {
  const { t } = useLang();

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-9">
            <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted">
              <li className="flex items-center gap-2">
                <a href="/" className="transition-colors hover:text-gold">
                  {t.realEstatePage.home}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-muted/40">
                  <ChevronRight size={13} strokeWidth={1.6} />
                </span>
                <span aria-current="page" className="text-cream/80">
                  {title}
                </span>
              </li>
            </ol>
          </nav>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="display text-[clamp(2.1rem,5.5vw,3.4rem)]">{title}</h1>
          <p className="mt-5 text-sm text-muted">{updated}</p>
        </div>
      </section>

      <section className="surface-light">
        <div className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 sm:py-20">
          <p className="mb-12 max-w-[64ch] rounded-xl border border-line-dark bg-sand-2 px-5 py-4 text-[0.88rem] leading-relaxed text-muted-dark">
            {languageNote}
          </p>

          <div className="legal-prose">{children}</div>

          <div className="mt-16 border-t border-line-dark pt-8 text-sm text-muted-dark">
            <p>BIZBUYUK Real Estate LLC — Business Bay · Jumeirah Village Circle · Palm Jumeirah, Dubai, UAE</p>
            <p className="mt-1.5">
              <a href={`mailto:${CONTACT.email}`} className="font-semibold text-bronze transition-colors hover:text-coal">
                {CONTACT.email}
              </a>
              <span className="mx-2 text-muted-dark/50">·</span>
              <a href={CONTACT.phoneHref} className="font-semibold text-bronze transition-colors hover:text-coal">
                {CONTACT.phone}
              </a>
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .legal-prose h2 {
          font-family: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.01em;
          color: var(--color-coal);
          margin: 2.75rem 0 1rem;
        }
        .legal-prose h2:first-child { margin-top: 0; }
        .legal-prose p {
          margin: 0 0 1.1rem;
          max-width: 64ch;
          line-height: 1.75;
          color: rgba(21,18,13,0.72);
          font-size: 0.97rem;
        }
        .legal-prose ul {
          margin: 0 0 1.1rem;
          padding-left: 1.2rem;
          max-width: 62ch;
          display: grid;
          gap: 0.5rem;
        }
        .legal-prose li {
          line-height: 1.7;
          color: rgba(21,18,13,0.72);
          font-size: 0.97rem;
        }
        .legal-prose strong { color: var(--color-coal); font-weight: 700; }
        .legal-prose a { color: var(--color-bronze); font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
        .legal-prose a:hover { color: var(--color-coal); }
      `}</style>
    </>
  );
}
