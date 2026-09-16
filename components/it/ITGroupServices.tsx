"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";
import { itGroupBySlug } from "@/lib/itServices";
import type { Locale } from "@/lib/i18n";

/* Each service is a real card, not a row in a list — an index, a title and
   an actual sentence explaining what it means in practice, not just its
   name. A bare label ("Payment gateway integration") reads as a keyword; the
   description is what makes the page an explanation instead of a directory. */
export function ITGroupServices({ slug }: { slug: string }) {
  const { t, locale } = useLang();
  const loc = locale as Locale;
  const s = t.itPage.group;
  const group = itGroupBySlug(slug);
  if (!group) return null;

  return (
    <section className="surface-light">
      <div className="mx-auto max-w-[1080px] px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow mb-3">{s.servicesLabel}</p>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mb-10 max-w-[60ch] text-[0.95rem] leading-relaxed text-muted-dark">{s.servicesIntro}</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {group.items.map((item, i) => (
            <Reveal key={item.label[loc]} delay={0.04 * i}>
              <a
                href={`${CONTACT.whatsappIt}?text=${encodeURIComponent(`${s.askLabel} ${item.label[loc]}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[1.25rem] bg-sand-2 p-6 ring-1 ring-line-dark transition-all duration-500 ease-lux hover:-translate-y-1 hover:ring-bronze/40 hover:shadow-[0_22px_46px_-26px_rgba(21,18,13,0.38)] sm:p-7"
              >
                <span className="text-[0.7rem] font-bold tracking-[0.2em] text-bronze/70">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[1.02rem] font-extrabold leading-snug tracking-tight text-coal">
                  {item.label[loc]}
                </h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-muted-dark">{item.description[loc]}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.stack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-[5px] border border-line-dark bg-white/50 px-2 py-0.5 font-mono text-[0.68rem] font-medium text-bronze"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.76rem] font-bold text-bronze opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {s.askButton}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
