"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { LogoImage } from "./Logo";
import { useLang } from "./LanguageProvider";
import { localeNames, locales } from "@/lib/i18n";

export function Nav() {
  const { t, locale, setLocale } = useLang();
  const pathname = usePathname();
  // The section anchors only exist on the home page, so off-home they need to
  // point back at it rather than at a fragment that isn't there.
  const onHome = pathname === "/";
  const anchor = (hash: string) => (onHome ? hash : `/${hash}`);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/services", label: t.nav.services },
    { href: anchor("#why"), label: t.nav.why },
    { href: anchor("#partners"), label: t.nav.partners },
    { href: anchor("#contact"), label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/80 backdrop-blur-xl border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <a href={onHome ? "#top" : "/"} className="flex items-center gap-3 group">
          <LogoImage
            height={48}
            priority
            className="rounded-md transition-transform duration-500 group-hover:scale-105"
          />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[0.82rem] font-medium tracking-wide text-muted transition-colors hover:text-cream after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center rounded-full border border-line p-0.5 sm:flex">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded-full px-3 py-1 text-[0.72rem] font-semibold tracking-wider transition-all duration-300 ${
                  locale === l ? "bg-gold text-ink" : "text-muted hover:text-cream"
                }`}
                aria-pressed={locale === l}
              >
                {localeNames[l]}
              </button>
            ))}
          </div>

          <a href={anchor("#contact")} className="btn-gold hidden lg:inline-flex !px-5 !py-2.5 !text-[0.72rem]">
            {t.nav.cta}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <span className={`h-px w-6 bg-cream transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-cream transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-cream transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/60 py-3 text-2xl font-bold tracking-tight text-cream"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-2">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded-full border border-line px-4 py-1.5 text-xs font-semibold tracking-wider ${
                  locale === l ? "bg-gold text-ink" : "text-muted"
                }`}
              >
                {localeNames[l]}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
