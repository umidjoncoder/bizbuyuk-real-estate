"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/LanguageProvider";
import { LANG_FLAG, TEAM, langTally, type LangId } from "@/lib/team";
import { Flag, FlagSprite } from "./Flags";

const WHATSAPP = "971554791313";

/* Plain corporate cards: one per person, spaced, inside the site container.

   The portraits are warm and brightly lit, so nothing is laid over them. An
   earlier pass darkened the edges to make seven edge-to-edge frames read as one
   photograph; with separated cards there is no seam to hide and the overlay only
   made good photography look murky. */
export function TeamGrid() {
  const { t } = useLang();
  const [active, setActive] = useState<LangId | null>(null);
  const tally = langTally();

  const label = (id: LangId) => t.teamPage.langs[id];
  const matches = (m: (typeof TEAM)[number]) => !active || m.langs.includes(active);
  const hits = active ? TEAM.filter(matches).length : 0;

  const wa = (name: string) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.teamPage.waIntro.replace("{name}", name))}`;

  return (
    <section className="mx-auto max-w-[1280px] px-5 sm:px-8">
      <FlagSprite />

      {/* ---- language filter ---- */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-5">
        <span className="eyebrow shrink-0 max-md:w-full">{t.teamPage.bandLabel}</span>

        <div className="flex flex-1 flex-wrap gap-2" role="group" aria-label={t.teamPage.bandLabel}>
          {tally.map(({ id, count }) => {
            const on = active === id;
            const flag = LANG_FLAG[id];
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(on ? null : id)}
                className={`inline-flex items-center gap-2.5 rounded-full border py-2 pr-4 text-[0.82rem] leading-none transition-all duration-400 ease-lux ${
                  flag ? "pl-2.5" : "pl-4"
                } ${
                  on
                    ? "border-gold bg-[rgba(200,161,90,0.14)] text-cream"
                    : "border-line text-muted hover:border-gold/45 hover:text-cream"
                }`}
              >
                {flag && <Flag code={flag} className="h-[14.7px] w-[22px]" />}
                {label(id)}
                <span className={`text-[0.68rem] tabular-nums ${on ? "text-champagne" : "text-muted"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-4 max-md:ml-0">
          <span role="status" className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
            {active ? `${label(active)}: ${hits} ${t.teamPage.peopleWord}` : t.teamPage.hint}
          </span>
          {active && (
            <button
              type="button"
              onClick={() => setActive(null)}
              className="border-b border-line pb-px text-[0.68rem] uppercase tracking-[0.18em] text-gold transition-colors hover:border-gold"
            >
              {t.teamPage.reset}
            </button>
          )}
        </div>
      </div>

      {/* ---- cards ---- */}
      {/* two up on phones: one card per row put the page over 6000px of scroll */}
      <div className="grid grid-cols-2 gap-3 pt-8 sm:gap-6 sm:pt-10 lg:grid-cols-3 xl:grid-cols-4">
        {TEAM.map((m, i) => {
          const dim = active !== null && !matches(m);
          return (
            <motion.a
              key={m.id}
              href={wa(m.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.name}, ${m.role}. WhatsApp`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col rounded-2xl border border-line bg-ink-2 p-1.5 sm:rounded-[22px] sm:p-[10px]
                shadow-[0_20px_45px_-30px_rgba(0,0,0,0.95)]
                transition-[transform,border-color,box-shadow,opacity,filter] duration-500 ease-lux
                hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_34px_60px_-30px_rgba(0,0,0,1)]
                ${dim ? "opacity-35 saturate-50" : ""}`}
            >
              {/* concentric: 22px outer radius minus 10px padding leaves 12px inside */}
              <div className="relative aspect-3/4 overflow-hidden rounded-[11px] bg-ink-3 sm:rounded-[12px]">
                <img
                  src={m.photo}
                  alt={`${m.name}, ${m.role}, BIZBUYUK Real Estate`}
                  width={900}
                  height={1200}
                  loading={i < 4 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-lux group-hover:scale-[1.05]"
                />
                <span className="absolute right-3 top-3 flex h-8 w-8 translate-y-[-6px] items-center justify-center rounded-full bg-ink/55 text-champagne opacity-0 backdrop-blur-md transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                  <ArrowGlyph />
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 px-2 pb-2 pt-3 sm:gap-4 sm:px-3 sm:pb-3 sm:pt-[18px]">
                <div>
                  <h2 className="text-[0.92rem] font-bold leading-snug tracking-[-0.02em] text-cream sm:text-[1.06rem]">{m.name}</h2>
                  <p className="mt-1 text-[0.56rem] font-bold uppercase tracking-[0.16em] text-gold sm:mt-1.5 sm:text-[0.62rem] sm:tracking-[0.2em]">{m.role}</p>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-1.5">
                  {m.langs.map((l) => {
                    const flag = LANG_FLAG[l];
                    const faded = active !== null && l !== active ? "opacity-30" : "";
                    return flag ? (
                      <Flag key={l} code={flag} className={`h-[13px] w-[19.5px] transition-opacity duration-400 sm:h-4 sm:w-6 ${faded}`} />
                    ) : (
                      <span
                        key={l}
                        className={`rounded-[3px] border border-line px-1.5 py-[3px] text-[0.56rem] font-semibold uppercase leading-none tracking-[0.12em] text-muted transition-opacity duration-400 ${faded}`}
                      >
                        {t.teamPage.langsShort.af}
                      </span>
                    );
                  })}
                  <span className="sr-only">{m.langs.map(label).join(", ")}</span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

function ArrowGlyph() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
      <path
        d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
