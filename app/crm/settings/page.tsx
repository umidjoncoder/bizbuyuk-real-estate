"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { fileToResizedDataUrl } from "@/lib/imageResize";
import { DEFAULT_SOURCES, DEFAULT_DEVELOPERS, DEFAULT_PROPERTY_TYPES, DEFAULT_STATUSES, DEFAULT_POSITIONS } from "@/lib/options";
import { Settings as SettingsIcon, Plus, X, Loader2, Image as ImageIcon, Lock } from "lucide-react";

type Opt = { id: string; value: string };

export default function SettingsPage() {
  const { user, lang } = useCrm();
  const router = useRouter();
  const en = lang === "en";

  const [custom, setCustom] = useState<{ leadSource: Opt[]; developer: Opt[]; propertyType: Opt[]; leadStatus: Opt[]; position: Opt[] }>({ leadSource: [], developer: [], propertyType: [], leadStatus: [], position: [] });
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingLogo, setSavingLogo] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "OWNER" && user.role !== "ADMIN") { router.replace("/crm/dashboard"); return; }
    load();
  }, [user, router]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crm/settings");
      if (res.ok) {
        const d = await res.json();
        setCustom({ leadSource: d.leadSource || [], developer: d.developer || [], propertyType: d.propertyType || [], leadStatus: d.leadStatus || [], position: d.position || [] });
        setLogo(d.logo || null);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const addOption = async (category: string, value: string) => {
    if (!value.trim()) return;
    const res = await fetch("/api/crm/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category, value }) });
    if (res.ok) load(); else alert((await res.json()).error || "Error");
  };
  const removeOption = async (id: string) => {
    const res = await fetch(`/api/crm/settings/${id}`, { method: "DELETE" });
    if (res.ok) load();
  };

  const onLogoPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; e.target.value = "";
    if (!file) return;
    setSavingLogo(true);
    try {
      const dataUrl = await fileToResizedDataUrl(file, 400, 0.85);
      const res = await fetch("/api/crm/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category: "branding", value: dataUrl }) });
      if (res.ok) { setLogo(dataUrl); }
      else alert((await res.json()).error || "Error");
    } catch { alert("Could not process image"); } finally { setSavingLogo(false); }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 crm-gold animate-spin" /></div>;

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-bold tracking-tight crm-text flex items-center gap-2"><SettingsIcon className="w-7 h-7 crm-gold" />{en ? "Settings" : "Настройки"}</h2>
        <p className="text-sm crm-muted mt-1">{en ? "Manage dropdown options and branding — no code needed." : "Управление опциями и брендингом — без кода."}</p>
      </div>

      {/* Logo */}
      <div className="crm-card p-6 space-y-4">
        <h3 className="font-semibold crm-text flex items-center gap-2"><ImageIcon className="w-5 h-5 crm-gold" />{en ? "Company Logo" : "Логотип компании"}</h3>
        <div className="flex items-center gap-4">
          {logo ? <img src={logo} alt="logo" className="w-16 h-16 rounded-xl object-cover border crm-bd" /> : <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#c8a15a] to-[#a47e3b] flex items-center justify-center font-bold text-[#08080a]">BB</div>}
          <label className="crm-btn-ghost cursor-pointer">
            {savingLogo ? <Loader2 className="w-4 h-4 animate-spin" /> : (en ? "Upload logo" : "Загрузить лого")}
            <input type="file" accept="image/*" className="hidden" onChange={onLogoPick} />
          </label>
        </div>
      </div>

      <OptionList title={en ? "Lead Statuses (pipeline)" : "Статусы лидов (воронка)"} category="leadStatus" defaults={DEFAULT_STATUSES} custom={custom.leadStatus} onAdd={addOption} onRemove={removeOption} en={en} />
      <OptionList title={en ? "Lead Sources" : "Источники лидов"} category="leadSource" defaults={DEFAULT_SOURCES} custom={custom.leadSource} onAdd={addOption} onRemove={removeOption} en={en} />
      <OptionList title={en ? "Developers" : "Застройщики"} category="developer" defaults={DEFAULT_DEVELOPERS} custom={custom.developer} onAdd={addOption} onRemove={removeOption} en={en} />
      <OptionList title={en ? "Property Types" : "Типы объектов"} category="propertyType" defaults={DEFAULT_PROPERTY_TYPES} custom={custom.propertyType} onAdd={addOption} onRemove={removeOption} en={en} />
      <OptionList title={en ? "Employee Positions (titles)" : "Должности сотрудников"} category="position" defaults={DEFAULT_POSITIONS} custom={custom.position} onAdd={addOption} onRemove={removeOption} en={en} />

      <div className="crm-panel p-3 text-xs crm-muted flex items-center gap-2">
        <Lock className="w-4 h-4 crm-gold" /> {en ? "Roles are fixed (they control permissions). Everything else above is editable." : "Роли фиксированы (управляют правами). Всё остальное выше — редактируемо."}
      </div>
    </div>
  );
}

function OptionList({ title, category, defaults, custom, onAdd, onRemove, en }: {
  title: string; category: string; defaults: string[]; custom: Opt[];
  onAdd: (c: string, v: string) => void; onRemove: (id: string) => void; en: boolean;
}) {
  const [val, setVal] = useState("");
  return (
    <div className="crm-card p-6 space-y-4">
      <h3 className="font-semibold crm-text">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {defaults.map((d) => (
          <span key={d} className="crm-chip flex items-center gap-1"><Lock className="w-3 h-3" />{d}</span>
        ))}
        {custom.map((o) => (
          <span key={o.id} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border crm-bd crm-text" style={{ background: "var(--crm-surface-2)" }}>
            {o.value}
            <button onClick={() => onRemove(o.id)} className="crm-faint hover:text-red-500"><X className="w-3 h-3" /></button>
          </span>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onAdd(category, val); setVal(""); }} className="flex gap-2">
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder={en ? "Add new…" : "Добавить…"} className="crm-input flex-1" />
        <button type="submit" className="crm-btn-primary px-4"><Plus className="w-4 h-4" />{en ? "Add" : "Добавить"}</button>
      </form>
    </div>
  );
}
