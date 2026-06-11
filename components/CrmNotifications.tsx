"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { crmTranslations } from "@/lib/crmTranslations";
import { Bell, Check, Clock, X, ChevronRight } from "lucide-react";

export type CrmReminder = {
  id: string;
  message: string;
  remindAt: string;
  done: boolean;
  leadId: string | null;
  taskId: string | null;
  commentId: string | null;
  lead?: { id: string; name: string; phone: string } | null;
  task?: { id: string; title: string } | null;
  comment?: { id: string; text: string } | null;
};

type NotifContext = {
  reminders: CrmReminder[];
  due: CrmReminder[];
  refresh: () => void;
  markDone: (id: string) => Promise<void>;
};

const Ctx = createContext<NotifContext>({
  reminders: [],
  due: [],
  refresh: () => {},
  markDone: async () => {},
});

export const useNotifications = () => useContext(Ctx);

const POLL_MS = 30_000;

export function CrmNotificationsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useCrm();
  const [reminders, setReminders] = useState<CrmReminder[]>([]);
  const [now, setNow] = useState<number>(() => 0); // 0 until mounted (avoids SSR mismatch)
  const [toasts, setToasts] = useState<CrmReminder[]>([]);
  const toastedIds = useRef<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/crm/reminders");
      if (res.ok) {
        const data = await res.json();
        setReminders(data.reminders || []);
      }
    } catch {
      /* network blip — keep last state */
    }
  }, [user]);

  // poll + clock tick
  useEffect(() => {
    if (!user) {
      setReminders([]);
      return;
    }
    setNow(Date.now());
    refresh();
    const poll = setInterval(refresh, POLL_MS);
    const clock = setInterval(() => setNow(Date.now()), 30_000);
    return () => {
      clearInterval(poll);
      clearInterval(clock);
    };
  }, [user, refresh]);

  const due = now === 0 ? [] : reminders.filter((r) => !r.done && new Date(r.remindAt).getTime() <= now);

  // surface newly-due reminders as toasts (once each)
  useEffect(() => {
    if (now === 0) return;
    const fresh = due.filter((r) => !toastedIds.current.has(r.id));
    if (fresh.length) {
      fresh.forEach((r) => toastedIds.current.add(r.id));
      setToasts((prev) => [...prev, ...fresh]);
    }
  }, [due, now]);

  const markDone = useCallback(async (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    setToasts((prev) => prev.filter((r) => r.id !== id));
    toastedIds.current.delete(id);
    try {
      await fetch(`/api/crm/reminders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: true }),
      });
    } catch {
      /* optimistic; refresh will reconcile */
    }
  }, []);

  const dismissToast = (id: string) => setToasts((prev) => prev.filter((r) => r.id !== id));

  return (
    <Ctx.Provider value={{ reminders, due, refresh, markDone }}>
      {children}
      <ToastStack toasts={toasts} onClose={dismissToast} onDone={markDone} />
    </Ctx.Provider>
  );
}

/* ---------- Toast stack (top-right) ---------- */
function ToastStack({
  toasts,
  onClose,
  onDone,
}: {
  toasts: CrmReminder[];
  onClose: (id: string) => void;
  onDone: (id: string) => void;
}) {
  const { lang } = useCrm();
  const t = crmTranslations[lang].notif;
  const router = useRouter();
  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-[330px] max-w-[calc(100vw-2rem)]">
      {toasts.slice(-4).map((r) => (
        <div key={r.id} className="crm-card animate-toast p-4 border-l-4" style={{ borderLeftColor: "var(--crm-gold)" }}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center bg-[#c8a15a]/15 text-[#c8a15a] flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-widest font-bold crm-gold">{t.toast}</p>
              <p className="text-sm font-medium crm-text mt-0.5 break-words">{r.message}</p>
              {r.lead && <p className="text-xs crm-muted mt-1">{r.lead.name} · {r.lead.phone}</p>}
              <div className="flex items-center gap-2 mt-3">
                {(r.leadId || r.taskId) && (
                  <button
                    onClick={() => {
                      onClose(r.id);
                      router.push(r.taskId ? "/crm/tasks" : "/crm/leads");
                    }}
                    className="text-xs font-semibold crm-gold hover:underline"
                  >
                    {t.open}
                  </button>
                )}
                <button onClick={() => onDone(r.id)} className="text-xs crm-muted hover:crm-text flex items-center gap-1">
                  <Check className="w-3 h-3" /> {t.markDone}
                </button>
              </div>
            </div>
            <button onClick={() => onClose(r.id)} className="crm-faint hover:crm-text flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Bell + dropdown (rendered in header/sidebar) ---------- */
export function NotificationBell({ compact = false }: { compact?: boolean }) {
  const { reminders, due, markDone } = useNotifications();
  const { lang } = useCrm();
  const t = crmTranslations[lang].notif;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const dueIds = new Set(due.map((d) => d.id));
  const upcoming = reminders.filter((r) => !dueIds.has(r.id));
  const count = due.length;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(lang === "ru" ? "ru-RU" : "en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-xl border crm-bd crm-gold hover:bg-[#c8a15a]/10 transition-colors cursor-pointer"
        title={t.title}
        aria-label={t.title}
      >
        <Bell className="w-4 h-4" />
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center crm-pulse">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className={`absolute ${compact ? "right-0" : "left-0"} mt-2 w-[340px] max-w-[calc(100vw-2rem)] crm-card p-0 overflow-hidden z-[90]`}>
          <div className="px-4 py-3 border-b crm-bd flex items-center justify-between">
            <span className="text-sm font-bold crm-text flex items-center gap-2">
              <Bell className="w-4 h-4 crm-gold" /> {t.title}
            </span>
            {count > 0 && <span className="crm-chip">{count} {t.due}</span>}
          </div>

          <div className="max-h-[60vh] overflow-y-auto crm-scroll">
            {reminders.length === 0 && (
              <div className="px-4 py-8 text-center text-sm crm-muted">{t.empty}</div>
            )}

            {due.length > 0 && (
              <Section label={t.due}>
                {due.map((r) => (
                  <ReminderRow key={r.id} r={r} fmt={fmt} hot onOpen={() => { setOpen(false); router.push(r.taskId ? "/crm/tasks" : "/crm/leads"); }} onDone={() => markDone(r.id)} doneLabel={t.markDone} />
                ))}
              </Section>
            )}

            {upcoming.length > 0 && (
              <Section label={t.upcoming}>
                {upcoming.map((r) => (
                  <ReminderRow key={r.id} r={r} fmt={fmt} onOpen={() => { setOpen(false); router.push(r.taskId ? "/crm/tasks" : "/crm/leads"); }} onDone={() => markDone(r.id)} doneLabel={t.markDone} />
                ))}
              </Section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest font-bold crm-faint">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function ReminderRow({
  r,
  fmt,
  hot = false,
  onOpen,
  onDone,
  doneLabel,
}: {
  r: CrmReminder;
  fmt: (iso: string) => string;
  hot?: boolean;
  onOpen: () => void;
  onDone: () => void;
  doneLabel: string;
}) {
  return (
    <div className={`px-4 py-3 border-b crm-bd last:border-0 ${hot ? "bg-red-500/5" : ""}`}>
      <div className="flex items-start gap-2">
        <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${hot ? "bg-red-500" : "bg-[#c8a15a]"}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm crm-text break-words">{r.message}</p>
          {r.lead && <p className="text-xs crm-muted mt-0.5">{r.lead.name} · {r.lead.phone}</p>}
          {r.task && <p className="text-xs crm-muted mt-0.5">{r.task.title}</p>}
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[11px] crm-faint flex items-center gap-1"><Clock className="w-3 h-3" />{fmt(r.remindAt)}</span>
            {(r.leadId || r.taskId) && (
              <button onClick={onOpen} className="text-[11px] font-semibold crm-gold hover:underline flex items-center gap-0.5">
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
            <button onClick={onDone} className="text-[11px] crm-muted hover:crm-text flex items-center gap-1 ml-auto">
              <Check className="w-3 h-3" /> {doneLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
