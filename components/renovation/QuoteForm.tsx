"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { PhoneField } from "../PhoneField";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { CONTACT } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

export function QuoteForm() {
  const { t, locale } = useLang();
  const q = t.renovationPage.quote;
  const styles = t.renovationPage.design.styles;

  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [kind, setKind] = useState(q.propertyTypes[0]);
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState(q.conditions[0]);
  const [style, setStyle] = useState(styles[0]);
  const [budget, setBudget] = useState(q.budgets[0]);
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanEmail = normalizeEmail(email);
    if (!name.trim() || phone.replace(/\D/g, "").length < 7 || !isValidEmail(cleanEmail)) {
      setStatus("error");
      return;
    }
    setEmail(cleanEmail);
    setStatus("sending");

    // The brief rides along as label/value pairs: it reaches Telegram, the lead
    // email and the CRM lead's comment thread without a schema change.
    const details = [
      { label: "Service", value: "Turnkey renovation" },
      { label: q.location, value: location },
      { label: q.propertyType, value: kind },
      { label: q.size, value: size },
      { label: q.condition, value: condition },
      { label: q.style, value: style },
      { label: q.budget, value: budget },
      { label: q.message, value: message },
    ].filter((d) => d.value.trim());

    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: cleanEmail,
          preferredContact: "WhatsApp",
          locale,
          company,
          page: "renovation",
          details,
          utm: {
            source: params.get("utm_source") || "",
            medium: params.get("utm_medium") || "",
            campaign: params.get("utm_campaign") || "",
          },
          referrer: document.referrer || "",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName(""); setPhone(""); setEmail(""); setLocation(""); setSize(""); setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="quote" className="surface-light scroll-mt-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="min-w-0">
          <Reveal>
            <h2 className="display max-w-[14ch] text-[clamp(2rem,4.6vw,3.2rem)]">{q.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[44ch] text-[1rem] leading-relaxed text-muted-dark">{q.lead}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 max-w-[40ch] border-l border-bronze/40 pl-4 text-[0.88rem] leading-relaxed text-muted-dark">
              {q.photosNote}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0">
          <div className="rounded-[1.6rem] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(21,18,13,0.4)] ring-1 ring-line-dark sm:p-9">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 text-center"
                >
                  <p className="text-[1.05rem] font-semibold text-coal">{q.success}</p>
                  <a
                    href={`${CONTACT.whatsapp}?text=${encodeURIComponent(q.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-coal mt-8"
                  >
                    <span>WhatsApp</span>
                  </a>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="hidden"
                  />

                  <Field label={q.name} className="sm:col-span-2">
                    <input className="field" required value={name} onChange={(e) => setName(e.target.value)} />
                  </Field>

                  <Field label={q.phone}>
                    <PhoneField value={phone} onChange={setPhone} required />
                  </Field>

                  <Field label={q.email}>
                    <input
                      className="field"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEmail(normalizeEmail(email))}
                    />
                  </Field>

                  <Field label={q.location}>
                    <input className="field" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </Field>

                  <Field label={q.size}>
                    <input className="field" inputMode="numeric" value={size} onChange={(e) => setSize(e.target.value)} />
                  </Field>

                  <Field label={q.propertyType}>
                    <Select value={kind} onChange={setKind} options={q.propertyTypes} />
                  </Field>

                  <Field label={q.condition}>
                    <Select value={condition} onChange={setCondition} options={q.conditions} />
                  </Field>

                  <Field label={q.style}>
                    <Select value={style} onChange={setStyle} options={styles} />
                  </Field>

                  <Field label={q.budget}>
                    <Select value={budget} onChange={setBudget} options={q.budgets} />
                  </Field>

                  <Field label={q.message} className="sm:col-span-2">
                    <textarea
                      className="field min-h-[110px] resize-y"
                      placeholder={q.messagePlaceholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <button type="submit" disabled={status === "sending"} className="btn-gold w-full justify-center disabled:opacity-60">
                      {status === "sending" ? q.sending : q.submit}
                    </button>
                    {status === "error" && (
                      <p className="mt-3 text-center text-sm font-semibold text-[#b4322a]">{q.error}</p>
                    )}
                    <p className="mt-4 text-center text-xs leading-relaxed text-muted-dark">{q.consent}</p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-2 block text-[0.78rem] font-semibold tracking-wide text-muted-dark">{label}</span>
      {children}
    </label>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <select className="field crm-select min-w-0" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
