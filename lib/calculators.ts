// Pure calculation functions for the public calculators (/calculators/*).
// No side effects, no i18n — components own labels and formatting.

// Figures below are BIZBUYUK's own numbers, confirmed directly by the
// business (2026-09), not researched estimates — safe to publish as-is.
export const RATES = {
  /** One-time, paid on any purchase. No other percentage-based government
      fee applies on top of it. */
  dldTransferPct: 4,
  /** Flat admin fee alongside the transfer fee — DLD calls this a
      registration/admin charge, not a percentage. */
  dldAdminFeeAed: 4000,
  mortgage: {
    defaultRatePct: 4,
    defaultDownPaymentPct: 20,
    maxTermYears: 25,
  },
  /** Minimum property investment to qualify for the UAE Golden Visa.
      BIZBUYUK handles the application — no separate price is quoted
      publicly for the visa itself. */
  goldenVisaThresholdAed: 2_000_000,
} as const;

export function rentalYield(price: number, annualRent: number, serviceCharge: number, vacancyPct: number) {
  if (price <= 0) return { grossPct: 0, netPct: 0, effectiveRent: 0 };
  const effectiveRent = annualRent * (1 - vacancyPct / 100);
  const grossPct = (annualRent / price) * 100;
  const netPct = ((effectiveRent - serviceCharge) / price) * 100;
  return { grossPct, netPct, effectiveRent };
}

export type OffplanStage = { label: string; pct: number };

export function offplanSchedule(price: number, stages: OffplanStage[]) {
  return stages.map((s) => ({ ...s, amount: (price * s.pct) / 100 }));
}

export function mortgagePayment(loanAmount: number, annualRatePct: number, termYears: number) {
  const n = Math.max(1, Math.round(termYears * 12));
  const i = annualRatePct / 100 / 12;
  if (i === 0) return { monthly: loanAmount / n, totalInterest: 0, n };
  const monthly = (loanAmount * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  const totalInterest = monthly * n - loanAmount;
  return { monthly, totalInterest, n };
}

export type PurchaseCostLine = { key: "dldTransfer" | "dldAdmin"; amount: number };

/** The one-time government cost of a purchase: transfer fee + admin fee.
    No agency commission line — BIZBUYUK doesn't charge one on this
    calculator's numbers, so it never appears here regardless of listing
    type. */
export function propertyPurchaseCosts(price: number): PurchaseCostLine[] {
  if (price <= 0) return [];
  return [
    { key: "dldTransfer", amount: (price * RATES.dldTransferPct) / 100 },
    { key: "dldAdmin", amount: RATES.dldAdminFeeAed },
  ];
}
