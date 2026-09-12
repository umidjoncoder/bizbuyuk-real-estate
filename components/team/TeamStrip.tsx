"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/LanguageProvider";
import { LANG_FLAG, TEAM, langTally, type LangId } from "@/lib/team";
import { Flag, FlagSprite } from "./Flags";

const WHATSAPP = "971554791313";

/* The page argues that a visitor will be answered in their own language, so the
   language filter is the page's control, not decoration: picking one drops
   everyone who does not speak it instead of making the visitor read all seven. */
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
              {active
                ? `${label(active)}: ${hits} ${t.teamPage.peopleWord}`
                : t.teamPage.hint}
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

      {/* ---- the register: one continuous band of portraits, not seven cards ---- */}
      <div className="flex flex-wrap border-b border-line">
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
              transition={{ duration: 0.85, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex min-w-0 flex-col border-r border-line bg-ink transition-[filter] duration-500 ease-lux
                basis-1/2 last:border-r-0 [&:nth-child(2n)]:border-r-0
                md:basis-1/4 md:[&:nth-child(2n)]:border-r
                xl:flex-1 xl:basis-0
                ${m.lead ? "max-md:!basis-full max-md:flex-row max-md:border-r-0" : ""}
                ${dim ? "opacity-[0.16] grayscale" : ""}
                ${!dim && active === null ? "group-hover/strip:opacity-100" : ""}`}
            >
              {/* standing gold rule on the founder, drawn in on hover or match for the rest */}
              <span
                className={`absolute inset-x-[-1px] top-0 z-[3] h-[2px] origin-left bg-linear-to-r from-gold to-champagne transition-transform duration-500 ease-lux ${
                  m.lead || hit ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              <div
                className={`relative overflow-hidden bg-ink-2 ${
                  m.lead
                    ? "max-md:aspect-3/4 max-md:h-auto max-md:basis-[42%] max-md:shrink-0"
                    : ""
                } h-[min(72vw,340px)] sm:h-[min(62vw,400px)] xl:h-[clamp(300px,28vw,420px)]`}
              >
                <img
                  src={m.photo}
                  alt={`${m.name}, ${m.role}, BIZBUYUK Real Estate`}
                  width={660}
                  height={1100}
                  loading={i < 3 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_12%] transition-transform duration-1000 ease-lux group-hover:scale-[1.045]"
                />
                {/* the subjects stood in slightly different spots, so the backdrop does not
                    line up frame to frame; darkening the outer edges pushes it back */}
                <span className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-r from-ink/50 via-transparent to-ink/50" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[46%] bg-linear-to-b from-transparent to-ink/70" />
                <span className="absolute right-3.5 top-3.5 z-[3] flex h-[30px] w-[30px] translate-y-[-5px] items-center justify-center rounded-full border border-line bg-ink/60 text-champagne opacity-0 backdrop-blur-md transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                  <ArrowGlyph />
                </span>
              </div>

              <div
                className={`flex flex-1 flex-col gap-3 border-t border-line p-5 max-sm:p-3.5 ${
                  m.lead
                    ? "max-md:justify-center max-md:border-l max-md:border-t-0 max-md:bg-[rgba(200,161,90,0.05)] max-md:p-6"
                    : ""
                } ${m.lead ? "bg-linear-to-b from-[rgba(200,161,90,0.07)] to-[rgba(200,161,90,0.02)]" : ""}`}
              >
                <div>
                  {/* one surname runs to two lines at strip width; reserving both keeps
                      every role line on the same baseline across the register */}
                  <h2
                    className={`display text-[clamp(0.94rem,1.2vw,1.16rem)] leading-[1.18] text-cream ${
                      m.lead ? "max-md:min-h-0 max-md:text-[clamp(1.2rem,4.4vw,1.6rem)]" : ""
                    } min-h-[2.36em] text-balance`}
                  >
                    {m.name}
                  </h2>
                  <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">{m.role}</p>
                </div>

                <div className={`mt-auto flex flex-wrap gap-1.5 ${m.lead ? "max-md:mt-1" : ""}`}>
                  {m.langs.map((l) => {
                    const flag = LANG_FLAG[l];
                    return flag ? (
                      <Flag
                        key={l}
                        code={flag}
                        className={`h-[14.7px] w-[22px] transition-opacity duration-500 ${
                          active !== null && l !== active ? "opacity-30" : ""
                        }`}
                      />
                    ) : (
                      <span
                        key={l}
                        className={`rounded-[3px] border border-line px-1.5 py-[3px] text-[0.56rem] font-semibold uppercase leading-none tracking-[0.12em] text-muted transition-opacity duration-500 ${
                          active !== null && l !== active ? "opacity-30" : ""
                        }`}
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
