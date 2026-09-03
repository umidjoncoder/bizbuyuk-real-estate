"use client";

import { CONTACT } from "@/lib/i18n";
import { useLang } from "../LanguageProvider";

/** WhatsApp deep link with the section already named in the message. */
export function waLink(topic: string) {
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(topic)}`;
}

/** Per-section "ask us" line, repeated under each service block. */
export function AskLine({ topic }: { topic: string }) {
  const { t } = useLang();
  return (
    <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <span className="opacity-60">{t.servicesPage.askLabel}</span>
      <a
        href={waLink(`${t.servicesPage.metaTitle}: ${topic}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="border-b border-current/30 pb-px font-semibold text-gold transition-colors hover:border-current"
      >
        {t.servicesPage.askWhatsApp}
      </a>
    </p>
  );
}

/** Icon chip. Scales and warms to gold on hover of the enclosing `.group`. */
export function IconChip({
  icon: Icon,
  tone = "dark",
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] border transition-all duration-500 ease-lux group-hover:scale-105 ${
        tone === "light"
          ? "border-line-dark bg-white/70 text-bronze group-hover:border-bronze/40 group-hover:bg-white"
          : "border-line bg-gold/[0.07] text-gold group-hover:border-gold/50 group-hover:bg-gold/15 group-hover:text-champagne"
      }`}
    >
      <Icon size={19} strokeWidth={1.5} />
    </span>
  );
}
