"use client";

import { useLang } from "../LanguageProvider";
import { WhyBlock } from "./WhyBlock";

export function RealEstateWhy() {
  const { t } = useLang();
  return <WhyBlock title={t.realEstatePage.why.title} cards={t.realEstatePage.why.cards} />;
}
