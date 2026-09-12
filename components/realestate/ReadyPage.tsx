"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { PageHero } from "./PageHero";
import { ProcessRail } from "./ProcessRail";
import { ChecksBlock } from "./ChecksBlock";
import { ClosingCta } from "./ClosingCta";
import { BRAND } from "@/lib/images";

export function ReadyPage() {
  const { t } = useLang();
  const r = t.realEstatePage;
  const y = r.ready;

  return (
    <>
      <PageHero
        eyebrow={y.hero.eyebrow}
        title={y.hero.title}
        sub={y.hero.sub}
        cta={y.hero.cta}
        ctaHref="/#contact"
        ctaAlt={r.paths.offplan.title}
        ctaAltHref="/real-estate/off-plan"
        image={BRAND.reReady}
        alt="Completed waterfront homes in the UAE at sunset"
        crumbs={[{ label: r.home, href: "/" }, { label: r.current, href: "/real-estate" }, { label: y.current }]}
      />

      <section className="surface-light">
        <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[clamp(2rem,5vw,3.4rem)]">{y.what.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[52ch] text-[1.15rem] font-semibold leading-snug">{y.what.lead}</p>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {y.what.points.map((p, i) => (
              <Reveal key={p.title} delay={0.05 * i}>
                <div className="min-w-0 border-t border-line-dark pt-5">
                  <h3 className="text-[1.05rem] font-extrabold tracking-tight">{p.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-[0.94rem] leading-relaxed text-muted-dark">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 border-t border-line bg-ink">
        <ProcessRail title={y.process.title} lead={y.process.lead} steps={y.process.steps} />
      </section>

      <ChecksBlock title={y.checks.title} items={y.checks.items} />
      <ClosingCta title={y.cta.title} body={y.cta.body} image={BRAND.reReady} />
    </>
  );
}
