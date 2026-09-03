"use client";

import { Users, Settings, PaintRoller, TrendingUp } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { img, IMAGES } from "@/lib/images";
import { AskLine, IconChip } from "./shared";

const icons = [Users, Settings, PaintRoller, TrendingUp];
/** Two of the four tiles carry a photo so the grid is not four text boxes. */
const photos: (string | null)[] = [IMAGES.livingGold, null, null, IMAGES.sunset];
const photoAlt = [
  "Luxury living room in a Dubai apartment",
  "",
  "",
  "UAE waterfront homes at sunset",
];

export function ManagementSection() {
  const { t } = useLang();
  const b = t.servicesPage.blocks[3];

  return (
    <section id={b.id} className="scroll-mt-[132px] border-t border-line bg-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="display max-w-[16ch] text-[clamp(1.9rem,4.6vw,3.2rem)]">{b.title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">{b.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {b.items.map((it, i) => {
            const Icon = icons[i];
            const photo = photos[i];
            return (
              <Reveal key={it.title} delay={i * 0.08}>
                {photo ? (
                  <article className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[1.6rem] ring-1 ring-line">
                    <div className="card-img absolute inset-0">
                      <img
                        src={img(photo, 760, 560)}
                        alt={photoAlt[i]}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/65 to-ink/95" />
                    <div className="relative p-7">
                      <IconChip icon={Icon} />
                      <h3 className="mt-4 text-xl font-extrabold tracking-tight">{it.title}</h3>
                      <p className="mt-2 max-w-[46ch] text-[0.92rem] leading-relaxed text-cream/75">{it.body}</p>
                    </div>
                  </article>
                ) : (
                  <article className="group h-full rounded-[1.6rem] bg-gradient-to-br from-gold/[0.09] via-ink-2 to-ink-2 p-7 ring-1 ring-line">
                    <IconChip icon={Icon} />
                    <h3 className="mt-4 text-xl font-extrabold tracking-tight">{it.title}</h3>
                    <p className="mt-2 max-w-[46ch] text-[0.92rem] leading-relaxed text-muted">{it.body}</p>
                  </article>
                )}
              </Reveal>
            );
          })}
        </div>

        <AskLine topic={b.title} />
      </div>
    </section>
  );
}
