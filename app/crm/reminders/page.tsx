"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { useNotifications } from "@/components/CrmNotifications";
import { crmTranslations } from "@/lib/crmTranslations";
import { BellRing, Check, Clock, ChevronRight, Phone } from "lucide-react";

export default function RemindersPage() {
  const { lang } = useCrm();
  const { reminders, due, markDone } = useNotifications();
  const router = useRouter();
  const t = crmTranslations[lang].notif;
  const en = lang === "en";

  const dueIds = new Set(due.map((d) => d.id));
  const upcoming = reminders.filter((r) => !dueIds.has(r.id));

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(en ? "en-GB" : "ru-RU", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  const Row = ({ r, hot }: { r: any; hot?: boolean }) => (
    <div className={`crm-card p-4 flex items-start gap-3 ${hot ? "ring-1 ring-red-500/40" : ""}`}>
      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${hot ? "bg-red-500" : "bg-[#c8a15a]"}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm crm-text break-words">{r.message}</p>
        {r.lead && <p className="text-xs crm-muted mt-0.5 flex items-center gap-1"><Phone className="w-3 h-3 crm-gold" />{r.lead.name} · {r.lead.phone}</p>}
        {r.task && <p className="text-xs crm-muted mt-0.5">{r.task.title}</p>}
        <span className="text-[11px] crm-faint flex items-center gap-1 mt-1"><Clock className="w-3 h-3" />{fmt(r.remindAt)}</span>
      </div>
      <div className="flex items-center gap-2">
        {(r.leadId || r.taskId) && (
          <button onClick={() => router.push(r.taskId ? "/crm/tasks" : "/crm/leads")} className="crm-btn-ghost py-1.5 px-2 text-xs">
            {t.open} <ChevronRight className="w-3 h-3" />
          </button>
        )}
        <button onClick={() => markDone(r.id)} className="crm-btn-ghost py-1.5 px-2 text-xs flex items-center gap-1">
          <Check className="w-3 h-3" /> {t.markDone}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-bold tracking-tight crm-text flex items-center gap-2"><BellRing className="w-7 h-7 crm-gold" />{t.title}</h2>
        <p className="text-sm crm-muted mt-1">{en ? "Your reminders from comments and tasks." : "Ваши напоминания из комментариев и задач."}</p>
      </div>

      {reminders.length === 0 && (
        <div className="crm-panel py-16 text-center crm-muted">{t.empty}</div>
      )}

      {due.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-red-500">{t.due} ({due.length})</h3>
          {due.map((r) => <Row key={r.id} r={r} hot />)}
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider crm-muted">{t.upcoming} ({upcoming.length})</h3>
          {upcoming.map((r) => <Row key={r.id} r={r} />)}
        </div>
      )}
    </div>
  );
}
