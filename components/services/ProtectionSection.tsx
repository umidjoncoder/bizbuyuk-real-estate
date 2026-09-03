"use client";

import { ShieldCheck, Lock, FileSearch, Stamp, Scale, Check } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { BRAND } from "@/lib/images";
import { AskLine, IconChip } from "./shared";

const icons = [ShieldCheck, Lock, FileSearch, Stamp, Scale];

/** Hairline ledger of checks on the left, a sticky trust panel on the right. */
export function ProtectionSection() {
  const { t } = useLang();
  const b = t.servicesPage.blocks[1];
  const trust = t.servicesPage.trust;

  return (
    <section id={b.id} className="scroll-mt-[132px] border-t border-line bg-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="display max-w-[14ch] text-[clamp(1.9rem,4.6vw,3.2rem)]">{b.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">{b.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <ul>
            {b.items.map((it, i) => {
              const Icon = icons[i];
              return (
                <Reveal as="li" key={it.title} delay={i * 0.06}>
                  <div className="group flex gap-5 border-b border-line py-6 last:border-b-0">
                    <IconChip icon={Icon} />
                    <div>
                      <h3 className="text-[1.05rem] font-bold tracking-tight">{it.title}</h3>
                      <p className="mt-1.5 max-w-[62ch] text-[0.94rem] leading-relaxed text-muted">{it.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.12}>
            <aside className="overflow-hidden rounded-[1.6rem] ring-1 ring-line lg:sticky lg:top-[150px]">
              <div className="card-img relative h-40">
                <img
                  src={BRAND.protection}
                  width={900}
                  height={450}
                  alt="Tower facade catching the late afternoon light"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/20 to-ink-2" />
              </div>
              <div className="bg-ink-2 p-6">
                <p className="eyebrow !text-[0.62rem] mb-4">{trust.title}</p>
                <ul className="flex flex-col">
                  {trust.items.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 border-t border-line py-3.5 text-[0.86rem] leading-relaxed text-muted first:border-t-0 first:pt-0"
                    >
                      <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-gold" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>

        <AskLine topic={b.title} />
      </div>
    </section>
  );
}
