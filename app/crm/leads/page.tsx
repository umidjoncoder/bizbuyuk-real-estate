"use client";

import React, { useEffect, useState } from "react";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { useNotifications } from "@/components/CrmNotifications";
import { useRouter } from "next/navigation";
import { crmTranslations } from "@/lib/crmTranslations";
import { formatMoney, formatPhone } from "@/lib/format";
import { DEFAULT_SOURCES, DEFAULT_STATUSES, mergeOptions } from "@/lib/options";
import { PhoneField } from "@/components/PhoneField";
import {
  Plus,
  Search,
  Filter,
  KanbanSquare,
  List,
  Phone,
  Mail,
  DollarSign,
  Clock,
  Trash2,
  AlertCircle,
  MessageSquare,
  Download,
  Loader2,
  X,
  Pencil,
  History,
  Check,
  ShieldAlert,
  BellPlus,
  Save,
  Copy,
  MessageCircle,
  Send,
  PhoneCall,
  Users2,
} from "lucide-react";

type Comment = {
  id: string;
  author: string;
  authorId?: string | null;
  text: string;
  createdAt: string;
};

type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
};

type LeadHistory = {
  id: string;
  field: string;
  oldValue: string | null;
  newValue: string | null;
  editorName: string;
  editorRole: string | null;
  seen: boolean;
  createdAt: string;
};

type Reminder = { id: string; message: string; remindAt: string; commentId: string | null; done: boolean };

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  budget: number | null;
  status: string;
  lostReason: string | null;
  source: string;
  preferredContact: string | null;
  brokerId: string | null;
  broker: { fullName: string; id: string } | null;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  properties: { property: Property }[];
  history: LeadHistory[];
  reminders?: Reminder[];
};

type UserType = { id: string; fullName: string; role: string; isActive?: boolean };

// Preferred contact channel options (shown on the public form too).
const PREF_OPTIONS: { value: string; en: string; ru: string }[] = [
  { value: "Call", en: "Call", ru: "Звонок" },
  { value: "WhatsApp", en: "WhatsApp", ru: "WhatsApp" },
  { value: "Telegram", en: "Telegram", ru: "Telegram" },
  { value: "Email", en: "Email", ru: "Email" },
];
const prefLabel = (v: string | null, lang: string) => {
  if (!v) return "—";
  const o = PREF_OPTIONS.find((p) => p.value.toLowerCase() === v.toLowerCase());
  return o ? (lang === "en" ? o.en : o.ru) : v;
};

const STATUS_META: Record<string, { dot: string; chip: string; bar: string }> = {
  NEW: { dot: "bg-sky-500", chip: "bg-sky-500/12 text-sky-500", bar: "bg-sky-500" },
  CONTACTED: { dot: "bg-amber-500", chip: "bg-amber-500/12 text-amber-500", bar: "bg-amber-500" },
  NEGOTIATION: { dot: "bg-orange-500", chip: "bg-orange-500/12 text-orange-500", bar: "bg-orange-500" },
  VIEWING: { dot: "bg-violet-500", chip: "bg-violet-500/12 text-violet-500", bar: "bg-violet-500" },
  WON: { dot: "bg-emerald-500", chip: "bg-emerald-500/12 text-emerald-500", bar: "bg-emerald-500" },
  LOST: { dot: "bg-red-500", chip: "bg-red-500/12 text-red-500", bar: "bg-red-500" },
};
const DEFAULT_META = { dot: "bg-[#c8a15a]", chip: "bg-[#c8a15a]/12 text-[#c8a15a]", bar: "bg-[#c8a15a]" };
const sMeta = (s: string) => STATUS_META[s] || DEFAULT_META;

export default function LeadsPage() {
  const { user, lang } = useCrm();
  const { refresh: refreshNotifs } = useNotifications();
  const router = useRouter();
  const t = crmTranslations[lang];

  const [leads, setLeads] = useState<Lead[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [sourceOptions, setSourceOptions] = useState<string[]>(DEFAULT_SOURCES);
  const [statusOptions, setStatusOptions] = useState<string[]>(DEFAULT_STATUSES);
  const [loading, setLoading] = useState(true);
  const canManageOptions = user?.role === "OWNER" || user?.role === "ADMIN";

  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [archiveView, setArchiveView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [brokerFilter, setBrokerFilter] = useState("ALL");
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [commentText, setCommentText] = useState("");
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [savingLead, setSavingLead] = useState(false);

  // edit mode (contact info)
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBudget, setEditBudget] = useState("");
  const [editSource, setEditSource] = useState("");
  const [editPref, setEditPref] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyPhone = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  const waLink = (phone: string) => `https://wa.me/${String(phone).replace(/\D/g, "")}`;

  // comment reminder
  const [remindOn, setRemindOn] = useState(false);
  const [remindDays, setRemindDays] = useState<number | null>(null);
  const [remindDate, setRemindDate] = useState("");
  const [remindNote, setRemindNote] = useState("");

  // new lead form
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadBudget, setNewLeadBudget] = useState("");
  const [newLeadSource, setNewLeadSource] = useState("Manual");
  const [newLeadPref, setNewLeadPref] = useState("");
  const [newLeadProps, setNewLeadProps] = useState<string[]>([]);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [isLostModalOpen, setIsLostModalOpen] = useState(false);
  const [lostReasonText, setLostReasonText] = useState("");
  const [targetLostLeadId, setTargetLostLeadId] = useState<string | null>(null);

  const isManager = user?.role === "OWNER" || user?.role === "ADMIN";

  useEffect(() => {
    if (user?.role === "DRIVER") {
      router.replace("/crm/tasks");
      return;
    }
    fetchData(true);
  }, [user, router]);

  // keep the open drawer in sync with the latest fetched data (esp. history),
  // but never clobber the form while the user is editing contact info.
  useEffect(() => {
    if (!selectedLead || editMode) return;
    const fresh = leads.find((l) => l.id === selectedLead.id);
    if (fresh) setSelectedLead(fresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads]);

  const leadsUrl = () => `/api/crm/leads${archiveView ? "?archived=1" : ""}`;

  const fetchData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const [leadsRes, propsRes, usersRes, setRes] = await Promise.all([
        fetch(leadsUrl()),
        fetch("/api/crm/properties"),
        fetch("/api/crm/users"),
        fetch("/api/crm/settings"),
      ]);
      if (leadsRes.ok) setLeads((await leadsRes.json()).leads);
      if (propsRes.ok) setProperties((await propsRes.json()).properties);
      if (usersRes.ok) setUsers((await usersRes.json()).users);
      if (setRes.ok) {
        const s = await setRes.json();
        setSourceOptions(mergeOptions(DEFAULT_SOURCES, (s.leadSource || []).map((o: any) => o.value)));
        setStatusOptions(mergeOptions(DEFAULT_STATUSES, (s.leadStatus || []).map((o: any) => o.value)));
      }
    } catch (err) {
      console.error("Error loading leads page data:", err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Lightweight refresh after a mutation — only leads change, so don't re-pull
  // properties + users every time (that triple-fetch made drag/drop feel janky).
  const fetchLeads = async () => {
    try {
      const res = await fetch(leadsUrl());
      if (res.ok) setLeads((await res.json()).leads);
    } catch (err) {
      console.error("Error refreshing leads:", err);
    }
  };

  // Re-load when switching between active and archive views.
  useEffect(() => {
    if (user && user.role !== "DRIVER") fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [archiveView]);

  const canEditLead = (lead: Lead) => {
    if (!user) return false;
    if (user.role === "DRIVER" || user.role === "MARKETING_DIRECTOR") return false;
    if (user.role === "BROKER") return lead.brokerId === user.id;
    return true;
  };

  const unseenCount = (lead: Lead) => (isManager ? lead.history.filter((h) => !h.seen).length : 0);

  // Quick-add a custom lead source (admin/owner) — "Add Agent"-style.
  const addSource = async (setSelected?: (v: string) => void) => {
    const name = prompt(lang === "en" ? "New source / agent name:" : "Yangi manba / agent nomi:");
    if (!name || !name.trim()) return;
    const v = name.trim();
    const res = await fetch("/api/crm/settings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: "leadSource", value: v }),
    });
    if (res.ok) {
      setSourceOptions((p) => mergeOptions(p, [v]));
      setSelected?.(v);
    } else {
      alert((await res.json()).error || "Error");
    }
  };

  // ---------- Export (Owner only) ----------
  const handleExport = () => {
    if (user?.role !== "OWNER") return;
    const headers = ["ID", "Name", "Phone", "E-mail", "Preferred Contact", "Budget", "Status", "Lost Reason", "Source", "Broker", "Created"];
    const rows = leads.map((l) => [
      l.id, l.name, l.phone, l.email || "", prefLabel(l.preferredContact, lang), l.budget || "", l.status, l.lostReason || "",
      l.source, l.broker?.fullName || "—", new Date(l.createdAt).toLocaleString(),
    ]);
    const csv = "data:text/csv;charset=utf-8,﻿" +
      [headers.join(","), ...rows.map((e) => e.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `bizbuyuk_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---------- Create lead ----------
  const handleCreateLead = async (e: React.FormEvent, force = false) => {
    e.preventDefault();
    setErrorMsg("");
    setDuplicateWarning(null);
    setSavingLead(true);
    try {
      const res = await fetch("/api/crm/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLeadName, phone: newLeadPhone, email: newLeadEmail,
          budget: newLeadBudget, source: newLeadSource, preferredContact: newLeadPref || null,
          propertyIds: newLeadProps, force,
        }),
      });
      const data = await res.json();
      if (res.status === 409 && data.warning === "duplicate") {
        setDuplicateWarning(data.message);
        setSavingLead(false);
        return;
      }
      if (!res.ok) throw new Error(data.error || "Error saving lead");
      setIsNewLeadOpen(false);
      resetNewLeadForm();
      fetchLeads();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSavingLead(false);
    }
  };

  const resetNewLeadForm = () => {
    setNewLeadName(""); setNewLeadPhone(""); setNewLeadEmail("");
    setNewLeadBudget(""); setNewLeadSource("Manual"); setNewLeadPref(""); setNewLeadProps([]);
    setDuplicateWarning(null); setErrorMsg("");
  };

  // ---------- Status ----------
  const handleUpdateStatus = async (leadId: string, newStatus: string, lostReason = "") => {
    if (newStatus === "LOST" && !lostReason) {
      setTargetLostLeadId(leadId);
      setIsLostModalOpen(true);
      return;
    }
    const previous = [...leads];
    setLeads((prev) => prev.map((l) => (l.id === leadId
      ? { ...l, status: newStatus as any, lostReason: newStatus === "LOST" ? lostReason : null } : l)));
    try {
      const res = await fetch(`/api/crm/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, lostReason: newStatus === "LOST" ? lostReason : undefined }),
      });
      if (res.ok) fetchLeads();
      else {
        const err = await res.json();
        alert(err.error || "Could not update status");
        setLeads(previous);
      }
    } catch {
      setLeads(previous);
    }
  };

  const submitLostReason = async () => {
    if (!lostReasonText.trim() || !targetLostLeadId) return;
    await handleUpdateStatus(targetLostLeadId, "LOST", lostReasonText);
    setIsLostModalOpen(false);
    setLostReasonText("");
    setTargetLostLeadId(null);
  };

  // ---------- Broker assignment ----------
  const handleAssignBroker = async (leadId: string, brokerId: string) => {
    try {
      const res = await fetch(`/api/crm/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brokerId }),
      });
      if (res.ok) fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Edit contact info ----------
  const openEdit = (lead: Lead) => {
    setEditName(lead.name);
    setEditPhone(lead.phone);
    setEditEmail(lead.email || "");
    setEditBudget(lead.budget ? String(lead.budget) : "");
    setEditSource(lead.source);
    setEditPref(lead.preferredContact || "");
    setEditMode(true);
  };

  const saveEdit = async () => {
    if (!selectedLead) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/crm/leads/${selectedLead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName, phone: editPhone, email: editEmail,
          budget: editBudget, source: editSource, preferredContact: editPref || null,
        }),
      });
      if (res.ok) {
        setEditMode(false);
        fetchLeads();
      } else {
        const err = await res.json();
        alert(err.error || "Could not save");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingEdit(false);
    }
  };

  // ---------- Acknowledge history ----------
  const acknowledgeHistory = async (leadId: string) => {
    try {
      const res = await fetch(`/api/crm/leads/${leadId}/history`, { method: "PUT" });
      if (res.ok) fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Comment (with optional reminder) ----------
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedLead) return;

    let remindAt: string | undefined;
    if (remindOn) {
      if (remindDays) remindAt = new Date(Date.now() + remindDays * 86400000).toISOString();
      else if (remindDate) remindAt = new Date(remindDate).toISOString();
    }

    try {
      const res = await fetch(`/api/crm/leads/${selectedLead.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: commentText,
          remindAt,
          reminderMessage: remindNote || undefined,
        }),
      });
      if (res.ok) {
        setCommentText("");
        setRemindOn(false);
        setRemindDays(null);
        setRemindDate("");
        setRemindNote("");
        fetchLeads();
        if (remindAt) refreshNotifs();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to add comment");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Archive / Restore / Hard-delete ----------
  const handleDeleteLead = async (leadId: string) => {
    // Soft-delete: moves to Archive (reversible), per the no-accidental-loss policy.
    if (!confirm(lang === "en" ? "Move this lead to Archive?" : "Переместить лида в архив?")) return;
    try {
      const res = await fetch(`/api/crm/leads/${leadId}`, { method: "DELETE" });
      if (res.ok) { setSelectedLead(null); fetchLeads(); }
      else alert((await res.json()).error || "Error");
    } catch (err) { console.error(err); }
  };

  const handleRestoreLead = async (leadId: string) => {
    try {
      const res = await fetch(`/api/crm/leads/${leadId}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ archived: false }),
      });
      if (res.ok) { setSelectedLead(null); fetchLeads(); }
      else alert((await res.json()).error || "Error");
    } catch (err) { console.error(err); }
  };

  const handleHardDelete = async (leadId: string) => {
    if (!confirm(lang === "en" ? "Permanently delete? This cannot be undone." : "Удалить навсегда? Это необратимо.")) return;
    try {
      const res = await fetch(`/api/crm/leads/${leadId}?hard=1`, { method: "DELETE" });
      if (res.ok) { setSelectedLead(null); fetchLeads(); }
      else alert((await res.json()).error || "Error");
    } catch (err) { console.error(err); }
  };

  // ---------- Drag & drop ----------
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("text/plain", leadId);
    e.dataTransfer.effectAllowed = "move";
    setDraggingId(leadId);
  };
  const handleDrop = async (e: React.DragEvent, status: string) => {
    e.preventDefault();
    setDragOverCol(null);
    setDraggingId(null);
    const leadId = e.dataTransfer.getData("text/plain");
    if (leadId) await handleUpdateStatus(leadId, status);
  };

  // Broker filter is only meaningful for managers (a Broker already sees only
  // their own leads). Sorted A–Z; includes any broker referenced by a lead even
  // if now inactive, so historical assignments stay filterable.
  const showBrokerFilter = !!user && user.role !== "BROKER";
  const brokerOptions = (() => {
    const map = new Map<string, string>();
    users.forEach((u) => { if (u.role === "BROKER") map.set(u.id, u.fullName); });
    leads.forEach((l) => { if (l.brokerId && l.broker) map.set(l.brokerId, l.broker.fullName); });
    return Array.from(map, ([id, fullName]) => ({ id, fullName }))
      .sort((a, b) => a.fullName.localeCompare(b.fullName));
  })();

  const filteredLeads = leads.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      l.name.toLowerCase().includes(q) || l.phone.includes(searchQuery) ||
      (l.email && l.email.toLowerCase().includes(q));
    const matchesSource = sourceFilter === "ALL" || l.source === sourceFilter;
    const matchesBroker =
      brokerFilter === "ALL" ||
      (brokerFilter === "UNASSIGNED" ? !l.brokerId : l.brokerId === brokerFilter);
    return matchesSearch && matchesSource && matchesBroker;
  });

  // Translate the 6 built-in statuses; custom statuses show their own name.
  const STATUS_LABEL: Record<string, string> = {
    NEW: t.leads.colNew, CONTACTED: t.leads.colContacted, NEGOTIATION: t.leads.colNegotiation,
    VIEWING: t.leads.colViewing, WON: t.leads.colWon, LOST: t.leads.colLost,
  };
  const statusLabel = (s: string) => STATUS_LABEL[s] || s;
  const kanbanColumns = statusOptions.map((s) => ({ title: statusLabel(s), status: s }));

  const fieldLabel = (f: string) => (t.leads.fields as Record<string, string>)[f] || f;

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight crm-text">{t.leads.title}</h2>
          <p className="text-sm crm-muted mt-1">{t.leads.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {user?.role === "OWNER" && (
            <button onClick={() => { setSelectedLead(null); setArchiveView((v) => !v); }} className={`crm-btn-ghost ${archiveView ? "crm-gold" : ""}`}>
              <History className="w-4 h-4" /> {archiveView ? (lang === "en" ? "Active" : "Активные") : (lang === "en" ? "Archive" : "Архив")}
            </button>
          )}
          {user?.role === "OWNER" && !archiveView && (
            <button onClick={handleExport} className="crm-btn-ghost">
              <Download className="w-4 h-4" /> {t.leads.btnExport}
            </button>
          )}
          {user?.role !== "MARKETING_DIRECTOR" && !archiveView && (
            <button onClick={() => setIsNewLeadOpen(true)} className="crm-btn-primary">
              <Plus className="w-4 h-4" /> {t.leads.btnAddLead}
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="crm-panel p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 crm-faint" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.leads.searchPlaceholder}
            className="crm-input pl-icon"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 crm-gold" />
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="crm-input crm-select w-auto">
            <option value="ALL">{t.leads.allSources}</option>
            {sourceOptions.map((s) => <option key={s} value={s}>{s === "Manual" ? t.leads.manualSource : s}</option>)}
          </select>
        </div>
        {showBrokerFilter && (
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 crm-gold" />
            <select value={brokerFilter} onChange={(e) => setBrokerFilter(e.target.value)} className="crm-input crm-select w-auto">
              <option value="ALL">{t.leads.allBrokers}</option>
              <option value="UNASSIGNED">{t.leads.unassigned}</option>
              {brokerOptions.map((b) => <option key={b.id} value={b.id}>{b.fullName}</option>)}
            </select>
          </div>
        )}
        <div className="flex items-center rounded-xl p-1 md:ml-auto border crm-bd" style={{ background: "var(--crm-input-bg)" }}>
          <button onClick={() => setViewMode("kanban")} className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === "kanban" ? "bg-[#c8a15a] text-[#08080a]" : "crm-muted"}`}>
            <KanbanSquare className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === "list" ? "bg-[#c8a15a] text-[#08080a]" : "crm-muted"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-24 flex items-center justify-center"><Loader2 className="w-8 h-8 crm-gold animate-spin" /></div>
      ) : viewMode === "kanban" ? (
        /* Kanban */
        <div className="flex gap-4 overflow-x-auto pb-4 items-start crm-scroll">
          {kanbanColumns.map((col) => {
            const colLeads = filteredLeads.filter((l) => l.status === col.status);
            const isOver = dragOverCol === col.status;
            const meta = sMeta(col.status);
            return (
              <div
                key={col.status}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setDragOverCol(col.status)}
                onDragLeave={(e) => { if (e.currentTarget === e.target) setDragOverCol(null); }}
                onDrop={(e) => handleDrop(e, col.status)}
                className={`crm-panel flex flex-col w-[280px] flex-shrink-0 p-3 h-[72vh] ${isOver ? "crm-col-over" : ""}`}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b crm-bd">
                  <span className="text-xs font-bold crm-text flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${meta.dot}`} /> {col.title}
                  </span>
                  <span className="crm-chip">{colLeads.length}</span>
                </div>
                <div className="space-y-2.5 flex-1 overflow-y-auto crm-scroll pr-1">
                  {colLeads.map((lead) => {
                    const unseen = unseenCount(lead);
                    return (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={() => setDraggingId(null)}
                        onClick={() => { setSelectedLead(lead); setEditMode(false); }}
                        className={`crm-card crm-lift p-3.5 cursor-pointer ${draggingId === lead.id ? "crm-dragging" : ""} ${unseen ? "ring-1 ring-red-500/50" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm crm-text leading-tight">{lead.name}</h4>
                          {unseen > 0 && (
                            <span className="flex items-center gap-1 text-[9px] font-bold uppercase text-red-500 bg-red-500/12 px-1.5 py-0.5 rounded-full flex-shrink-0">
                              <ShieldAlert className="w-3 h-3" /> {t.leads.unreviewedBadge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] mt-1 flex items-center gap-1 crm-muted">
                          <Phone className="w-3 h-3 crm-gold" /> {formatPhone(lead.phone)}
                          {lead.preferredContact && (
                            <span className="ml-auto flex items-center" title={prefLabel(lead.preferredContact, lang)}>
                              {prefIcon(lead.preferredContact)}
                            </span>
                          )}
                        </p>
                        {lead.budget && <p className="text-xs crm-gold font-bold mt-2">{formatMoney(lead.budget)}</p>}
                        <div className="mt-3 pt-2.5 border-t crm-bd flex items-center justify-between gap-2">
                          <span className="text-[9px] crm-faint uppercase font-semibold">{lead.source}</span>
                          <div className="flex items-center gap-1.5">
                            {lead.comments.length > 0 && (
                              <span className="text-[9px] crm-faint flex items-center gap-0.5"><MessageSquare className="w-3 h-3" />{lead.comments.length}</span>
                            )}
                            <span className="text-[9px] bg-[#c8a15a]/10 crm-gold px-2 py-0.5 rounded-full font-medium max-w-[90px] truncate">
                              {lead.broker?.fullName || "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {colLeads.length === 0 && (
                    <div className="h-24 flex items-center justify-center border border-dashed crm-bd rounded-xl">
                      <span className="text-[10px] crm-faint">{t.leads.noLeads}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List */
        <div className="crm-panel overflow-hidden">
          <div className="overflow-x-auto crm-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b crm-bd text-xs uppercase font-semibold crm-muted">
                  <th className="p-4">{lang === "en" ? "Lead" : "Клиент"}</th>
                  <th className="p-4">{lang === "en" ? "Phone" : "Телефон"}</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">{lang === "en" ? "Budget" : "Бюджет"}</th>
                  <th className="p-4">{lang === "en" ? "Broker" : "Брокер"}</th>
                  <th className="p-4">{lang === "en" ? "Source" : "Источник"}</th>
                  <th className="p-4">{t.leads.fields.preferredContact}</th>
                  <th className="p-4 text-right">{t.leads.tblActions}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredLeads.map((lead) => {
                  const meta = sMeta(lead.status);
                  const unseen = unseenCount(lead);
                  return (
                    <tr key={lead.id} onClick={() => { setSelectedLead(lead); setEditMode(false); }}
                        className="border-b crm-bd hover:bg-[var(--crm-surface-hover)] transition-colors cursor-pointer">
                      <td className="p-4 font-semibold crm-text">
                        <div className="flex items-center gap-2">
                          {lead.name}
                          {unseen > 0 && <ShieldAlert className="w-3.5 h-3.5 text-red-500" />}
                        </div>
                      </td>
                      <td className="p-4 crm-muted">{formatPhone(lead.phone)}</td>
                      <td className="p-4"><span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${meta.chip}`}>{statusLabel(lead.status)}</span></td>
                      <td className="p-4 crm-gold font-bold">{formatMoney(lead.budget)}</td>
                      <td className="p-4 crm-text">{lead.broker?.fullName || "—"}</td>
                      <td className="p-4 text-xs crm-muted">{lead.source}</td>
                      <td className="p-4">
                        {lead.preferredContact
                          ? <span className="inline-flex items-center gap-1.5 text-xs crm-muted">{prefIcon(lead.preferredContact)}{prefLabel(lead.preferredContact, lang)}</span>
                          : <span className="text-xs crm-faint">—</span>}
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); setEditMode(false); }}
                                className="text-xs crm-gold border crm-bd hover:bg-[#c8a15a] hover:text-[#08080a] px-3 py-1 rounded-lg transition-all">
                          {t.leads.btnDetails}
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredLeads.length === 0 && (
                  <tr><td colSpan={8} className="p-10 text-center crm-muted">{t.leads.noLeads}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      {isNewLeadOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-xl p-6 relative animate-modal">
            <button onClick={() => { setIsNewLeadOpen(false); resetNewLeadForm(); }} className="absolute top-4 right-4 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold border-b crm-bd pb-4 mb-4 crm-text">{t.leads.btnAddLead}</h3>
            {errorMsg && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs flex items-center gap-2"><AlertCircle className="w-4 h-4" />{errorMsg}</div>}
            {duplicateWarning && (
              <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-600 text-xs flex flex-col gap-3">
                <div className="flex items-center gap-2"><AlertCircle className="w-5 h-5 flex-shrink-0" /><p className="font-semibold">{duplicateWarning}</p></div>
                <button type="button" onClick={(e) => handleCreateLead(e, true)} className="crm-btn-primary self-end text-xs py-1.5">{t.leads.forceSubmitBtn}</button>
              </div>
            )}
            <form onSubmit={(e) => handleCreateLead(e, false)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label={t.leads.leadName}><input required value={newLeadName} onChange={(e) => setNewLeadName(e.target.value)} placeholder={lang === "en" ? "Name..." : "Имя..."} className="crm-input" /></Field>
                <Field label={t.leads.leadPhone}><PhoneField theme="crm" required value={newLeadPhone} onChange={setNewLeadPhone} /></Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label={t.leads.leadEmail}><input type="email" value={newLeadEmail} onChange={(e) => setNewLeadEmail(e.target.value)} placeholder="mail@example.com" className="crm-input" /></Field>
                <Field label={t.leads.leadBudget}><input type="number" value={newLeadBudget} onChange={(e) => setNewLeadBudget(e.target.value)} placeholder="2000000" className="crm-input" /></Field>
              </div>
              <Field label={t.leads.leadSource}>
                <div className="flex gap-2">
                  <select value={newLeadSource} onChange={(e) => setNewLeadSource(e.target.value)} className="crm-input crm-select flex-1">
                    {sourceOptions.map((s) => <option key={s} value={s}>{s === "Manual" ? t.leads.manualSource : s}</option>)}
                  </select>
                  {canManageOptions && (
                    <button type="button" onClick={() => addSource(setNewLeadSource)} className="crm-btn-ghost px-3 flex-shrink-0" title={lang === "en" ? "Add source/agent" : "Manba qo'shish"}>
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Field>
              <Field label={t.leads.fields.preferredContact}>
                <PrefPicker value={newLeadPref} onChange={setNewLeadPref} lang={lang} />
              </Field>
              <Field label={t.leads.leadProps}>
                <div className="max-h-32 overflow-y-auto crm-scroll border crm-bd rounded-xl p-2.5 space-y-1.5" style={{ background: "var(--crm-input-bg)" }}>
                  {properties.length === 0 && <span className="text-xs crm-faint">—</span>}
                  {properties.map((p) => (
                    <label key={p.id} className="flex items-center gap-2 text-xs cursor-pointer crm-text">
                      <input type="checkbox" checked={newLeadProps.includes(p.id)}
                        onChange={(e) => setNewLeadProps(e.target.checked ? [...newLeadProps, p.id] : newLeadProps.filter((id) => id !== p.id))}
                        className="accent-[#c8a15a]" />
                      {p.title} — {formatMoney(p.price)}
                    </label>
                  ))}
                </div>
              </Field>
              <button type="submit" disabled={savingLead} className="crm-btn-primary w-full py-3">
                {savingLead ? <Loader2 className="w-5 h-5 animate-spin" /> : t.leads.btnSave}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lost Reason Modal */}
      {isLostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-md p-6 relative animate-modal">
            <button onClick={() => { setIsLostModalOpen(false); setLostReasonText(""); setTargetLostLeadId(null); }} className="absolute top-4 right-4 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-bold border-b crm-bd pb-3 mb-4 flex items-center gap-2 crm-text"><AlertCircle className="w-5 h-5 text-red-500" />{t.leads.lostReasonPromptTitle}</h3>
            <p className="text-xs mb-4 crm-muted">{t.leads.lostReasonSub}</p>
            <textarea required rows={3} value={lostReasonText} onChange={(e) => setLostReasonText(e.target.value)} placeholder={t.leads.lostReasonPlaceholder} className="crm-input mb-4" />
            <button onClick={submitLostReason} className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all">{t.leads.btnConfirm}</button>
          </div>
        </div>
      )}

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-backdrop" onClick={() => setSelectedLead(null)}>
          <div onClick={(e) => e.stopPropagation()} className="crm-card rounded-none rounded-l-2xl w-full max-w-2xl h-full p-6 overflow-y-auto crm-scroll flex flex-col relative animate-drawer">
            <button onClick={() => setSelectedLead(null)} className="absolute top-5 right-5 crm-muted hover:crm-text"><X className="w-6 h-6" /></button>

            {/* Header */}
            <div className="flex items-start justify-between border-b crm-bd pb-5 pr-8">
              <div>
                <h3 className="text-2xl font-bold crm-text">{selectedLead.name}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="crm-chip">{selectedLead.source}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${sMeta(selectedLead.status).chip}`}>{selectedLead.status}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {canEditLead(selectedLead) && !editMode && (
                  <button onClick={() => openEdit(selectedLead)} className="crm-btn-ghost py-2 px-3" title={t.leads.btnEdit}><Pencil className="w-4 h-4" /></button>
                )}
                {archiveView ? (
                  <>
                    <button onClick={() => handleRestoreLead(selectedLead.id)} className="crm-btn-ghost py-2 px-3 text-emerald-500" title={lang === "en" ? "Restore" : "Восстановить"}><History className="w-4 h-4" /></button>
                    {user?.role === "OWNER" && (
                      <button onClick={() => handleHardDelete(selectedLead.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl transition-all" title={lang === "en" ? "Delete permanently" : "Удалить навсегда"}><Trash2 className="w-4 h-4" /></button>
                    )}
                  </>
                ) : (
                  (user?.role === "OWNER" || user?.role === "ADMIN") && (
                    <button onClick={() => handleDeleteLead(selectedLead.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl transition-all" title={lang === "en" ? "Archive" : "В архив"}><Trash2 className="w-4 h-4" /></button>
                  )
                )}
              </div>
            </div>

            <div className="mt-5 flex-1 space-y-6">
              {/* Contact info — view or edit */}
              {!editMode ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold crm-muted">{lang === "en" ? "Phone" : "Телефон"}</span>
                    <div className="flex items-center gap-2 text-sm crm-text"><Phone className="w-4 h-4 crm-gold" /> {formatPhone(selectedLead.phone)}</div>
                    <div className="flex items-center gap-2 pt-1">
                      <button onClick={() => copyPhone(selectedLead.phone)} className="crm-btn-ghost py-1 px-2 text-[11px] flex items-center gap-1" title={lang === "en" ? "Copy number" : "Skopirovat"}>
                        <Copy className="w-3 h-3" /> {copiedPhone ? (lang === "en" ? "Copied" : "Nusxa olindi") : (lang === "en" ? "Copy" : "Nusxa")}
                      </button>
                      <a href={waLink(selectedLead.phone)} target="_blank" rel="noopener noreferrer" className="py-1 px-2 text-[11px] rounded-lg border border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10 flex items-center gap-1 font-semibold">
                        <MessageCircle className="w-3 h-3" /> WhatsApp
                      </a>
                    </div>
                  </div>
                  <Info icon={<Mail className="w-4 h-4 crm-gold" />} label="E-mail" value={selectedLead.email || "—"} />
                  <Info icon={prefIcon(selectedLead.preferredContact)} label={t.leads.fields.preferredContact} value={prefLabel(selectedLead.preferredContact, lang)} />
                  <Info icon={<DollarSign className="w-4 h-4 crm-gold" />} label={lang === "en" ? "Budget" : "Бюджет"} value={formatMoney(selectedLead.budget)} gold />
                  <Info icon={<Clock className="w-4 h-4 crm-gold" />} label={lang === "en" ? "Created" : "Создан"} value={new Date(selectedLead.createdAt).toLocaleDateString()} />
                </div>
              ) : (
                <div className="crm-panel p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label={t.leads.leadName}><input value={editName} onChange={(e) => setEditName(e.target.value)} className="crm-input" /></Field>
                    <Field label={t.leads.leadPhone}><PhoneField theme="crm" value={editPhone} onChange={setEditPhone} /></Field>
                    <Field label={t.leads.leadEmail}><input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="crm-input" /></Field>
                    <Field label={t.leads.leadBudget}><input type="number" value={editBudget} onChange={(e) => setEditBudget(e.target.value)} className="crm-input" /></Field>
                  </div>
                  <Field label={t.leads.leadSource}>
                    <select value={editSource} onChange={(e) => setEditSource(e.target.value)} className="crm-input crm-select">
                      {sourceOptions.map((s) => <option key={s} value={s}>{s === "Manual" ? t.leads.manualSource : s}</option>)}
                    </select>
                  </Field>
                  <Field label={t.leads.fields.preferredContact}>
                    <PrefPicker value={editPref} onChange={setEditPref} lang={lang} />
                  </Field>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setEditMode(false)} className="crm-btn-ghost">{t.leads.btnCancel}</button>
                    <button onClick={saveEdit} disabled={savingEdit} className="crm-btn-primary">
                      {savingEdit ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" />{t.leads.btnSaveChanges}</>}
                    </button>
                  </div>
                </div>
              )}

              {/* Status control */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold crm-muted block">Status</span>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((st) => {
                    const active = selectedLead.status === st;
                    const meta = sMeta(st);
                    return (
                      <button key={st} onClick={() => handleUpdateStatus(selectedLead.id, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${active ? `${meta.bar} text-white border-transparent` : "crm-bd crm-muted hover:crm-text"}`}>
                        {statusLabel(st)}
                      </button>
                    );
                  })}
                </div>
                {selectedLead.status === "LOST" && selectedLead.lostReason && (
                  <div className="mt-2 p-3 bg-red-500/8 border border-red-500/25 rounded-xl text-xs text-red-500">
                    <span className="font-bold block">{t.leads.lostReasonLabel}</span>{selectedLead.lostReason}
                  </div>
                )}
              </div>

              {/* Broker assignment */}
              {user?.role !== "BROKER" && user?.role !== "MARKETING_DIRECTOR" && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold crm-muted block">{t.leads.assignedBroker}</span>
                  <select value={selectedLead.brokerId || ""} onChange={(e) => handleAssignBroker(selectedLead.id, e.target.value)} className="crm-input crm-select">
                    <option value="">{t.leads.unassigned}</option>
                    {users.filter((u) => u.role === "BROKER" && u.isActive !== false).map((u) => <option key={u.id} value={u.id}>{u.fullName}</option>)}
                  </select>
                </div>
              )}

              {/* Properties */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold crm-muted block">{t.leads.leadProps}</span>
                <div className="space-y-1.5">
                  {selectedLead.properties.map((p, i) => (
                    <div key={i} className="crm-panel p-3 flex items-center justify-between text-xs">
                      <span className="font-semibold crm-text">{p.property.title}</span>
                      <span className="crm-gold font-bold">{formatMoney(p.property.price)}</span>
                    </div>
                  ))}
                  {selectedLead.properties.length === 0 && <span className="text-xs crm-faint italic">—</span>}
                </div>
              </div>

              {/* Change History */}
              {user?.role !== "MARKETING_DIRECTOR" && (
                <div className="space-y-3 pt-4 border-t crm-bd">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm flex items-center gap-2 crm-text"><History className="w-4 h-4 crm-gold" />{t.leads.historyTitle}</h4>
                    {isManager && unseenCount(selectedLead) > 0 && (
                      <button onClick={() => acknowledgeHistory(selectedLead.id)} className="text-[11px] font-semibold text-red-500 border border-red-500/30 hover:bg-red-500/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Check className="w-3 h-3" /> {t.leads.btnAcknowledge}
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto crm-scroll pr-1">
                    {selectedLead.history.length === 0 && <p className="text-xs crm-faint italic">{t.leads.noHistory}</p>}
                    {selectedLead.history.map((h) => {
                      const hot = isManager && !h.seen;
                      return (
                        <div key={h.id} className={`rounded-xl p-3 border text-xs ${hot ? "bg-red-500/8 border-red-500/30" : "crm-bd"}`} style={hot ? {} : { background: "var(--crm-surface-2)" }}>
                          <div className="flex items-center justify-between">
                            <span className={`font-bold ${hot ? "text-red-500" : "crm-gold"}`}>{fieldLabel(h.field)}</span>
                            <span className="crm-faint">{new Date(h.createdAt).toLocaleString()}</span>
                          </div>
                          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                            <span className="line-through crm-muted">{h.oldValue || "—"}</span>
                            <span className="crm-faint">→</span>
                            <span className="font-semibold crm-text">{h.newValue || "—"}</span>
                          </div>
                          <p className="mt-1 crm-faint">{h.editorName}{h.editorRole ? ` · ${h.editorRole}` : ""}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Comments + reminder */}
              {user?.role !== "MARKETING_DIRECTOR" && (
                <div className="space-y-3 pt-4 border-t crm-bd">
                  <h4 className="font-semibold text-sm flex items-center gap-2 crm-text"><MessageSquare className="w-4 h-4 crm-gold" />{t.leads.commentsTitle}</h4>

                  <form onSubmit={handleAddComment} className="space-y-2">
                    <div className="flex gap-2">
                      <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={t.leads.addCommentPlaceholder} className="crm-input flex-1" />
                      <button type="submit" className="crm-btn-primary px-4">{t.leads.btnAddComment}</button>
                    </div>

                    {/* reminder toggle */}
                    <button type="button" onClick={() => setRemindOn((v) => !v)}
                      className={`text-[11px] font-semibold flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-colors ${remindOn ? "border-[#c8a15a] crm-gold bg-[#c8a15a]/10" : "crm-bd crm-muted"}`}>
                      <BellPlus className="w-3.5 h-3.5" /> {t.leads.setReminder}
                    </button>

                    {remindOn && (
                      <div className="crm-panel p-3 space-y-2.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] crm-muted">{t.leads.remindIn}:</span>
                          {[3, 7, 14, 28].map((d) => (
                            <button type="button" key={d} onClick={() => { setRemindDays(d); setRemindDate(""); }}
                              className={`text-[11px] px-2 py-1 rounded-lg border ${remindDays === d ? "bg-[#c8a15a] text-[#08080a] border-transparent" : "crm-bd crm-muted"}`}>
                              {d} {t.leads.days}
                            </button>
                          ))}
                          <span className="text-[11px] crm-faint mx-1">/</span>
                          <input type="date" value={remindDate} onChange={(e) => { setRemindDate(e.target.value); setRemindDays(null); }} className="crm-input w-auto py-1 text-[11px]" />
                        </div>
                        <input value={remindNote} onChange={(e) => setRemindNote(e.target.value)} placeholder={t.leads.reminderNote} className="crm-input text-xs py-1.5" />
                        <p className="text-[10px] crm-faint flex items-center gap-1"><AlertCircle className="w-3 h-3" />{t.leads.reminderHint}</p>
                      </div>
                    )}
                  </form>

                  <div className="space-y-2 max-h-72 overflow-y-auto crm-scroll pr-1">
                    {selectedLead.comments.map((c) => {
                      const rem = (selectedLead.reminders || []).find((r) => r.commentId === c.id && !r.done);
                      return (
                        <div key={c.id} className="rounded-xl p-3 border crm-bd" style={{ background: "var(--crm-surface-2)" }}>
                          <div className="flex justify-between text-[10px]">
                            <span className="font-bold crm-gold">{c.author}</span>
                            <span className="crm-faint">{new Date(c.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-xs crm-text mt-1">{c.text}</p>
                          {rem && (
                            <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold crm-gold bg-[#c8a15a]/10 border crm-bd px-2 py-0.5 rounded-full">
                              <BellPlus className="w-3 h-3" /> {new Date(rem.remindAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {selectedLead.comments.length === 0 && <p className="text-xs crm-faint italic">{t.leads.noComments}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- small presentational helpers ---------- */
function prefIcon(v: string | null) {
  switch ((v || "").toLowerCase()) {
    case "call": return <PhoneCall className="w-4 h-4 crm-gold" />;
    case "whatsapp": return <MessageCircle className="w-4 h-4 crm-gold" />;
    case "telegram": return <Send className="w-4 h-4 crm-gold" />;
    case "email": return <Mail className="w-4 h-4 crm-gold" />;
    default: return <MessageSquare className="w-4 h-4 crm-gold" />;
  }
}

// Segmented selector for the preferred contact channel (Call/WhatsApp/Telegram/Email).
function PrefPicker({ value, onChange, lang }: { value: string; onChange: (v: string) => void; lang: string }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {PREF_OPTIONS.map((o) => {
        const active = value.toLowerCase() === o.value.toLowerCase();
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(active ? "" : o.value)}
            aria-pressed={active}
            className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2 text-[11px] font-semibold transition-all ${
              active ? "border-[#c8a15a] bg-[#c8a15a]/12 crm-gold" : "crm-bd crm-muted hover:crm-text"
            }`}
            style={active ? undefined : { background: "var(--crm-input-bg)" }}
          >
            {prefIcon(o.value)}
            {lang === "en" ? o.en : o.ru}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold uppercase crm-muted">{label}</label>
      {children}
    </div>
  );
}
function Info({ icon, label, value, gold = false }: { icon: React.ReactNode; label: string; value: string; gold?: boolean }) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] uppercase font-bold crm-muted">{label}</span>
      <div className={`flex items-center gap-2 text-sm ${gold ? "crm-gold font-bold" : "crm-text"}`}>{icon} {value}</div>
    </div>
  );
}
