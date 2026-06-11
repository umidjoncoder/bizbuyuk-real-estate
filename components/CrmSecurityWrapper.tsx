"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
};

type CrmContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  theme: "light" | "dark";
  toggleTheme: () => void;
  lang: "en" | "ru";
  setLang: (lang: "en" | "ru") => void;
};

const CrmContext = createContext<CrmContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  theme: "dark",
  toggleTheme: () => {},
  lang: "en",
  setLang: () => {},
});

export const useCrm = () => useContext(CrmContext);

export function CrmSecurityWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [lang, setLangState] = useState<"en" | "ru">("en");
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/crm/login";

  // Load Theme & Language on Mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("crm_theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    }
    const savedLang = localStorage.getItem("crm_lang") as "en" | "ru";
    if (savedLang) {
      setLangState(savedLang);
    }
  }, []);

  // Sync theme with HTML document element classList and colorScheme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("crm_theme", newTheme);
  };

  const setLang = (newLang: "en" | "ru") => {
    setLangState(newLang);
    localStorage.setItem("crm_lang", newLang);
  };

  // Fetch User Profile on Mount or Page Change
  useEffect(() => {
    async function checkAuth() {
      if (isLoginPage) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/crm/auth/me");
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
          router.replace("/crm/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
        router.replace("/crm/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, isLoginPage, router]);

  // Inactivity Auto-logout (15 minutes = 900000 ms)
  useEffect(() => {
    if (isLoginPage || !user) return;

    const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 mins
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleAutoLogout, INACTIVITY_TIMEOUT);
    };

    const handleAutoLogout = async () => {
      console.warn("15 minutes inactivity detected. Auto-logout initiated.");
      alert(lang === "en" ? "You have been logged out due to inactivity." : "Вы были отключены от системы из-за бездействия.");
      await handleLogoutDirect();
    };

    // Events to track user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start timer
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [user, isLoginPage, lang]);

  // Anti-Leak Protections for BROKER
  useEffect(() => {
    if (!user || user.role !== "BROKER") return;

    const preventDefault = (e: Event) => e.preventDefault();

    // Disable right click, copy, and cut
    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);

    // Add CSS styles for select-none and print hiding
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      body {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      @media print {
        body {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      if (styleEl.parentNode) {
        document.head.removeChild(styleEl);
      }
    };
  }, [user]);

  const handleLogoutDirect = async () => {
    try {
      await fetch("/api/crm/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
    router.replace("/crm/login");
  };

  const logout = async () => {
    await handleLogoutDirect();
  };

  // Loading state with a gold spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#c8a15a]/30 border-t-[#c8a15a] rounded-full animate-spin"></div>
          <span className="text-[#c8a15a] font-medium tracking-widest text-sm uppercase animate-pulse">
            BIZBUYUK CRM
          </span>
        </div>
      </div>
    );
  }

  return (
    <CrmContext.Provider value={{ user, loading, logout, theme, toggleTheme, lang, setLang }}>
      {children}
    </CrmContext.Provider>
  );
}
