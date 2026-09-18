"use client";

import { useState } from "react";
import { Star, X, Loader2 } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { TESTIMONIAL_LANGS, REVIEW_SERVICES, type TestimonialLang } from "@/lib/testimonials";
import { COUNTRIES, DEFAULT_COUNTRY, flagEmoji } from "@/lib/countries";

export function TestimonialForm({ onClose, onSubmitted }: { onClose: () => void; onSubmitted: () => void }) {
  const { t, locale } = useLang();
  const f = t.testimonials.form;

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [flag, setFlag] = useState(DEFAULT_COUNTRY.code);
  const [lang, setLang] = useState<TestimonialLang>((["ru", "en", "uz", "ar"].includes(locale) ? locale : "en") as TestimonialLang);
  const [service, setService] = useState(REVIEW_SERVICES[0]);
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !quote.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city, flag, lang, service, rating, quote, website }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      onSubmitted();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[1.4rem] border border-line bg-ink-2 p-7 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="display text-[1.4rem]">{f.title}</h3>
          <button onClick={onClose} aria-label={f.close} className="text-muted transition-colors hover:text-cream">
            <X size={20} />
          </button>
        </div>

        {status === "done" ? (
          <p className="mt-8 text-[0.95rem] leading-relaxed text-cream/90">{f.success}</p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            {/* Honeypot — hidden from real visitors, filled only by bots. */}
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={f.name}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} className="testi-input" />
              </Field>
              <Field label={f.city}>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required maxLength={80} className="testi-input" />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={f.country}>
                <select value={flag} onChange={(e) => setFlag(e.target.value)} className="testi-input">
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {flagEmoji(c.code)} {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={f.language}>
                <select value={lang} onChange={(e) => setLang(e.target.value as TestimonialLang)} className="testi-input">
                  {TESTIMONIAL_LANGS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label={f.service}>
              <select value={service} onChange={(e) => setService(e.target.value)} className="testi-input">
                {REVIEW_SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={f.rating}>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n}/5`}>
                    <Star size={22} className={n <= rating ? "fill-gold text-gold" : "text-muted/40"} />
                  </button>
                ))}
              </div>
            </Field>

            <Field label={f.quote}>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                required
                maxLength={1200}
                rows={5}
                placeholder={f.quotePlaceholder}
                className="testi-input resize-y"
              />
            </Field>

            <p className="text-[0.78rem] leading-relaxed text-muted/70">{f.note}</p>
            {status === "error" && <p className="text-[0.85rem] text-red-400">{f.error}</p>}

            <button type="submit" disabled={status === "sending"} className="btn-gold w-full justify-center">
              {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : f.submit}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .testi-input {
          width: 100%;
          border-radius: 0.7rem;
          border: 1px solid var(--color-line);
          background: rgba(255,255,255,0.03);
          padding: 0.6rem 0.85rem;
          font-size: 0.88rem;
          color: var(--color-cream);
        }
        .testi-input:focus { outline: 2px solid var(--color-gold); outline-offset: 1px; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted">{label}</span>
      {children}
    </label>
  );
}
