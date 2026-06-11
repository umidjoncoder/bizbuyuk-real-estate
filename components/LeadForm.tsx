"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { CONTACT } from "@/lib/i18n";
import { PhoneField } from "./PhoneField";

type Status = "idle" | "sending" | "success" | "error";

const DEFAULT_PREF = "WhatsApp";

export function LeadForm() {
  const { t, locale } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferred, setPreferred] = useState(DEFAULT_PREF);
  const [company, setCompany] = useState(""); // honeypot

  const contactOptions = [
    { value: "Call", label: t.lead.contactCall, icon: <CallGlyph /> },
    { value: "WhatsApp", label: t.lead.contactWhatsApp, icon: <WhatsAppGlyph /> },
    { value: "Telegram", label: t.lead.contactTelegram, icon: <TelegramGlyph /> },
    { value: "Email", label: t.lead.contactEmail, icon: <MailGlyph /> },
  ];

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
          preferredContact: preferred,
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
      setPreferred(DEFAULT_PREF);
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
                    <PhoneField
                      theme="light"
                      required
                      value={phone}
                      onChange={(v) => { setPhone(v); if (status === "error") setStatus("idle"); }}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-coal">{t.lead.email}</label>
                    <input className="field" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }} autoComplete="email" required />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-coal">{t.lead.contactPref}</label>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {contactOptions.map((opt) => {
                        const active = preferred === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setPreferred(opt.value)}
                            aria-pressed={active}
                            className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-bold transition-all ${
                              active
                                ? "border-gold bg-gold/10 text-coal shadow-[0_0_0_3px_rgba(200,161,90,0.14)]"
                                : "border-line-dark bg-white text-muted-dark hover:border-gold/50 hover:text-coal"
                            }`}
                          >
                            <span className={active ? "text-bronze" : "text-muted-dark"}>{opt.icon}</span>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
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

function CallGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Zm-3.05 4.4c-.14 0-.38.05-.58.27-.2.22-.76.75-.76 1.82 0 1.08.78 2.12.89 2.26.11.15 1.53 2.34 3.71 3.28.52.22.93.36 1.24.46.52.17.99.14 1.37.09.42-.06 1.28-.52 1.46-1.03.18-.5.18-.94.13-1.03-.05-.09-.2-.14-.42-.25-.22-.11-1.28-.63-1.48-.7-.2-.07-.34-.11-.49.11-.14.22-.56.7-.69.85-.13.14-.25.16-.47.05-.22-.11-.92-.34-1.76-1.08-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.25.33-.38.11-.13.14-.22.22-.36.07-.15.04-.27-.02-.38-.06-.11-.49-1.18-.67-1.62-.18-.42-.36-.36-.49-.37l-.42-.01Z" />
    </svg>
  );
}

function TelegramGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.94 4.64a1.3 1.3 0 0 0-1.34-.2L3.36 11.2c-.95.38-.94 1.73.02 2.09l4.2 1.57 1.62 5.2c.2.65 1.02.85 1.5.36l2.34-2.32 4.3 3.17c.55.4 1.34.1 1.49-.56l3.06-14.2a1.3 1.3 0 0 0-.95-1.57Zm-3.7 3.07-7.3 6.62a.9.9 0 0 0-.28.53l-.35 2.45-1.18-3.78 8.7-5.45c.43-.27.85.3.41.61Z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
