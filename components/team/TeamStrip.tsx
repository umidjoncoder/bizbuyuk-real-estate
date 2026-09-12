"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/LanguageProvider";
import { LANG_FLAG, TEAM, langTally, type LangId } from "@/lib/team";
import { Flag, FlagSprite } from "./Flags";

const WHATSAPP = "971554791313";

/* The page argues that a visitor will be answered in their own language, so the
   language filter is the page's control, not decoration: picking one drops
   everyone who does not speak it instead of making the visitor read all seven.

   Seven portraits plus the closing call to action make eight cells, which is
   why the grid is four wide and two wide and never leaves a hole or stretches
   a last lonely cell across the row. */
export function TeamStrip() {
  const { t } = useLang();
  const [active, setActive] = useState<LangId | null>(null);
  const tally = langTally();

  const label = (id: LangId) => t.teamPage.langs[id];
  const matches = (m: (typeof TEAM)[number]) => !active || m.langs.includes(active);
  const hits = active ? TEAM.filter(matches).length : 0;

  const wa = (name: string) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.teamPage.waIntro.replace("{name}", name))}`;

  return (
    <>
      <FlagSprite />

      {/* ---- language band ---- */}
      <div className="border-y border-line bg-[rgba(200,161,90,0.03)]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
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
                  className={`inline-flex items-center gap-2.5 rounded-full border py-[7px] pr-4 text-[0.82rem] leading-none transition-all duration-500 ease-lux ${
                    flag ? "pl-2" : "pl-4"
                  } ${
                    on
                      ? "border-gold bg-[rgba(200,161,90,0.15)] text-cream"
                      : "border-line bg-white/[0.015] text-muted hover:border-gold/50 hover:text-cream"
                  }`}
                >
                  {flag && <Flag code={flag} className="h-[14.7px] w-[22px]" />}
                  {label(id)}
                  <span className={`text-[0.68rem] tabular-nums ${on ? "text-champagne" : "text-muted"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-4 max-md:ml-0 max-md:w-full">
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
      </div>

      {/* ---- the register ---- */}
      <div className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
        {TEAM.map((m, i) => {
          const hit = active !== null && matches(m);
          const dim = active !== null && !matches(m);
          return (
            <motion.a
              key={m.id}
              href={wa(m.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.name}, ${m.role}. WhatsApp`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex min-w-0 flex-col border-b border-r border-line bg-ink transition-[filter] duration-500 ease-lux ${
                dim ? "opacity-[0.16] grayscale" : ""
              }`}
            >
              {/* standing gold rule on the founder, drawn in on hover or match for the rest */}
              <span
                className={`absolute inset-x-[-1px] top-0 z-[3] h-[2px] origin-left bg-linear-to-r from-gold to-champagne transition-transform duration-500 ease-lux ${
                  m.lead || hit ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              {/* the crop is an exact 3:4, so at this aspect the portrait is shown whole */}
              <div className="relative aspect-3/4 overflow-hidden bg-ink-2">
                <img
                  src={m.photo}
                  alt={`${m.name}, ${m.role}, BIZBUYUK Real Estate`}
                  width={900}
                  height={1200}
                  loading={i < 4 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-lux group-hover:scale-[1.04]"
                />
                {/* the subjects stood in slightly different spots, so the backdrop does not
                    line up frame to frame; darkening the outer edges pushes it back */}
                <span className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-r from-ink/45 via-transparent to-ink/45" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[38%] bg-linear-to-b from-transparent to-ink/65" />
                <span className="absolute right-3.5 top-3.5 z-[3] flex h-[30px] w-[30px] translate-y-[-5px] items-center justify-center rounded-full border border-line bg-ink/60 text-champagne opacity-0 backdrop-blur-md transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                  <ArrowGlyph />
                </span>
              </div>

              <div
                className={`flex flex-1 flex-col gap-3 border-t border-line p-5 max-sm:p-3.5 ${
                  m.lead ? "bg-linear-to-b from-[rgba(200,161,90,0.07)] to-[rgba(200,161,90,0.02)]" : ""
                }`}
              >
                <div>
                  {/* one surname runs to two lines at this width; reserving both keeps
                      every role line on the same baseline across the register */}
                  <h2 className="display min-h-[2.36em] text-[clamp(0.98rem,1.35vw,1.3rem)] leading-[1.18] text-balance text-cream">
                    {m.name}
                  </h2>
                  <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">{m.role}</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {m.langs.map((l) => {
                    const flag = LANG_FLAG[l];
                    const faded = active !== null && l !== active ? "opacity-30" : "";
                    return flag ? (
                      <Flag key={l} code={flag} className={`h-[14.7px] w-[22px] transition-opacity duration-500 ${faded}`} />
                    ) : (
                      <span
                        key={l}
                        className={`rounded-[3px] border border-line px-1.5 py-[3px] text-[0.56rem] font-semibold uppercase leading-none tracking-[0.12em] text-muted transition-opacity duration-500 ${faded}`}
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

        {/* eighth cell: closes the grid exactly, and puts the action where a
            visitor finishes reading the roster */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, delay: 0.21, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-center gap-5 border-b border-r border-line bg-linear-to-br from-[rgba(200,161,90,0.1)] to-[rgba(200,161,90,0.02)] p-7 max-sm:p-5"
        >
          <span className="absolute inset-x-[-1px] top-0 h-[2px] bg-linear-to-r from-gold to-champagne" />
          <h2 className="display text-[clamp(1.15rem,1.7vw,1.6rem)] text-balance text-cream">{t.teamPage.ctaTitle}</h2>
          <p className="text-[0.86rem] leading-relaxed text-muted">{t.teamPage.ctaBody}</p>
          <a href="/#contact" className="btn-gold self-start !px-6 !py-3 !text-[0.78rem]">
            {t.teamPage.ctaButton}
          </a>
        </motion.div>
      </div>
    </>
  );
}

function ArrowGlyph() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
      <path
        d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
