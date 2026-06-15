"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { Lock, User, AlertCircle, Globe } from "lucide-react";
import { crmTranslations } from "@/lib/crmTranslations";

export default function LoginPage() {
  const { user, loading, lang, setLang, refreshUser } = useCrm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const router = useRouter();

  const t = crmTranslations[lang];

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "DRIVER") {
        router.replace("/crm/tasks");
      } else {
        router.replace("/crm/dashboard");
      }
    }
  }, [user, loading, router]);

  // Show the company logo (uploaded by Owner/Admin in Settings) — same source
  // as the sidebar. Falls back to the "BB" monogram if none is set.
  useEffect(() => {
    fetch("/api/crm/branding").then((r) => r.json()).then((d) => setLogo(d.logo || null)).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/crm/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || (lang === "en" ? "Authentication failed" : "Ошибка авторизации"));
      }

      // Prime the shared session so the destination page renders instantly
      // (no extra /me round-trip), then navigate. Keep the spinner running
      // through the navigation so there's continuous feedback.
      await refreshUser();
      if (data.user?.role === "DRIVER") {
        router.replace("/crm/tasks");
      } else {
        router.replace("/crm/dashboard");
      }
    } catch (err: any) {
      setError(err.message || (lang === "en" ? "Connection error" : "Ошибка соединения"));
      setSubmitting(false);
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "ru" : "en");
  };

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glowing decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#c8a15a]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#c8a15a]/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#0d0d10] border border-[#c8a15a]/20 rounded-2xl p-8 shadow-2xl shadow-black/80 relative backdrop-blur-md">
        {/* Language Switcher */}
        <button
          onClick={toggleLang}
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 border border-[#c8a15a]/20 text-xs font-bold text-[#c8a15a] rounded-lg hover:bg-[#c8a15a]/10 cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          {lang.toUpperCase()}
        </button>

        {/* Brand */}
        <div className="text-center mb-8">
          {logo ? (
            <img src={logo} alt="BIZBUYUK" className="w-16 h-16 rounded-2xl object-cover mx-auto shadow-xl shadow-[#c8a15a]/10 mb-4 border border-[#c8a15a]/30" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c8a15a] to-[#a47e3b] flex items-center justify-center font-bold text-[#08080a] text-2xl mx-auto shadow-xl shadow-[#c8a15a]/10 mb-4">
              BB
            </div>
          )}
          <h2 className="text-2xl font-bold text-[#f3ede1] tracking-wide">BIZBUYUK</h2>
          <span className="text-xs text-[#c8a15a] uppercase tracking-widest font-semibold">{t.auth.loginTitle}</span>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-center gap-3 text-red-200 text-sm">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-xs text-[#9c9488] uppercase tracking-wider font-semibold">
              {lang === "en" ? "Username" : "Имя пользователя"}
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c9488]" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.auth.placeholderUser}
                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-[#c8a15a]/20 rounded-xl text-[#f3ede1] placeholder-[#5c564c] focus:outline-none focus:border-[#c8a15a] focus:ring-1 focus:ring-[#c8a15a] transition-all duration-300"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs text-[#9c9488] uppercase tracking-wider font-semibold">
              {lang === "en" ? "Password" : "Пароль"}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c9488]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.auth.placeholderPass}
                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-[#c8a15a]/20 rounded-xl text-[#f3ede1] placeholder-[#5c564c] focus:outline-none focus:border-[#c8a15a] focus:ring-1 focus:ring-[#c8a15a] transition-all duration-300"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-[#c8a15a] to-[#a47e3b] hover:from-[#d9b26b] hover:to-[#b58f4c] text-[#08080a] font-bold rounded-xl tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#c8a15a]/10 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-[#08080a]/30 border-t-[#08080a] rounded-full animate-spin"></div>
            ) : (
              t.auth.btnLogin
            )}
          </button>
        </form>

        <p className="text-center text-xs text-[#5c564c] mt-8">
          {t.auth.footerNote}
        </p>
      </div>
    </div>
  );
}
