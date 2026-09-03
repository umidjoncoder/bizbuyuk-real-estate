"use client";

import { usePathname } from "next/navigation";
import { useLang } from "./LanguageProvider";
import { LogoImage } from "./Logo";
import { CONTACT } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const anchor = (hash: string) => (onHome ? hash : `/${hash}`);

  const nav = [
    { href: "/services", label: t.nav.services },
    { href: "/renovation", label: t.nav.renovation },
    { href: anchor("#why"), label: t.nav.why },
    { href: anchor("#partners"), label: t.nav.partners },
    { href: anchor("#contact"), label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a href={onHome ? "#top" : "/"} className="inline-flex">
              <LogoImage height={72} className="rounded-lg" />
            </a>
            <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-muted">{t.footer.blurb}</p>
          </div>

          <FooterCol title={t.footer.nav}>
            {nav.map((l) => (
              <a key={l.href} href={l.href} className="block text-sm text-muted transition-colors hover:text-gold">
                {l.label}
              </a>
            ))}
          </FooterCol>

          <FooterCol title={t.footer.contact}>
            <a href={CONTACT.phoneHref} className="block text-sm text-muted transition-colors hover:text-gold">
              {CONTACT.phone}
            </a>
            <a href={CONTACT.phone2Href} className="block text-sm text-muted transition-colors hover:text-gold">
              {CONTACT.phone2}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="block text-sm text-muted transition-colors hover:text-gold">
              {CONTACT.email}
            </a>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted/60">{t.footer.address}</p>
            <p className="text-sm text-muted">{t.footer.addressValue}</p>
          </FooterCol>

          <FooterCol title={t.footer.follow}>
            <Social href={CONTACT.instagram} label="Instagram" />
            <Social href={CONTACT.facebook} label="Facebook" />
            <Social href={CONTACT.youtube} label="YouTube" />
            <Social href={CONTACT.whatsapp} label="WhatsApp" />
          </FooterCol>
        </div>

        <div className="mt-14 hairline" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted/60 sm:flex-row">
          <p>© 2020 BIZBUYUK Real Estate LLC. {t.footer.rights}</p>
          <p className="tracking-wide">United Arab Emirates</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow !text-[0.62rem] mb-4">{title}</p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function Social({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
    >
      <span className="inline-block h-px w-3 bg-gold/40 transition-all duration-300 group-hover:w-5" />
      {label}
    </a>
  );
}
