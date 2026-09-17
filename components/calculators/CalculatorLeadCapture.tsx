"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import { PhoneField } from "../PhoneField";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { CONTACT } from "@/lib/i18n";
import { Field } from "./shared";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Bottom-of-page capture for every calculator: ungated (the numbers above
 * already computed for free), this just offers to have a consultant confirm
 * them. Posts through the same /api/lead endpoint every other form uses,
 * tagged with `toolSource` so each calculator shows up as its own lead
 * source in the CRM instead of one vague "Website" bucket.
 */
export function CalculatorLeadCapture({ toolSource, summary }: { toolSource: string; summary: { label: string; value: string }[] }) {
  const { t, locale } = useLang();
  const l = t.calculatorsPage.leadCapture;

  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
          page: toolSource,
          toolSource,
          details: summary,
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
      setName(""); setPhone(""); setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Reveal>
      <div className="rounded-[1.6rem] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(21,18,13,0.4)] ring-1 ring-line-dark sm:p-9">
        <h3 className="text-[1.3rem] font-extrabold tracking-tight text-coal">{l.title}</h3>
        <p className="mt-2 max-w-[52ch] text-[0.92rem] leading-relaxed text-muted-dark">{l.body}</p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-8">
              <p className="text-[1.02rem] font-semibold text-coal">{l.success}</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-3">
              <input
                type="text" tabIndex={-1} autoComplete="off" aria-hidden
                value={company} onChange={(e) => setCompany(e.target.value)} className="hidden"
              />
              <Field label={l.name}>
                <input className="field" required value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field label={l.phone}>
                <PhoneField value={phone} onChange={setPhone} required />
              </Field>
              <Field label={l.email}>
                <input
                  className="field" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)} onBlur={() => setEmail(normalizeEmail(email))}
                />
              </Field>
              <div className="sm:col-span-3">
                <button type="submit" disabled={status === "sending"} className="btn-gold w-full justify-center disabled:opacity-60 sm:w-auto">
                  {status === "sending" ? l.sending : l.submit}
                </button>
                {status === "error" && <p className="mt-3 text-sm font-semibold text-[#b4322a]">{l.error}</p>}
                <p className="mt-4 text-xs leading-relaxed text-muted-dark">{l.consent}</p>
                <a
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent(toolSource)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-block border-b border-current/30 pb-px text-sm font-semibold text-gold transition-colors hover:border-current"
                >
                  {l.whatsapp}
                </a>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
