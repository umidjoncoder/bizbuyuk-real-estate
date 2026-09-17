"use client";

/** Field/Select wrappers shared by all three calculators — promoted from the
    pattern QuoteForm.tsx used locally, so every input on the site looks and
    behaves the same way. */

export function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-2 block text-[0.78rem] font-semibold tracking-wide text-muted-dark">{label}</span>
      {children}
    </label>
  );
}

export function Select({
  value, onChange, options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <select className="field crm-select min-w-0" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function NumberInput({
  value, onChange, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className="field"
      type="text"
      inputMode="decimal"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/** A result line: label left, value right, same rhythm everywhere. */
export function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 border-line-dark py-3 ${strong ? "" : "border-b"}`}>
      <span className={`text-[0.9rem] ${strong ? "font-extrabold text-coal" : "text-muted-dark"}`}>{label}</span>
      <span className={`shrink-0 tabular-nums ${strong ? "text-xl font-extrabold text-coal" : "text-[0.95rem] font-semibold text-coal"}`}>
        {value}
      </span>
    </div>
  );
}

/** Segmented mode toggle, e.g. off-plan vs. mortgage. */
export function SegmentedToggle({
  options, value, onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-line-dark bg-white/70 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-full px-4 py-2 text-[0.82rem] font-semibold transition-colors duration-300 ${
            value === o.value ? "bg-coal text-cream" : "text-muted-dark hover:text-coal"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
