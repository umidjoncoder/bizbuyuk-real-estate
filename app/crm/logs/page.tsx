"use client";

import React, { useEffect, useState } from "react";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { useRouter } from "next/navigation";
import { crmTranslations } from "@/lib/crmTranslations";
import { Terminal, Eye, Loader2, X } from "lucide-react";

type AuditLog = {
  id: string;
  action: string;
  details: string;
  createdAt: string;
  user: { fullName: string; role: string } | null;
};

export default function LogsPage() {
  const { user, lang } = useCrm();
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState<string | null>(null);
  const t = crmTranslations[lang];

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
              {logs.map((log) => (
                <tr key={log.id} className="border-b crm-bd hover:bg-[var(--crm-surface-hover)] transition-colors">
                  <td className="p-4 crm-muted whitespace-nowrap">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="p-4">
                    {log.user ? (
                      <div>
                        <span className="font-semibold crm-text">{log.user.fullName}</span>
                        <span className="text-[10px] crm-gold uppercase block font-medium">{log.user.role}</span>
                      </div>
                    ) : <span className="crm-faint italic">System</span>}
                  </td>
                  <td className="p-4"><span className="crm-chip">{log.action}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs truncate max-w-[200px] md:max-w-md block crm-muted">{log.details}</span>
                      <button onClick={() => setSelectedDetails(log.details)} className="crm-gold hover:crm-text transition-colors p-1"><Eye className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && <tr><td colSpan={4} className="p-10 text-center crm-muted">{t.logs.noLogs}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDetails && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 animate-backdrop">
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
