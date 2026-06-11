"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { CONTACT } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

export function LeadForm() {
  const { t, locale } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!name.trim() || phone.replace(/\D/g, "").length < 7 || !emailValid) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      // Capture where this lead came from (ad campaign / referrer) so the CRM
      // and Telegram both record the real source instead of a blank "Website".
      const params = new URLSearchParams(window.location.search);
      const utm = {
        source: params.get("utm_source") || "",
        medium: params.get("utm_medium") || "",
        campaign: params.get("utm_campaign") || "",
      };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          locale,
          company,
          page: window.location.pathname || "landing",
          utm,
          referrer: document.referrer || "",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="surface-light">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">{t.lead.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-[clamp(2.1rem,5.5vw,3.8rem)]">{t.lead.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted-dark">{t.lead.sub}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3">
              <a href={CONTACT.phoneHref} className="inline-flex items-center gap-3 text-lg font-bold text-coal transition-colors hover:text-bronze">
                <Dot /> {CONTACT.phone}
              </a>
              <a href={CONTACT.phone2Href} className="inline-flex items-center gap-3 text-lg font-bold text-coal transition-colors hover:text-bronze">
                <Dot /> {CONTACT.phone2}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-3 font-semibold text-muted-dark transition-colors hover:text-bronze">
                <Dot /> {CONTACT.email}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative rounded-[1.6rem] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(21,18,13,0.4)] ring-1 ring-line-dark sm:p-9">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[280px] flex-col items-center justify-center text-center"
                >
                  <motion.svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#8a6d2f" strokeWidth="2.5">
                    <motion.circle cx="32" cy="32" r="29" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                    <motion.path d="M20 33 l8 8 l16 -18" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.45 }} />
                  </motion.svg>
                  <p className="mt-6 text-2xl font-extrabold text-coal">{t.lead.success}</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-5">
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden value={company} onChange={(e) => setCompany(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                  <div>
                    <label className="mb-2 block text-sm font-bold text-coal">{t.lead.name}</label>
                    <input className="field" type="text" value={name} onChange={(e) => { setName(e.target.value); if (status === "error") setStatus("idle"); }} autoComplete="name" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-coal">{t.lead.phone}</label>
                    <input className="field" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); if (status === "error") setStatus("idle"); }} autoComplete="tel" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-coal">{t.lead.email}</label>
                    <input className="field" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }} autoComplete="email" required />
                  </div>

                  <button type="submit" disabled={status === "sending"} className="btn-gold mt-1 w-full justify-center disabled:opacity-60">
                    {status === "sending" ? t.lead.sending : t.lead.submit}
                  </button>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-semibold text-red-600">
                        {t.lead.error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <p className="text-xs leading-relaxed text-muted-dark/70">{t.lead.consent}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-gold" />;
}
