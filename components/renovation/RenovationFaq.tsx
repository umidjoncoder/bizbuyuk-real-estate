"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";

export function RenovationFaq() {
  const { t } = useLang();
  const f = t.renovationPage.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line bg-ink">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="display max-w-[12ch] text-[clamp(2rem,4.6vw,3.2rem)]">{f.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[34ch] text-[0.98rem] leading-relaxed text-muted">{f.lead}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <a
              href={`${CONTACT.whatsapp}?text=${encodeURIComponent(f.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-cream mt-8"
            >
              <span>WhatsApp</span>
            </a>
          </Reveal>
        </div>

        <div>
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={0.03 * i}>
                <div className="border-b border-line first:border-t">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span className={`text-[1.02rem] font-semibold transition-colors ${isOpen ? "text-champagne" : "text-cream"}`}>
                        {item.q}
                      </span>
                      <Plus
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden
                        className={`mt-0.5 shrink-0 text-gold transition-transform duration-500 ease-lux ${isOpen ? "rotate-45" : ""}`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    hidden={!isOpen}
                    className="pb-6"
                  >
                    <p className="max-w-[64ch] text-[0.94rem] leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
