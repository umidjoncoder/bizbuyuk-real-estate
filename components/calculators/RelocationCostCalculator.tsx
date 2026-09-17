"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { formatMoney, parseNumber } from "@/lib/format";
import { relocationCost, type RelocationInputs } from "@/lib/calculators";
import { Field, NumberInput, ResultRow, SegmentedToggle } from "./shared";
import { CalculatorLeadCapture } from "./CalculatorLeadCapture";

type VisaType = RelocationInputs["visaType"];
type PropertyType = RelocationInputs["propertyType"];
type InsuranceTier = RelocationInputs["insuranceTier"];

export function RelocationCostCalculator() {
  const { t } = useLang();
  const c = t.calculatorsPage;
  const r = c.relocationCost;

  const [applicants, setApplicants] = useState("1");
  const [visaType, setVisaType] = useState<VisaType>("standard");
  const [isBuying, setIsBuying] = useState(false);
  const [propertyType, setPropertyType] = useState<PropertyType>("secondary");
  const [price, setPrice] = useState("1500000");
  const [insuranceTier, setInsuranceTier] = useState<InsuranceTier>("mid");

  const lineLabel: Record<string, string> = {
    visa: r.lineVisa,
    emiratesId: r.lineEmiratesId,
    insurance: r.lineInsurance,
    dldTransfer: r.lineDldTransfer,
    dldRegistration: r.lineDldRegistration,
    commission: r.lineCommission,
  };

  const lines = useMemo(
    () =>
      relocationCost({
        applicants: Math.max(1, Math.round(parseNumber(applicants))),
        visaType,
        isBuying,
        propertyType,
        price: parseNumber(price),
        insuranceTier,
      }),
    [applicants, visaType, isBuying, propertyType, price, insuranceTier]
  );
  const total = lines.reduce((sum, l) => sum + l.amount, 0);

  const summary = [
    { label: r.applicantsLabel, value: applicants },
    { label: r.visaTypeLabel, value: visaType === "golden" ? r.goldenOption : r.standardOption },
    { label: r.buyingLabel, value: isBuying ? r.buyingYes : r.buyingNo },
    ...(isBuying
      ? [
          { label: r.propertyTypeLabel, value: propertyType === "offplan" ? r.offplanOption : r.secondaryOption },
          { label: r.priceLabel, value: formatMoney(parseNumber(price)) },
        ]
      : []),
    ...lines.map((l) => ({ label: lineLabel[l.key], value: formatMoney(l.amount) })),
    { label: r.totalLabel, value: formatMoney(total) },
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
              <Field label={r.applicantsLabel}>
                <NumberInput value={applicants} onChange={setApplicants} />
              </Field>
              <Field label={r.visaTypeLabel}>
                <SegmentedToggle
                  value={visaType}
                  onChange={(v) => setVisaType(v as VisaType)}
                  options={[
                    { value: "standard", label: r.standardOption },
                    { value: "golden", label: r.goldenOption },
                  ]}
                />
              </Field>
              <Field label={r.insuranceLabel}>
                <SegmentedToggle
                  value={insuranceTier}
                  onChange={(v) => setInsuranceTier(v as InsuranceTier)}
                  options={[
                    { value: "basic", label: r.basicOption },
                    { value: "mid", label: r.midOption },
                    { value: "comprehensive", label: r.comprehensiveOption },
                  ]}
                />
              </Field>
              <Field label={r.buyingLabel}>
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
                <>
                  <Field label={r.propertyTypeLabel}>
                    <SegmentedToggle
                      value={propertyType}
                      onChange={(v) => setPropertyType(v as PropertyType)}
                      options={[
                        { value: "offplan", label: r.offplanOption },
                        { value: "secondary", label: r.secondaryOption },
                      ]}
                    />
                  </Field>
                  <Field label={r.priceLabel}>
                    <NumberInput value={price} onChange={setPrice} />
                  </Field>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex h-full flex-col justify-between rounded-[1.6rem] bg-ink-2 p-7 ring-1 ring-line sm:p-9">
              <div>
                {lines.map((l) => (
                  <ResultRow key={l.key} label={lineLabel[l.key]} value={formatMoney(l.amount)} />
                ))}
                <ResultRow label={r.totalLabel} value={formatMoney(total)} strong />
              </div>
              <p className="mt-6 text-[0.82rem] leading-relaxed text-muted">{r.bankNote}</p>
            </div>
          </Reveal>
        </div>

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
