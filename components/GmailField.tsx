"use client";

import React from "react";
import { isValidEmail, normalizeEmail } from "@/lib/email";

// Email input that completes a bare name to a full Gmail address: typing
// "sardor" resolves to "sardor@gmail.com", while an address that already
// carries its own domain is left alone. The resolved value is previewed
// underneath while typing and committed into the field on blur, so what the
// user sees before saving is exactly what gets stored.
//
// Deliberately not type="email" — browsers reject a bare "sardor" as invalid
// before we ever get the chance to complete it. That also drops the native
// check, so the malformed case is flagged inline here instead.
export function GmailField({
  value,
  onChange,
  hint,
  invalidHint,
  required = false,
  placeholder = "sardor",
}: {
  value: string;
  onChange: (v: string) => void;
  hint: string;
  invalidHint: string;
  required?: boolean;
  placeholder?: string;
}) {
  const typed = value.trim();
  const resolved = normalizeEmail(value);
  const completed = resolved !== "" && resolved !== typed.toLowerCase();
  // An empty optional field is fine; only a non-empty malformed one is flagged.
  const invalid = typed !== "" && !isValidEmail(resolved);

  return (
    <>
      <input
        type="text"
        inputMode="email"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required={required}
        aria-invalid={invalid}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onChange(resolved)}
        placeholder={placeholder}
        className={`crm-input ${invalid ? "is-invalid" : ""}`}
      />
      <p className="text-[10px] mt-1 truncate">
        {invalid ? (
          <span className="text-red-500">{invalidHint}</span>
        ) : completed ? (
          <span className="crm-gold font-medium">{resolved}</span>
        ) : (
          <span className="crm-faint">{hint}</span>
        )}
      </p>
    </>
  );
}
