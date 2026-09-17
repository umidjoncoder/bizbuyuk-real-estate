"use client";

import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { PageHero } from "./PageHero";
import { ProcessRail } from "./ProcessRail";
import { ChecksBlock } from "./ChecksBlock";
import { ClosingCta } from "./ClosingCta";
import { BRAND } from "@/lib/images";

export function OffPlanPage() {
  const { t } = useLang();
  const r = t.realEstatePage;
  const o = r.offplan;

  return (
    <>
      <PageHero
        eyebrow={o.hero.eyebrow}
        title={o.hero.title}
        sub={o.hero.sub}
        cta={o.hero.cta}
        ctaHref="/#contact"
        ctaAlt={r.paths.ready.title}
        ctaAltHref="/real-estate/ready"
        image={BRAND.reOffplan}
        alt="Dubai under construction at dusk"
        crumbs={[{ label: r.home, href: "/" }, { label: r.current, href: "/real-estate" }, { label: o.current }]}
      />

      {/* what it is */}
      <section className="surface-light">
        <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[clamp(2rem,5vw,3.4rem)]">{o.what.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[64ch] text-[1.02rem] leading-relaxed text-muted-dark">{o.what.lead}</p>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {o.what.points.map((p, i) => (
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

      {/* payment plans */}
      <section id="payment" className="scroll-mt-24 border-t border-line bg-ink">
        <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[clamp(2rem,5vw,3.4rem)]">{o.payment.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">{o.payment.lead}</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {o.payment.plans.map((p, i) => (
              <Reveal key={p.title} delay={0.06 * i}>
                <article className="h-full rounded-[1.4rem] bg-gradient-to-br from-gold/[0.08] via-ink-2 to-ink-2 p-6 ring-1 ring-line">
                  <p className="text-[0.68rem] font-bold tracking-[0.22em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-[1.05rem] font-extrabold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 max-w-[64ch] border-s border-gold/40 ps-4 text-[0.88rem] leading-relaxed text-muted">
              {o.payment.note}
            </p>
          </Reveal>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 border-t border-line bg-ink-2">
        <ProcessRail title={o.process.title} lead={o.process.lead} steps={o.process.steps} />
      </section>

      <ChecksBlock title={o.checks.title} items={o.checks.items} />
      <ClosingCta title={o.cta.title} body={o.cta.body} image={BRAND.reOffplan} />
    </>
  );
}
