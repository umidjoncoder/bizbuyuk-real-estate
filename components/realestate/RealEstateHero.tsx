"use client";

import { useLang } from "../LanguageProvider";
import { PageHero } from "./PageHero";
import { BRAND } from "@/lib/images";

export function RealEstateHero() {
  const { t } = useLang();
  const r = t.realEstatePage;
  return (
    <PageHero
      eyebrow={r.hero.eyebrow}
      title={r.hero.title}
      sub={r.hero.sub}
      cta={r.hero.cta}
      ctaHref="/#contact"
      ctaAlt={r.hero.ctaAlt}
      ctaAltHref="#districts"
      image={BRAND.reHero}
      alt="Dubai Marina at night from the water"
      crumbs={[{ label: r.home, href: "/" }, { label: r.current }]}
      stats={r.stats}
    />
  );
}
