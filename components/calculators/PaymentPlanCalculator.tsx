"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { formatMoney, parseNumber } from "@/lib/format";
import { RATES, mortgagePayment, offplanSchedule } from "@/lib/calculators";
import { Field, NumberInput, ResultRow, SegmentedToggle } from "./shared";
import { CalculatorLeadCapture } from "./CalculatorLeadCapture";

type Mode = "offplan" | "mortgage";

export function PaymentPlanCalculator() {
  const { t } = useLang();
  const c = t.calculatorsPage;
  const p = c.paymentPlan;

  const [mode, setMode] = useState<Mode>("offplan");

  // Off-plan mode
  const [price, setPrice] = useState("1500000");
  const [down, setDown] = useState("20");
  const [during, setDuring] = useState("50");
  const [handover, setHandover] = useState("20");
  const [post, setPost] = useState("10");
  const [postMonths, setPostMonths] = useState("24");

  // Mortgage mode
  const [mPrice, setMPrice] = useState("1500000");
  const [rate, setRate] = useState(String(RATES.mortgage.defaultRatePct));
  const [downPct, setDownPct] = useState(String(RATES.mortgage.defaultDownPaymentPct));
  const [term, setTerm] = useState("20");

  const stageSum = parseNumber(down) + parseNumber(during) + parseNumber(handover) + parseNumber(post);
  const stages = useMemo(
    () =>
      offplanSchedule(parseNumber(price), [
        { label: p.stageDown, pct: parseNumber(down) },
        { label: p.stageDuring, pct: parseNumber(during) },
        { label: p.stageHandover, pct: parseNumber(handover) },
        { label: p.stagePost, pct: parseNumber(post) },
      ]),
    [price, down, during, handover, post, p]
  );
  const postMonthly = stages[3] && parseNumber(postMonths) > 0 ? stages[3].amount / parseNumber(postMonths) : 0;

  const loanAmount = parseNumber(mPrice) * (1 - parseNumber(downPct) / 100);
  const mortgage = useMemo(
    () => mortgagePayment(loanAmount, parseNumber(rate), parseNumber(term)),
    [loanAmount, rate, term]
  );

  const summary =
    mode === "offplan"
      ? [
          { label: p.priceLabel, value: formatMoney(parseNumber(price)) },
          ...stages.map((s) => ({ label: s.label, value: formatMoney(s.amount) })),
          { label: p.postMonthsLabel, value: postMonths },
        ]
      : [
          { label: p.priceLabel, value: formatMoney(parseNumber(mPrice)) },
          { label: p.downPaymentLabel, value: `${parseNumber(downPct)}%` },
          { label: p.rateLabel, value: `${parseNumber(rate)}%` },
          { label: p.termLabel, value: term },
          { label: p.monthlyLabel, value: formatMoney(mortgage.monthly) },
        ];

  return (
    <section className="surface-light">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="eyebrow mb-4">{p.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)]">{p.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[62ch] text-[1rem] leading-relaxed text-muted-dark">{p.sub}</p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-8">
            <SegmentedToggle
              value={mode}
              onChange={(v) => setMode(v as Mode)}
              options={[
                { value: "offplan", label: p.modeOffplan },
                { value: "mortgage", label: p.modeMortgage },
              ]}
            />
          </div>
        </Reveal>

        {mode === "offplan" ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.12}>
              <div className="grid h-full grid-cols-2 gap-4 rounded-[1.6rem] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(21,18,13,0.4)] ring-1 ring-line-dark sm:p-9">
                <Field label={p.priceLabel} className="col-span-2">
                  <NumberInput value={price} onChange={setPrice} />
                </Field>
                <Field label={p.stageDown}><NumberInput value={down} onChange={setDown} /></Field>
                <Field label={p.stageDuring}><NumberInput value={during} onChange={setDuring} /></Field>
                <Field label={p.stageHandover}><NumberInput value={handover} onChange={setHandover} /></Field>
                <Field label={p.stagePost}><NumberInput value={post} onChange={setPost} /></Field>
                <Field label={p.postMonthsLabel} className="col-span-2">
                  <NumberInput value={postMonths} onChange={setPostMonths} />
                </Field>
                {stageSum !== 100 && (
                  <p className="col-span-2 text-[0.8rem] font-semibold text-[#b4322a]">{p.stageSumError}</p>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex h-full flex-col justify-between rounded-[1.6rem] bg-ink-2 p-7 ring-1 ring-line sm:p-9">
                <div>
                  {stages.map((s) => (
                    <ResultRow key={s.label} label={s.label} value={formatMoney(s.amount)} />
                  ))}
                  <ResultRow
                    label={`${p.stagePost} — ${p.perMonthLabel}`}
                    value={formatMoney(postMonthly)}
                    strong
                  />
                </div>
                <p className="mt-6 text-[0.82rem] leading-relaxed text-muted">{p.offplanNote}</p>
              </div>
            </Reveal>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.12}>
              <div className="grid h-full grid-cols-2 gap-4 rounded-[1.6rem] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(21,18,13,0.4)] ring-1 ring-line-dark sm:p-9">
                <Field label={p.priceLabel} className="col-span-2">
                  <NumberInput value={mPrice} onChange={setMPrice} />
                </Field>
                <Field label={p.downPaymentLabel}><NumberInput value={downPct} onChange={setDownPct} /></Field>
                <Field label={p.rateLabel}><NumberInput value={rate} onChange={setRate} /></Field>
                <Field label={p.termLabel} className="col-span-2"><NumberInput value={term} onChange={setTerm} /></Field>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex h-full flex-col justify-between rounded-[1.6rem] bg-ink-2 p-7 ring-1 ring-line sm:p-9">
                <div>
                  <ResultRow label={p.monthlyLabel} value={formatMoney(mortgage.monthly)} strong />
                  <ResultRow label={p.totalInterestLabel} value={formatMoney(mortgage.totalInterest)} />
                </div>
                <p className="mt-6 text-[0.82rem] leading-relaxed text-muted">{p.mortgageNote}</p>
              </div>
            </Reveal>
          </div>
        )}

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-[70ch] text-center text-[0.8rem] leading-relaxed text-muted-dark">{c.disclaimer}</p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-[720px]">
          <CalculatorLeadCapture toolSource="Payment Plan Calculator" summary={summary} />
        </div>
      </div>
    </section>
  );
}
