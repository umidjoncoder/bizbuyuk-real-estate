"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { CONTACT } from "@/lib/i18n";
import { formatMoney, parseNumber } from "@/lib/format";
import { propertyPurchaseCosts } from "@/lib/calculators";
import { Field, NumberInput, ResultRow, SegmentedToggle } from "./shared";
import { CalculatorLeadCapture } from "./CalculatorLeadCapture";

const lineLabelKey = { dldTransfer: "lineDldTransfer", dldAdmin: "lineDldAdmin" } as const;

export function RelocationCostCalculator() {
  const { t } = useLang();
  const c = t.calculatorsPage;
  const r = c.relocationCost;

  const [isBuying, setIsBuying] = useState(false);
  const [price, setPrice] = useState("1500000");

  const lines = useMemo(() => (isBuying ? propertyPurchaseCosts(parseNumber(price)) : []), [isBuying, price]);
  const total = lines.reduce((sum, l) => sum + l.amount, 0);

  const summary = [
    { label: r.buyingLabel, value: isBuying ? r.buyingYes : r.buyingNo },
    ...(isBuying ? [{ label: r.priceLabel, value: formatMoney(parseNumber(price)) }] : []),
    ...lines.map((l) => ({ label: r[lineLabelKey[l.key]], value: formatMoney(l.amount) })),
    ...(isBuying ? [{ label: r.totalLabel, value: formatMoney(total) }] : []),
  ];

  return (
    <section className="surface-light">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="eyebrow mb-4">{r.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)]">{r.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[62ch] text-[1rem] leading-relaxed text-muted-dark">{r.sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.12}>
            <div className="grid h-full grid-cols-2 gap-4 rounded-[1.6rem] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(21,18,13,0.4)] ring-1 ring-line-dark sm:p-9">
              <Field label={r.buyingLabel} className="col-span-2">
                <SegmentedToggle
                  value={isBuying ? "yes" : "no"}
                  onChange={(v) => setIsBuying(v === "yes")}
                  options={[
                    { value: "no", label: r.buyingNo },
                    { value: "yes", label: r.buyingYes },
                  ]}
                />
              </Field>
              {isBuying && (
                <Field label={r.priceLabel} className="col-span-2">
                  <NumberInput value={price} onChange={setPrice} />
                </Field>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex h-full flex-col justify-between rounded-[1.6rem] bg-ink-2 p-7 ring-1 ring-line sm:p-9">
              {isBuying ? (
                <div>
                  {lines.map((l) => (
                    <ResultRow key={l.key} label={r[lineLabelKey[l.key]]} value={formatMoney(l.amount)} />
                  ))}
                  <ResultRow label={r.totalLabel} value={formatMoney(total)} strong />
                </div>
              ) : (
                <p className="text-[0.92rem] leading-relaxed text-muted">{r.notBuyingNote}</p>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="mt-10 rounded-[1.6rem] border border-gold/30 bg-gold/[0.06] p-7 sm:p-9">
            <h3 className="text-[1.05rem] font-extrabold tracking-tight text-cream">{r.goldenVisaTitle}</h3>
            <p className="mt-2 max-w-[62ch] text-[0.92rem] leading-relaxed text-muted">{r.goldenVisaNote}</p>
            <a
              href={`${CONTACT.whatsapp}?text=${encodeURIComponent(r.goldenVisaTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block border-b border-current/30 pb-px text-sm font-semibold text-gold transition-colors hover:border-current"
            >
              {r.goldenVisaCta}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-[70ch] text-center text-[0.8rem] leading-relaxed text-muted-dark">{c.disclaimer}</p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-[720px]">
          <CalculatorLeadCapture toolSource="Relocation Cost Calculator" summary={summary} />
        </div>
      </div>
    </section>
  );
}
