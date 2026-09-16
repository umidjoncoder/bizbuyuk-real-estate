"use client";

import { useLang } from "../LanguageProvider";
import { ClosingCta } from "./ClosingCta";

export function RealEstateCta() {
  const { t } = useLang();
  return <ClosingCta title={t.realEstatePage.cta.title} body={t.realEstatePage.cta.body} />;
}
