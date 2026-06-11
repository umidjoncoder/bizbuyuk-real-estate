"use client";

import React, { useEffect, useState } from "react";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { useRouter } from "next/navigation";
import { crmTranslations } from "@/lib/crmTranslations";
import { Plus, X, AlertCircle, Loader2, Pencil, Trash2, Power, PowerOff, ShieldCheck } from "lucide-react";

type StaffUser = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt: string;
};

const ROLE_LABEL: Record<string, string> = {
  OWNER: "Owner",
  ADMIN: "Administrator",
  SALES_DIRECTOR: "Sales Director",
  MARKETING_DIRECTOR: "Marketing Director",
  BROKER: "Broker",
  DRIVER: "Driver",
};

export default function UsersPage() {
  const { user, lang } = useCrm();
  const router = useRouter();
  const t = crmTranslations[lang];

  const [usersList, setUsersList] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);

  const isOwner = user?.role === "OWNER";

  // create form
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [cUsername, setCUsername] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [cFullName, setCFullName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cRole, setCRole] = useState("BROKER");
  const [creating, setCreating] = useState(false);
  const [createErr, setCreateErr] = useState("");

  // edit form
  const [editUser, setEditUser] = useState<StaffUser | null>(null);
  const [eFullName, setEFullName] = useState("");
  const [eEmail, setEEmail] = useState("");
  const [eRole, setERole] = useState("BROKER");
  const [ePassword, setEPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [editErr, setEditErr] = useState("");

  useEffect(() => {
    if (!user) return;
    if (user.role !== "OWNER" && user.role !== "ADMIN") {
      router.replace("/crm/dashboard");
      return;
    }
    fetchUsers(true);
  }, [user, router]);

  const fetchUsers = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch("/api/crm/users");
      if (res.ok) setUsersList((await res.json()).users);
    } catch (err) {
      console.error(err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const roleOptions = (allowOwner: boolean) =>
    Object.entries(ROLE_LABEL).filter(([k]) => allowOwner || k !== "OWNER");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateErr("");
    setCreating(true);
    try {
      const res = await fetch("/api/crm/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cUsername, password: cPassword, fullName: cFullName, email: cEmail, role: cRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error creating profile");
      setIsCreateOpen(false);
      setCUsername(""); setCPassword(""); setCFullName(""); setCEmail(""); setCRole("BROKER");
      fetchUsers(false);
    } catch (err: any) {
      setCreateErr(err.message || "Connection error");
    } finally {
      setCreating(false);
    }
  };

  const openEdit = (u: StaffUser) => {
    setEditUser(u);
    setEFullName(u.fullName);
    setEEmail(u.email);
    setERole(u.role);
    setEPassword("");
    setEditErr("");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    setEditErr("");
    setSaving(true);
    try {
      const res = await fetch(`/api/crm/users/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: eFullName,
          email: eEmail,
          role: eRole,
          ...(ePassword ? { password: ePassword } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save");
      setEditUser(null);
      fetchUsers(false);
    } catch (err: any) {
      setEditErr(err.message || "Error");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (u: StaffUser) => {
    const next = !(u.isActive ?? true);
    if (!next && !confirm(t.users.confirmDeactivate)) return;
    try {
      const res = await fetch(`/api/crm/users/${u.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: next }),
      });
      if (res.ok) fetchUsers(false);
      else alert((await res.json()).error || "Error");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (u: StaffUser) => {
    if (!confirm(t.users.confirmDelete)) return;
    try {
      const res = await fetch(`/api/crm/users/${u.id}`, { method: "DELETE" });
      if (res.ok) fetchUsers(false);
      else alert((await res.json()).error || "Error");
    } catch (err) {
      console.error(err);
    }
  };

  const canEditRow = (target: StaffUser) => isOwner || target.role !== "OWNER";
  const isMe = (target: StaffUser) => target.id === user?.id;

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight crm-text">{t.users.title}</h2>
          <p className="text-sm crm-muted mt-1">{t.users.subtitle}</p>
        </div>
        <button onClick={() => setIsCreateOpen(true)} className="crm-btn-primary">
          <Plus className="w-4 h-4" /> {t.users.btnAddUser}
        </button>
      </div>

      {!isOwner && (
        <div className="crm-panel p-3 text-xs crm-muted flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 crm-gold" /> {t.users.onlyOwnerManage}
        </div>
      )}

      {loading ? (
        <div className="py-24 flex items-center justify-center"><Loader2 className="w-8 h-8 crm-gold animate-spin" /></div>
      ) : (
        <div className="crm-panel overflow-hidden">
          <div className="overflow-x-auto crm-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b crm-bd text-xs uppercase font-semibold crm-muted">
                  <th className="p-4">{t.users.tblName}</th>
                  <th className="p-4">{t.users.tblUsername}</th>
                  <th className="p-4">{t.users.tblEmail}</th>
                  <th className="p-4">{t.users.tblRole}</th>
                  <th className="p-4">{t.users.tblStatus}</th>
                  <th className="p-4 text-right">{t.users.tblActions}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {usersList.map((staff) => {
                  const active = staff.isActive ?? true;
                  return (
                    <tr key={staff.id} className="border-b crm-bd hover:bg-[var(--crm-surface-hover)] transition-colors">
                      <td className="p-4 font-semibold crm-text">
                        {staff.fullName}
                        {isMe(staff) && <span className="ml-2 text-[10px] crm-chip">{t.users.you}</span>}
                      </td>
                      <td className="p-4 crm-muted">{staff.username}</td>
                      <td className="p-4 crm-muted">{staff.email}</td>
                      <td className="p-4"><span className="crm-chip">{ROLE_LABEL[staff.role] || staff.role}</span></td>
                      <td className="p-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${active ? "bg-emerald-500/12 text-emerald-500" : "bg-red-500/12 text-red-500"}`}>
                          {active ? t.users.active : t.users.inactive}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {canEditRow(staff) && (
                            <button onClick={() => openEdit(staff)} className="p-2 rounded-lg border crm-bd crm-muted hover:crm-gold transition-colors" title={t.users.btnEdit}><Pencil className="w-4 h-4" /></button>
                          )}
                          {canEditRow(staff) && !isMe(staff) && (
                            <button onClick={() => toggleActive(staff)} className={`p-2 rounded-lg border crm-bd transition-colors ${active ? "crm-muted hover:text-red-500" : "crm-muted hover:text-emerald-500"}`} title={active ? t.users.btnDeactivate : t.users.btnActivate}>
                              {active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                            </button>
                          )}
                          {isOwner && !isMe(staff) && (
                            <button onClick={() => handleDelete(staff)} className="p-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors" title={t.users.btnDelete}><Trash2 className="w-4 h-4" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-lg p-6 relative animate-modal">
            <button onClick={() => { setIsCreateOpen(false); setCreateErr(""); }} className="absolute top-4 right-4 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold border-b crm-bd pb-4 mb-4 crm-text">{t.users.modalTitle}</h3>
            {createErr && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs flex items-center gap-2"><AlertCircle className="w-4 h-4" />{createErr}</div>}
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FieldU label={t.users.fullName}><input required value={cFullName} onChange={(e) => setCFullName(e.target.value)} placeholder={lang === "en" ? "Full name..." : "Полное имя..."} className="crm-input" /></FieldU>
                <FieldU label={t.users.username}><input required value={cUsername} onChange={(e) => setCUsername(e.target.value)} placeholder="sardor12" className="crm-input" /></FieldU>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FieldU label={t.users.password}><input type="password" required value={cPassword} onChange={(e) => setCPassword(e.target.value)} placeholder="••••••••" className="crm-input" /></FieldU>
                <FieldU label={t.users.gmail}><input type="email" required value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder="sardor@gmail.com" className="crm-input" /></FieldU>
              </div>
              <FieldU label={t.users.role}>
                <select value={cRole} onChange={(e) => setCRole(e.target.value)} className="crm-input crm-select">
                  {roleOptions(isOwner).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </FieldU>
              <button type="submit" disabled={creating} className="crm-btn-primary w-full py-3">
                {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : t.users.btnSaveUser}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-lg p-6 relative animate-modal">
            <button onClick={() => setEditUser(null)} className="absolute top-4 right-4 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold border-b crm-bd pb-4 mb-4 crm-text">{t.users.editTitle}</h3>
            <p className="text-xs crm-muted mb-4">@{editUser.username}</p>
            {editErr && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs flex items-center gap-2"><AlertCircle className="w-4 h-4" />{editErr}</div>}
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FieldU label={t.users.fullName}><input required value={eFullName} onChange={(e) => setEFullName(e.target.value)} className="crm-input" /></FieldU>
                <FieldU label={t.users.gmail}><input type="email" required value={eEmail} onChange={(e) => setEEmail(e.target.value)} className="crm-input" /></FieldU>
              </div>
              <FieldU label={t.users.role}>
                <select value={eRole} onChange={(e) => setERole(e.target.value)} disabled={editUser.role === "OWNER" && !isOwner} className="crm-input crm-select">
                  {roleOptions(isOwner).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </FieldU>
              <FieldU label={t.users.newPassword}>
                <input type="password" value={ePassword} onChange={(e) => setEPassword(e.target.value)} placeholder="••••••••" className="crm-input" />
                <p className="text-[10px] crm-faint mt-1">{t.users.passwordHint}</p>
              </FieldU>
              <button type="submit" disabled={saving} className="crm-btn-primary w-full py-3">
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : t.users.btnSaveChanges}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldU({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold uppercase crm-muted">{label}</label>
      {children}
    </div>
  );
}
