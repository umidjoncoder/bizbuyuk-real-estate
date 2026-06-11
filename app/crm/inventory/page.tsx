"use client";

import React, { useEffect, useState } from "react";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { crmTranslations } from "@/lib/crmTranslations";
import { formatMoney } from "@/lib/format";
import { DEFAULT_DEVELOPERS, DEFAULT_PROPERTY_TYPES, mergeOptions } from "@/lib/options";
import { Plus, Search, Building2, MapPin, ListFilter, X, Loader2, Pencil, Trash2 } from "lucide-react";

type Property = {
  id: string;
  title: string;
  developer: string | null;
  location: string;
  price: number;
  type: string;
  description: string | null;
  createdAt: string;
};

export default function InventoryPage() {
  const { user, lang } = useCrm();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const t = crmTranslations[lang];

  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [developer, setDeveloper] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Off-plan");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [developerOptions, setDeveloperOptions] = useState<string[]>(DEFAULT_DEVELOPERS);
  const [typeOptions, setTypeOptions] = useState<string[]>(DEFAULT_PROPERTY_TYPES);
  const canManageOptions = user?.role === "OWNER" || user?.role === "ADMIN";

  useEffect(() => { fetchProperties(true); fetchOptions(); }, []);

  const fetchProperties = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch("/api/crm/properties");
      if (res.ok) setProperties((await res.json()).properties);
    } catch (err) {
      console.error(err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const fetchOptions = async () => {
    try {
      const res = await fetch("/api/crm/settings");
      if (res.ok) {
        const s = await res.json();
        setDeveloperOptions(mergeOptions(DEFAULT_DEVELOPERS, (s.developer || []).map((o: any) => o.value)));
        setTypeOptions(mergeOptions(DEFAULT_PROPERTY_TYPES, (s.propertyType || []).map((o: any) => o.value)));
      }
    } catch (err) { console.error(err); }
  };

  const addOption = async (category: string, current: string[], setOpts: (v: string[]) => void, setSel: (v: string) => void) => {
    const name = prompt(lang === "en" ? "New option name:" : "Yangi variant nomi:");
    if (!name || !name.trim()) return;
    const v = name.trim();
    const res = await fetch("/api/crm/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category, value: v }) });
    if (res.ok) { setOpts(mergeOptions(current, [v])); setSel(v); }
    else alert((await res.json()).error || "Error");
  };

  const resetForm = () => {
    setEditId(null); setTitle(""); setDeveloper(""); setLocation(""); setPrice(""); setType("Off-plan"); setDescription(""); setErrorMsg("");
  };

  const openCreate = () => { resetForm(); setIsOpen(true); };
  const openEdit = (p: Property) => {
    setEditId(p.id); setTitle(p.title); setDeveloper(p.developer || ""); setLocation(p.location); setPrice(String(p.price));
    setType(p.type); setDescription(p.description || ""); setErrorMsg(""); setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);
    try {
      const res = await fetch(editId ? `/api/crm/properties/${editId}` : "/api/crm/properties", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, developer, location, price: parseFloat(price), type, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error saving property");
      setIsOpen(false);
      resetForm();
      fetchProperties(false);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (p: Property) => {
    if (!confirm(lang === "en" ? `Delete property "${p.title}"?` : `Удалить объект «${p.title}»?`)) return;
    try {
      const res = await fetch(`/api/crm/properties/${p.id}`, { method: "DELETE" });
      if (res.ok) fetchProperties(false);
      else alert((await res.json()).error || "Error");
    } catch (err) { console.error(err); }
  };

  const canManage = user && user.role !== "BROKER" && user.role !== "DRIVER";
  const canDelete = user && (user.role === "OWNER" || user.role === "ADMIN");

  const filtered = properties.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchesType = filterType === "ALL" || p.type === filterType;
    return matchesSearch && matchesType;
  });

  const canAdd = user && user.role !== "BROKER" && user.role !== "DRIVER";

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight crm-text">{t.inventory.title}</h2>
          <p className="text-sm crm-muted mt-1">{t.inventory.subtitle}</p>
        </div>
        {canAdd && (
          <button onClick={openCreate} className="crm-btn-primary">
            <Plus className="w-4 h-4" /> {t.inventory.btnAddProp}
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="crm-panel p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 crm-faint" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.inventory.searchPlaceholder} className="crm-input pl-icon" />
        </div>
        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4 crm-gold" />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="crm-input crm-select w-auto">
            <option value="ALL">{t.inventory.allTypes}</option>
            {typeOptions.map((tp) => <option key={tp} value={tp}>{tp === "Off-plan" ? t.inventory.offPlan : tp === "Secondary" ? t.inventory.secondary : tp}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-24 flex items-center justify-center"><Loader2 className="w-8 h-8 crm-gold animate-spin" /></div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.id} className="crm-card crm-lift p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="crm-chip">{p.type === "Off-plan" ? t.inventory.offPlan : p.type === "Secondary" ? t.inventory.secondary : p.type}</span>
                  {p.developer && <span className="crm-chip">{p.developer}</span>}
                </div>
                {canManage && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg border crm-bd crm-muted hover:crm-gold transition-colors" title={t.leads.btnEdit}><Pencil className="w-3.5 h-3.5" /></button>
                    {canDelete && (
                      <button onClick={() => handleDelete(p)} className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors" title={t.users.btnDelete}><Trash2 className="w-3.5 h-3.5" /></button>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold flex items-center gap-2 crm-text"><Building2 className="w-5 h-5 crm-gold flex-shrink-0" />{p.title}</h3>
                <p className="text-xs flex items-center gap-1.5 crm-muted"><MapPin className="w-3.5 h-3.5 crm-gold" />{p.location}</p>
              </div>
              {p.description && <p className="text-xs crm-muted line-clamp-3 leading-relaxed">{p.description}</p>}
              <div className="pt-4 border-t crm-bd mt-auto flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-wider font-semibold crm-muted">{t.inventory.priceLabel}</span>
                <span className="text-xl font-black crm-gold">{formatMoney(p.price)}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center crm-muted border border-dashed crm-bd rounded-2xl">{t.inventory.noProperties}</div>
          )}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-lg p-6 relative animate-modal">
            <button onClick={() => { setIsOpen(false); resetForm(); }} className="absolute top-4 right-4 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold border-b crm-bd pb-4 mb-4 crm-text">{editId ? (lang === "en" ? "Edit Property" : "Изменить объект") : t.inventory.modalTitle}</h3>
            {errorMsg && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs flex items-center gap-2"><X className="w-4 h-4" />{errorMsg}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldI label={lang === "en" ? "Developer" : "Застройщик"}>
                <div className="flex gap-2">
                  <select value={developer} onChange={(e) => setDeveloper(e.target.value)} className="crm-input crm-select flex-1">
                    <option value="">{lang === "en" ? "— select —" : "— выбрать —"}</option>
                    {developerOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {canManageOptions && (
                    <button type="button" onClick={() => addOption("developer", developerOptions, setDeveloperOptions, setDeveloper)} className="crm-btn-ghost px-3 flex-shrink-0"><Plus className="w-4 h-4" /></button>
                  )}
                </div>
              </FieldI>
              <FieldI label={t.inventory.propTitle}><input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder={lang === "en" ? "Project name..." : "Название проекта..."} className="crm-input" /></FieldI>
              <FieldI label={t.inventory.propLocation}><input required value={location} onChange={(e) => setLocation(e.target.value)} placeholder={lang === "en" ? "Location..." : "Локация..."} className="crm-input" /></FieldI>
              <div className="grid grid-cols-2 gap-4">
                <FieldI label={t.inventory.propPrice}><input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="2500000" className="crm-input" /></FieldI>
                <FieldI label={t.inventory.propType}>
                  <div className="flex gap-2">
                    <select value={type} onChange={(e) => setType(e.target.value)} className="crm-input crm-select flex-1">
                      {typeOptions.map((tp) => <option key={tp} value={tp}>{tp === "Off-plan" ? t.inventory.offPlan : tp === "Secondary" ? t.inventory.secondary : tp}</option>)}
                    </select>
                    {canManageOptions && (
                      <button type="button" onClick={() => addOption("propertyType", typeOptions, setTypeOptions, setType)} className="crm-btn-ghost px-2 flex-shrink-0"><Plus className="w-4 h-4" /></button>
                    )}
                  </div>
                </FieldI>
              </div>
              <FieldI label={t.inventory.propDesc}><textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={lang === "en" ? "Description..." : "Описание..."} className="crm-input" /></FieldI>
              <button type="submit" disabled={submitting} className="crm-btn-primary w-full py-3">
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t.inventory.btnSaveProp}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldI({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold uppercase crm-muted">{label}</label>
      {children}
    </div>
  );
}
