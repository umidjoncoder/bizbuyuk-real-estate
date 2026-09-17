"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";

/* The credibility problem with a services list like this one is that anyone
   can write it — the words cost nothing. What's actually hard to fake is a
   system in daily use. So instead of client logos or invented project stats,
   this section names the two real, running platforms behind BIZBUYUK's own
   businesses and offers a walkthrough of them. */
export function ITProof() {
  const { t } = useLang();
  const p = t.itPage.proof;

  return (
    <section className="surface-light">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-4">{p.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display max-w-[16ch] text-[clamp(1.9rem,4.6vw,3.2rem)]">{p.title}</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {p.items.map((item, i) => (
            <Reveal key={item.title} delay={0.08 + i * 0.08}>
              <a
                href={`${CONTACT.whatsappIt}?text=${encodeURIComponent(`${item.cta}: ${item.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[1.4rem] bg-sand-2 p-7 ring-1 ring-line-dark transition-all duration-500 hover:-translate-y-1 hover:ring-bronze/40 hover:shadow-[0_24px_50px_-28px_rgba(21,18,13,0.4)] sm:p-8"
              >
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-bronze">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-[1.3rem] font-extrabold tracking-tight">{item.title}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-dark">{item.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-bronze">
                  {item.cta}
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2.4}
                    className="transition-transform duration-500 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
