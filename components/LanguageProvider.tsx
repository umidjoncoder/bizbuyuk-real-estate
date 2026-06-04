"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { defaultLocale, dictionary, type Dict, type Locale, locales } from "@/lib/i18n";

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

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("bb-locale", l);
      document.documentElement.lang = l;
    } catch {}
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionary[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
