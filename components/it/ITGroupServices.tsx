"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";
import type { ITGroup } from "@/lib/itServices";
import type { Locale } from "@/lib/i18n";

export function ITGroupServices({ group }: { group: ITGroup }) {
  const { t, locale } = useLang();
  const loc = locale as Locale;
  const s = t.itPage.group;

  return (
    <section className="surface-light">
      <div className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow mb-8">{s.servicesLabel}</p>
        </Reveal>

        <ul className="grid gap-px overflow-hidden rounded-[1.2rem] border border-line-dark bg-line-dark sm:grid-cols-2">
          {group.items.map((item, i) => (
            <Reveal key={item[loc]} delay={0.03 * i}>
              <li className="group h-full bg-sand-2 px-6 py-5">
                <a
                  href={`${CONTACT.whatsappIt}?text=${encodeURIComponent(`${s.askLabel} ${item[loc]}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5"
                >
                  <span className="mt-1 text-[0.68rem] font-bold tracking-[0.15em] text-bronze/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.97rem] font-semibold leading-snug text-coal transition-colors duration-300 group-hover:text-bronze">
                    {item[loc]}
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
