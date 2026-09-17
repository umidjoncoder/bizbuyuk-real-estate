// Pure calculation functions for the public calculators (/calculators/*).
// No side effects, no i18n — components own labels and formatting.

// ────────────────────────────────────────────────────────────────────────
// PLACEHOLDER figures — researched, not final. Every value below needs a
// primary-source check (CBUAE Rulebook for mortgage rules, GDRFA/ICP for
// visa/Emirates ID fees, DLD's own fee schedule) or a sign-off from BIZBUYUK
// before these numbers are trusted in front of a real customer. Flagged
// individually so a review pass can't miss one.
// ────────────────────────────────────────────────────────────────────────

export const RATES = {
  /** DLD transfer fee — stable, well-known, market convention has the buyer
      paying the full amount despite the fee nominally splitting 2/2. */
  dldTransferPct: 4, // PLACEHOLDER — confirm still 4% at ship time
  dldRegistrationFeeAed: 4200, // PLACEHOLDER — verify current DLD trustee-office + title-deed fee
  /** Secondary-market agency commission. Off-plan is 0% to the buyer (the
      developer pays) — this rate must never be applied there. */
  resaleCommissionPct: 2,
  resaleCommissionVatPct: 5,
  mortgage: {
    resident: { ratePct: 4.2, maxLtvPct: 80, maxLtvPctAbove5M: 70 }, // PLACEHOLDER — verify vs CBUAE Rulebook + bank rate cards
    nonResident: { ratePct: 5.2, maxLtvPct: 60 }, // PLACEHOLDER — non-resident LTV isn't CBUAE-mandated, varies by bank
    maxTermYears: 25,
  },
  goldenVisaThresholdAed: 2_000_000, // PLACEHOLDER — verify against GDRFA
  visaFeesAed: {
    standardPerApplicant: 10_213, // PLACEHOLDER — verify vs DLD/GDRFA fee schedule; may already bundle medical + Emirates ID for this route
    goldenPerApplicant: 6_500, // PLACEHOLDER — issuance cost varies 3,500–10,250 by route
  },
  emiratesIdPerApplicantAed: 370, // PLACEHOLDER — ICP fee varies with validity period
  insuranceAed: {
    basic: 700, // PLACEHOLDER — "starting from", varies widely
    mid: 4500,
    comprehensive: 14000,
  },
  bankMinBalanceAed: { resident: 4000, nonResident: 25000 }, // PLACEHOLDER — informational only, varies by bank
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

export type RelocationInputs = {
  applicants: number;
  visaType: "standard" | "golden";
  isBuying: boolean;
  propertyType: "offplan" | "secondary";
  price: number;
  insuranceTier: "basic" | "mid" | "comprehensive";
};

export type RelocationLine = { key: string; amount: number };

/** Line-item breakdown. Off-plan purchases never carry a commission line —
    BIZBUYUK's own real-estate copy already promises 0% commission to the
    buyer there, so showing one would contradict the site's own claim. */
export function relocationCost(inp: RelocationInputs): RelocationLine[] {
  const lines: RelocationLine[] = [];
  const visaFee = inp.visaType === "golden" ? RATES.visaFeesAed.goldenPerApplicant : RATES.visaFeesAed.standardPerApplicant;
  lines.push({ key: "visa", amount: visaFee * inp.applicants });
  lines.push({ key: "emiratesId", amount: RATES.emiratesIdPerApplicantAed * inp.applicants });
  lines.push({ key: "insurance", amount: RATES.insuranceAed[inp.insuranceTier] * inp.applicants });

  if (inp.isBuying && inp.price > 0) {
    lines.push({ key: "dldTransfer", amount: (inp.price * RATES.dldTransferPct) / 100 });
    lines.push({ key: "dldRegistration", amount: RATES.dldRegistrationFeeAed });
    if (inp.propertyType === "secondary") {
      const commission = (inp.price * RATES.resaleCommissionPct) / 100;
      lines.push({ key: "commission", amount: commission * (1 + RATES.resaleCommissionVatPct / 100) });
    }
  }

  return lines;
}
