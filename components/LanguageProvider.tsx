"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { MotionConfig } from "motion/react";
import { defaultLocale, dictionary, dirFor, type Dict, type Locale, locales } from "@/lib/i18n";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: Dict };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("bb-locale")) as Locale | null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
      return;
    }
    const nav = typeof navigator !== "undefined" ? navigator.language.slice(0, 2) : "en";
    if (locales.includes(nav as Locale)) setLocaleState(nav as Locale);
  }, []);

  // Keep <html lang>/<html dir> in step with the active locale. Doing it here
  // rather than only inside setLocale also covers the locale restored from
  // storage or from the browser's own language on first load. A blocking
  // inline script in app/layout.tsx sets both ahead of hydration too, so
  // an Arabic visitor never sees a flash of left-to-right layout.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dirFor(locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("bb-locale", l);
    } catch {}
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionary[locale] }}>
      {/* This is the app's client root, so it is also where motion picks up the
          visitor's reduced-motion setting. Without it every scroll reveal,
          parallax and count-up plays regardless of that preference. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
