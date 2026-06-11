"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { formatMoney } from "@/lib/format";
import { Wallet, Plus, X, Loader2, TrendingUp, TrendingDown, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";

type Tx = {
  id: string; type: "INCOME" | "EXPENSE"; category: string; amount: number;
  description: string | null; staffName: string | null; date: string;
};

const EXPENSE_CATS = ["Salary", "Commission", "Bonus", "Office", "Marketing", "Other"];
const INCOME_CATS = ["Deal", "Income", "Other"];

export default function FinancePage() {
  const { user, lang } = useCrm();
  const router = useRouter();
  const en = lang === "en";

  const [txs, setTxs] = useState<Tx[]>([]);
  const [summary, setSummary] = useState<{ income: number; expense: number; net: number; byCategory: Record<string, number> }>({ income: 0, expense: 0, net: 0, byCategory: {} });
  const [period, setPeriod] = useState("month");
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [category, setCategory] = useState("Salary");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [staffName, setStaffName] = useState("");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!user) return;
    if (user.role !== "OWNER") { router.replace("/crm/dashboard"); return; }
    load();
  }, [user, router, period]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/crm/finance?period=${period}`);
      if (res.ok) { const d = await res.json(); setTxs(d.transactions); setSummary(d.summary); }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const openAdd = (t: "INCOME" | "EXPENSE") => {
    setType(t); setCategory(t === "INCOME" ? "Deal" : "Salary"); setAmount(""); setDescription(""); setStaffName(""); setDate(""); setErr(""); setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(""); setSaving(true);
    try {
      const res = await fetch("/api/crm/finance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, category, amount, description, staffName, date: date || undefined }) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Error");
      setOpen(false); load();
    } catch (e: any) { setErr(e.message || "Error"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(en ? "Delete this transaction?" : "Удалить запись?")) return;
    const res = await fetch(`/api/crm/finance/${id}`, { method: "DELETE" });
    if (res.ok) load();
  };

  const periods = [
    { k: "week", l: en ? "Week" : "Неделя" }, { k: "month", l: en ? "Month" : "Месяц" },
    { k: "year", l: en ? "Year" : "Год" }, { k: "all", l: en ? "All" : "Всё" },
  ];
  const catLabel = (c: string) => c; // categories are short English-ish labels

  return (
    <div className="space-y-7">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight crm-text flex items-center gap-2"><Wallet className="w-7 h-7 crm-gold" />{en ? "Finance" : "Финансы"}</h2>
          <p className="text-sm crm-muted mt-1">{en ? "Income & expenses — salaries, commissions, bonuses, office costs." : "Доходы и расходы — оклады, комиссии, бонусы, офис."}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => openAdd("INCOME")} className="crm-btn-ghost text-emerald-500"><ArrowUpRight className="w-4 h-4" />{en ? "Income" : "Доход"}</button>
          <button onClick={() => openAdd("EXPENSE")} className="crm-btn-primary"><ArrowDownRight className="w-4 h-4" />{en ? "Expense" : "Расход"}</button>
        </div>
      </div>

      {/* Period filter */}
      <div className="crm-panel p-2 inline-flex gap-1">
        {periods.map((p) => (
          <button key={p.k} onClick={() => setPeriod(p.k)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${period === p.k ? "bg-[#c8a15a] text-[#08080a]" : "crm-muted hover:crm-text"}`}>{p.l}</button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="crm-card p-6">
          <div className="flex items-center justify-between"><span className="text-xs font-semibold crm-muted uppercase">{en ? "Income" : "Доход"}</span><TrendingUp className="w-5 h-5 text-emerald-500" /></div>
          <h3 className="text-2xl font-bold text-emerald-500 mt-3">{formatMoney(summary.income)}</h3>
        </div>
        <div className="crm-card p-6">
          <div className="flex items-center justify-between"><span className="text-xs font-semibold crm-muted uppercase">{en ? "Expenses" : "Расход"}</span><TrendingDown className="w-5 h-5 text-red-500" /></div>
          <h3 className="text-2xl font-bold text-red-500 mt-3">{formatMoney(summary.expense)}</h3>
        </div>
        <div className="crm-card p-6">
          <div className="flex items-center justify-between"><span className="text-xs font-semibold crm-muted uppercase">{en ? "Net" : "Итого"}</span><Wallet className="w-5 h-5 crm-gold" /></div>
          <h3 className={`text-2xl font-bold mt-3 ${summary.net >= 0 ? "crm-gold" : "text-red-500"}`}>{formatMoney(summary.net)}</h3>
        </div>
      </div>

      {/* Expense breakdown */}
      {Object.keys(summary.byCategory).length > 0 && (
        <div className="crm-card p-6">
          <h4 className="font-semibold crm-text mb-4">{en ? "Expenses by category" : "Расходы по категориям"}</h4>
          <div className="flex flex-wrap gap-3">
            {Object.entries(summary.byCategory).sort((a, b) => b[1] - a[1]).map(([c, v]) => (
              <div key={c} className="crm-panel px-4 py-2"><span className="text-xs crm-muted">{catLabel(c)}</span><div className="font-bold crm-text">{formatMoney(v)}</div></div>
            ))}
          </div>
        </div>
      )}

      {/* Ledger */}
      <div className="crm-panel overflow-hidden">
        <div className="overflow-x-auto crm-scroll">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b crm-bd text-xs uppercase font-semibold crm-muted">
                <th className="p-4">{en ? "Date" : "Дата"}</th>
                <th className="p-4">{en ? "Type" : "Тип"}</th>
                <th className="p-4">{en ? "Category" : "Категория"}</th>
                <th className="p-4">{en ? "Who / Note" : "Кому / Заметка"}</th>
                <th className="p-4 text-right">{en ? "Amount" : "Сумма"}</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading && <tr><td colSpan={6} className="p-10 text-center crm-muted"><Loader2 className="w-6 h-6 crm-gold animate-spin inline" /></td></tr>}
              {!loading && txs.map((tx) => (
                <tr key={tx.id} className="border-b crm-bd hover:bg-[var(--crm-surface-hover)]">
                  <td className="p-4 crm-muted whitespace-nowrap">{new Date(tx.date).toLocaleDateString(en ? "en-GB" : "ru-RU")}</td>
                  <td className="p-4"><span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${tx.type === "INCOME" ? "bg-emerald-500/12 text-emerald-500" : "bg-red-500/12 text-red-500"}`}>{tx.type === "INCOME" ? (en ? "Income" : "Доход") : (en ? "Expense" : "Расход")}</span></td>
                  <td className="p-4 crm-text">{catLabel(tx.category)}</td>
                  <td className="p-4 crm-muted">{tx.staffName ? <span className="crm-text font-medium">{tx.staffName}</span> : ""}{tx.staffName && tx.description ? " · " : ""}{tx.description || ""}</td>
                  <td className={`p-4 text-right font-bold ${tx.type === "INCOME" ? "text-emerald-500" : "text-red-500"}`}>{tx.type === "INCOME" ? "+" : "−"}{formatMoney(tx.amount)}</td>
                  <td className="p-4 text-right"><button onClick={() => handleDelete(tx.id)} className="crm-faint hover:text-red-500"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}
              {!loading && txs.length === 0 && <tr><td colSpan={6} className="p-10 text-center crm-muted">{en ? "No transactions yet." : "Записей пока нет."}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-md p-6 relative animate-modal">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold border-b crm-bd pb-4 mb-4 crm-text">{type === "INCOME" ? (en ? "Add Income" : "Добавить доход") : (en ? "Add Expense" : "Добавить расход")}</h3>
            {err && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs">{err}</div>}
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <F label={en ? "Category" : "Категория"}>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="crm-input crm-select">
                    {(type === "INCOME" ? INCOME_CATS : EXPENSE_CATS).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </F>
                <F label={en ? "Amount (AED)" : "Сумма (AED)"}><input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="5000" className="crm-input" /></F>
              </div>
              <F label={en ? "Employee (optional)" : "Сотрудник (необяз.)"}><input value={staffName} onChange={(e) => setStaffName(e.target.value)} placeholder={en ? "e.g. Jasur Broker" : "напр. Jasur Broker"} className="crm-input" /></F>
              <F label={en ? "Note (optional)" : "Заметка (необяз.)"}><input value={description} onChange={(e) => setDescription(e.target.value)} className="crm-input" /></F>
              <F label={en ? "Date" : "Дата"}><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="crm-input" /></F>
              <button type="submit" disabled={saving} className="crm-btn-primary w-full py-3">{saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (en ? "Save" : "Сохранить")}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><label className="text-xs font-semibold uppercase crm-muted">{label}</label>{children}</div>;
}
