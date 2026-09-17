"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { MessageSquareQuote, Loader2, Check, X, Trash2, Star } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  city: string;
  flag: string;
  lang: string;
  rating: number;
  service: string;
  quote: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  reviewedBy?: { fullName: string } | null;
};

const TABS = ["PENDING", "APPROVED", "REJECTED"] as const;

export default function TestimonialsAdminPage() {
  const { user, lang } = useCrm();
  const en = lang === "en";
  const canModerate = user?.role === "OWNER" || user?.role === "ADMIN" || user?.role === "MARKETING_DIRECTOR";

  const [rows, setRows] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<(typeof TABS)[number]>("PENDING");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crm/testimonials");
      if (res.ok) setRows((await res.json()).testimonials || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => rows.filter((r) => r.status === tab), [rows, tab]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { PENDING: 0, APPROVED: 0, REJECTED: 0 };
    for (const r of rows) c[r.status] = (c[r.status] || 0) + 1;
    return c;
  }, [rows]);

  const setStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/crm/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) load();
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (t: Testimonial) => {
    if (!confirm(en ? `Delete this review from ${t.name}?` : `Удалить отзыв от ${t.name}?`)) return;
    setBusyId(t.id);
    try {
      const res = await fetch(`/api/crm/testimonials/${t.id}`, { method: "DELETE" });
      if (res.ok) load();
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 crm-gold animate-spin" />
      </div>
    );
  }

  const tabLabel = (s: (typeof TABS)[number]) => {
    if (s === "PENDING") return en ? "Pending" : "На проверке";
    if (s === "APPROVED") return en ? "Approved" : "Одобрено";
    return en ? "Rejected" : "Отклонено";
  };

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-bold tracking-tight crm-text flex items-center gap-2">
          <MessageSquareQuote className="w-7 h-7 crm-gold" />
          {en ? "Testimonials" : "Отзывы"}
        </h2>
        <p className="text-sm crm-muted mt-1">
          {en
            ? "Visitor-submitted reviews. Approved ones join the site's testimonials slider."
            : "Отзывы, отправленные посетителями сайта. Одобренные попадают в слайдер отзывов."}
        </p>
      </div>

      <div className="flex gap-1.5">
        {TABS.map((s) => (
          <button
            key={s}
            onClick={() => setTab(s)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${tab === s ? "crm-btn-primary" : "crm-btn-ghost"}`}
          >
            {tabLabel(s)} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="crm-panel py-16 text-center crm-muted">{en ? "Nothing here." : "Здесь пусто."}</div>
      )}

      <div className="space-y-3">
        {filtered.map((t) => (
          <div key={t.id} className="crm-card p-5 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold crm-text">
                  {t.name} <span className="crm-faint font-normal">· {t.city}</span>
                </p>
                <p className="text-xs crm-muted mt-0.5">
                  {t.service} · {t.lang.toUpperCase()} · {new Date(t.createdAt).toLocaleDateString(en ? "en-GB" : "ru-RU")}
                </p>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? "crm-gold fill-current" : "crm-faint"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm crm-text leading-relaxed">{t.quote}</p>
            {canModerate && (
              <div className="flex items-center gap-2 pt-1">
                {tab !== "APPROVED" && (
                  <button
                    disabled={busyId === t.id}
                    onClick={() => setStatus(t.id, "APPROVED")}
                    className="crm-btn-primary py-1.5 px-3 text-xs"
                  >
                    <Check className="w-3.5 h-3.5" /> {en ? "Approve" : "Одобрить"}
                  </button>
                )}
                {tab !== "REJECTED" && (
                  <button
                    disabled={busyId === t.id}
                    onClick={() => setStatus(t.id, "REJECTED")}
                    className="crm-btn-ghost py-1.5 px-3 text-xs"
                  >
                    <X className="w-3.5 h-3.5" /> {en ? "Reject" : "Отклонить"}
                  </button>
                )}
                <button
                  disabled={busyId === t.id}
                  onClick={() => remove(t)}
                  className="crm-btn-ghost py-1.5 px-3 text-xs hover:text-red-500 ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
