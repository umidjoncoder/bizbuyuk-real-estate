"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, flagEmoji, splitPhone, type Country } from "@/lib/countries";

type Theme = "light" | "crm";

type Props = {
  /** Full phone string, e.g. "+998 90 123 45 67". */
  value: string;
  /** Called with the combined "+<dial> <national>" string (or "" when empty). */
  onChange: (full: string) => void;
  theme?: Theme;
  placeholder?: string;
  required?: boolean;
  id?: string;
  name?: string;
};

export function PhoneField({ value, onChange, theme = "light", placeholder, required, id, name }: Props) {
  const isLight = theme === "light";
  const [country, setCountry] = useState<Country>(() => splitPhone(value).country || DEFAULT_COUNTRY);
  const [national, setNational] = useState(() => splitPhone(value).national || "");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  // The last value we emitted upward — used to tell our own echo apart from a
  // genuine external change to `value`.
  const lastEmitted = useRef<string>(value);

  // Emit the combined value whenever the parts change.
  const emit = (c: Country, n: string) => {
    const clean = n.replace(/[^\d\s]/g, "").trim();
    const full = clean ? `${c.dial} ${clean}` : "";
    lastEmitted.current = full;
    onChange(full);
  };

  // Re-parse when the parent changes `value` externally — e.g. opening a
  // different lead in the same drawer, or resetting the form to "" after submit.
  // Ignore the value echoing back from our own emit() so typing doesn't loop.
  useEffect(() => {
    if (value === lastEmitted.current) return;
    const p = splitPhone(value);
    setCountry(p.country || DEFAULT_COUNTRY);
    setNational(p.national || "");
    lastEmitted.current = value;
  }, [value]);

  // Close dropdown on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    setTimeout(() => searchRef.current?.focus(), 30);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    const qDigits = q.replace(/\D/g, "");
    return COUNTRIES.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      (qDigits && c.dial.includes(qDigits)),
    );
  }, [query]);

  const t = isLight
    ? {
        bg: "#ffffff",
        border: "var(--color-line-dark)",
        borderOn: "var(--color-gold)",
        ring: "0 0 0 4px rgba(200, 161, 90, 0.16)",
        text: "var(--color-coal)",
        muted: "rgba(21, 18, 13, 0.55)",
        radius: "14px",
        pad: "1rem 1.1rem",
        font: "1rem",
        panelBg: "#ffffff",
        panelBorder: "var(--color-line-dark)",
        hover: "rgba(200, 161, 90, 0.12)",
      }
    : {
        bg: "var(--crm-input-bg)",
        border: "var(--crm-border)",
        borderOn: "var(--crm-border-strong)",
        ring: "0 0 0 3px rgba(200, 161, 90, 0.12)",
        text: "var(--crm-text)",
        muted: "var(--crm-muted)",
        radius: "0.75rem",
        pad: "0.6rem 0.85rem",
        font: "0.875rem",
        panelBg: "var(--crm-surface)",
        panelBorder: "var(--crm-border)",
        hover: "var(--crm-surface-hover)",
      };

  return (
    <div ref={wrapRef} className="relative">
      <div
        className="flex items-stretch w-full"
        style={{
          background: t.bg,
          border: `1px solid ${focused ? t.borderOn : t.border}`,
          borderRadius: t.radius,
          boxShadow: focused ? t.ring : "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      >
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Select country code"
          className="flex items-center gap-1.5 flex-shrink-0 cursor-pointer select-none"
          style={{
            padding: isLight ? "0 0.6rem 0 1.05rem" : "0 0.5rem 0 0.8rem",
            color: t.text,
            fontSize: t.font,
            fontWeight: 600,
          }}
        >
          <span style={{ fontSize: "1.15em", lineHeight: 1 }}>{flagEmoji(country.code)}</span>
          <span>{country.dial}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.5, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Divider */}
        <span style={{ width: 1, background: t.border, margin: "0.5rem 0" }} />

        {/* National number */}
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required={required}
          placeholder={placeholder || "90 123 45 67"}
          value={national}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => { const v = e.target.value; setNational(v); emit(country, v); }}
          className="flex-1 min-w-0 bg-transparent outline-none"
          style={{ padding: t.pad, color: t.text, fontSize: t.font }}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute z-50 mt-1.5 w-full overflow-hidden"
          style={{
            background: t.panelBg,
            border: `1px solid ${t.panelBorder}`,
            borderRadius: t.radius,
            boxShadow: "0 24px 48px -20px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ padding: "0.5rem", borderBottom: `1px solid ${t.border}` }}>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code…"
              className="w-full bg-transparent outline-none"
              style={{ padding: "0.4rem 0.5rem", color: t.text, fontSize: "0.85rem" }}
            />
          </div>
          <div className="max-h-64 overflow-y-auto crm-scroll">
            {filtered.length === 0 ? (
              <div style={{ padding: "0.9rem", color: t.muted, fontSize: "0.85rem", textAlign: "center" }}>No match</div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { setCountry(c); emit(c, national); setOpen(false); setQuery(""); }}
                  className="flex items-center gap-2.5 w-full text-left cursor-pointer"
                  style={{
                    padding: "0.55rem 0.8rem",
                    color: t.text,
                    fontSize: "0.85rem",
                    background: c.code === country.code ? t.hover : "transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = t.hover)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = c.code === country.code ? t.hover : "transparent")}
                >
                  <span style={{ fontSize: "1.1em" }}>{flagEmoji(c.code)}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span style={{ color: t.muted, fontWeight: 600 }}>{c.dial}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
