"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { formatMoney, parseNumber } from "@/lib/format";
import { rentalYield } from "@/lib/calculators";
import { Field, NumberInput, ResultRow } from "./shared";
import { CalculatorLeadCapture } from "./CalculatorLeadCapture";

export function RentalYieldCalculator() {
  const { t } = useLang();
  const c = t.calculatorsPage;
  const r = c.rentalYield;

  const [price, setPrice] = useState("1500000");
  const [rent, setRent] = useState("110000");
  const [serviceCharge, setServiceCharge] = useState("12000");
  const [vacancy, setVacancy] = useState("5");

  const result = useMemo(
    () => rentalYield(parseNumber(price), parseNumber(rent), parseNumber(serviceCharge), parseNumber(vacancy)),
    [price, rent, serviceCharge, vacancy]
  );

  const summary = [
    { label: r.priceLabel, value: formatMoney(parseNumber(price)) },
    { label: r.rentLabel, value: formatMoney(parseNumber(rent)) },
    { label: r.serviceChargeLabel, value: formatMoney(parseNumber(serviceCharge)) },
    { label: r.vacancyLabel, value: `${parseNumber(vacancy)}%` },
    { label: r.grossLabel, value: `${result.grossPct.toFixed(1)}%` },
    { label: r.netLabel, value: `${result.netPct.toFixed(1)}%` },
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
              <Field label={r.priceLabel} className="col-span-2">
                <NumberInput value={price} onChange={setPrice} />
              </Field>
              <Field label={r.rentLabel} className="col-span-2">
                <NumberInput value={rent} onChange={setRent} />
              </Field>
              <Field label={r.serviceChargeLabel}>
                <NumberInput value={serviceCharge} onChange={setServiceCharge} />
              </Field>
              <Field label={r.vacancyLabel}>
                <NumberInput value={vacancy} onChange={setVacancy} />
              </Field>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex h-full flex-col justify-between rounded-[1.6rem] bg-ink-2 p-7 ring-1 ring-line sm:p-9">
              <div>
                <ResultRow label={r.grossLabel} value={`${result.grossPct.toFixed(1)}%`} />
                <ResultRow label={r.netLabel} value={`${result.netPct.toFixed(1)}%`} strong />
              </div>
              <p className="mt-6 text-[0.82rem] leading-relaxed text-muted">{r.resultNote}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-[70ch] text-center text-[0.8rem] leading-relaxed text-muted-dark">{c.disclaimer}</p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-[720px]">
          <CalculatorLeadCapture toolSource="Rental Yield Calculator" summary={summary} />
        </div>
      </div>
    </section>
  );
}
