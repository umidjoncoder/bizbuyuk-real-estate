"use client";

import React, { useEffect, useState } from "react";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { useRouter } from "next/navigation";
import { crmTranslations } from "@/lib/crmTranslations";
import { formatPhone } from "@/lib/format";
import { Terminal, Eye, Loader2, X } from "lucide-react";

type AuditLog = {
  id: string;
  action: string;
  details: string;
  createdAt: string;
  user: { fullName: string; role: string } | null;
};

// Readable label + colour for each action type.
function actionMeta(action: string, lang: "en" | "ru") {
  const en = lang === "en";
  const map: Record<string, { label: string; tone: "gold" | "green" | "red" | "muted" }> = {
    LOGIN: { label: en ? "Login" : "Вход", tone: "muted" },
    CREATE_LEAD: { label: en ? "Lead added" : "Лид добавлен", tone: "green" },
    WEBSITE_LEAD: { label: en ? "Website lead" : "Лид с сайта", tone: "green" },
    UPDATE_LEAD: { label: en ? "Lead edited" : "Лид изменён", tone: "gold" },
    DELETE_LEAD: { label: en ? "Lead deleted" : "Лид удалён", tone: "red" },
    CREATE_TASK: { label: en ? "Task assigned" : "Задача назначена", tone: "green" },
    UPDATE_TASK_STATUS: { label: en ? "Task status" : "Статус задачи", tone: "gold" },
    CREATE_USER: { label: en ? "Employee created" : "Сотрудник создан", tone: "green" },
    UPDATE_USER: { label: en ? "Employee edited" : "Сотрудник изменён", tone: "gold" },
    DELETE_USER: { label: en ? "Employee deleted" : "Сотрудник удалён", tone: "red" },
    CREATE_PROPERTY: { label: en ? "Property added" : "Объект добавлен", tone: "green" },
    CREATE_REMINDER: { label: en ? "Reminder set" : "Напоминание", tone: "gold" },
  };
  return map[action] || { label: action.replace(/_/g, " ").toLowerCase(), tone: "gold" as const };
}

const toneClass: Record<string, string> = {
  gold: "bg-[#c8a15a]/12 text-[#c8a15a] border-[#c8a15a]/25",
  green: "bg-emerald-500/12 text-emerald-500 border-emerald-500/25",
  red: "bg-red-500/12 text-red-500 border-red-500/25",
  muted: "bg-[var(--crm-surface-2)] crm-muted crm-bd",
};

export default function LogsPage() {
  const { user, lang } = useCrm();
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState<string | null>(null);
  const t = crmTranslations[lang];
  const en = lang === "en";

  const fieldLabel = (f: string) => (t.leads.fields as Record<string, string>)[f] || f;

  useEffect(() => {
    if (!user) return;
    if (user.role !== "OWNER") { router.replace("/crm/dashboard"); return; }
    fetchLogs();
  }, [user, router]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crm/logs");
      if (res.ok) setLogs((await res.json()).logs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Turn the raw JSON payload into a plain-language sentence.
  const describe = (log: AuditLog): string => {
    let d: any = {};
    try { d = JSON.parse(log.details); } catch { return log.details; }
    const phone = d.phone ? formatPhone(d.phone) : "";
    switch (log.action) {
      case "LOGIN":
        return en ? `Signed in · IP ${d.ip || "—"}` : `Вход в систему · IP ${d.ip || "—"}`;
      case "CREATE_LEAD":
        return en ? `Added lead “${d.name}” (${phone})` : `Добавлен лид «${d.name}» (${phone})`;
      case "WEBSITE_LEAD":
        return (en ? `New website lead “${d.name}” (${phone})` : `Новый лид с сайта «${d.name}» (${phone})`)
          + (d.source ? (en ? ` · source: ${d.source}` : ` · источник: ${d.source}`) : "");
      case "UPDATE_LEAD": {
        const ch = Array.isArray(d.changes) ? d.changes : [];
        if (!ch.length) return en ? "Lead updated" : "Лид обновлён";
        return (en ? "Changed " : "Изменено: ") +
          ch.map((c: any) => `${fieldLabel(c.field)}: “${c.oldValue ?? "—"}” → “${c.newValue ?? "—"}”`).join("; ");
      }
      case "DELETE_LEAD":
        return en ? `Deleted lead “${d.name}” (${phone})` : `Удалён лид «${d.name}» (${phone})`;
      case "CREATE_TASK":
        return en
          ? `Assigned task “${d.title}”${d.assignee ? ` to ${d.assignee}` : ""}`
          : `Назначена задача «${d.title}»${d.assignee ? ` для ${d.assignee}` : ""}`;
      case "UPDATE_TASK_STATUS":
        return en ? `Task status → ${d.status}` : `Статус задачи → ${d.status}`;
      case "CREATE_USER":
        return en ? `Created employee @${d.username} (${d.role})` : `Создан сотрудник @${d.username} (${d.role})`;
      case "UPDATE_USER":
        return (en ? `Edited employee @${d.username}` : `Изменён сотрудник @${d.username}`)
          + (Array.isArray(d.changed) && d.changed.length ? ` (${d.changed.join(", ")})` : "");
      case "DELETE_USER":
        return en ? `Deleted employee @${d.username} (${d.role})` : `Удалён сотрудник @${d.username} (${d.role})`;
      case "CREATE_PROPERTY":
        return en ? `Added property “${d.title}”` : `Добавлен объект «${d.title}»`;
      case "CREATE_REMINDER": {
        const when = d.remindAt
          ? new Date(d.remindAt).toLocaleString(en ? "en-GB" : "ru-RU", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
          : "";
        return en ? `Set a reminder${when ? ` for ${when}` : ""}` : `Поставлено напоминание${when ? ` на ${when}` : ""}`;
      }
      default: {
        const keys = Object.keys(d).slice(0, 3);
        return keys.map((k) => `${k}: ${typeof d[k] === "object" ? JSON.stringify(d[k]) : d[k]}`).join(", ") || log.details;
      }
    }
  };

  const prettyJson = (raw: string) => {
    try { return JSON.stringify(JSON.parse(raw), null, 2); } catch { return raw; }
  };

  if (loading) {
    return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 crm-gold animate-spin" /></div>;
  }

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-bold tracking-tight crm-text">{t.logs.title}</h2>
        <p className="text-sm crm-muted mt-1">{t.logs.subtitle}</p>
      </div>

      <div className="crm-panel overflow-hidden">
        <div className="overflow-x-auto crm-scroll">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b crm-bd text-xs uppercase font-semibold crm-muted">
                <th className="p-4">{t.logs.tblTime}</th>
                <th className="p-4">{t.logs.tblUser}</th>
                <th className="p-4">{t.logs.tblAction}</th>
                <th className="p-4">{t.logs.tblDetails}</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm">
              {logs.map((log) => {
                const meta = actionMeta(log.action, lang);
                return (
                  <tr key={log.id} className="border-b crm-bd hover:bg-[var(--crm-surface-hover)] transition-colors align-top">
                    <td className="p-4 crm-muted whitespace-nowrap">{new Date(log.createdAt).toLocaleString(en ? "en-GB" : "ru-RU")}</td>
                    <td className="p-4">
                      {log.user ? (
                        <div>
                          <span className="font-semibold crm-text">{log.user.fullName}</span>
                          <span className="text-[10px] crm-gold uppercase block font-medium">{log.user.role}</span>
                        </div>
                      ) : <span className="crm-faint italic">{en ? "System" : "Система"}</span>}
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border ${toneClass[meta.tone]}`}>
                        {meta.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-2">
                        <span className="crm-text leading-relaxed max-w-[420px] md:max-w-2xl">{describe(log)}</span>
                        <button
                          onClick={() => setSelectedDetails(log.details)}
                          className="crm-faint hover:crm-gold transition-colors p-1 flex-shrink-0"
                          title={en ? "View raw data" : "Показать исходные данные"}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {logs.length === 0 && <tr><td colSpan={4} className="p-10 text-center crm-muted">{t.logs.noLogs}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDetails && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-lg p-6 relative animate-modal">
            <button onClick={() => setSelectedDetails(null)} className="absolute top-4 right-4 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-bold border-b crm-bd pb-3 mb-4 flex items-center gap-2 crm-text"><Terminal className="w-5 h-5 crm-gold" />{t.logs.modalTitle}</h3>
            <pre className="p-4 border crm-bd rounded-xl text-xs font-mono crm-gold overflow-x-auto crm-scroll whitespace-pre-wrap max-h-80" style={{ background: "var(--crm-surface-2)" }}>
              {prettyJson(selectedDetails)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
