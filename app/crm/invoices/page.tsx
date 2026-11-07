"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCrm } from "@/components/CrmSecurityWrapper";
import type { Invoice } from "@/lib/invoices";
import type { InvoiceFields } from "@/lib/invoicePdf";
import { ReceiptText, Plus, X, Loader2, Download, Eye, Pencil, Trash2, FileUp, ShieldCheck } from "lucide-react";

// Commission invoices to developers (Owner only). Only the deal part changes;
// logo, agency block, bank details, signature and stamp come from the
// company's own signed template, filled in the browser with pdf-lib.

type TemplateInfo = { id: string; uploadedAt: string } | null;

const DEFAULT_RATE = "7";
const AED = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const aed = (n: number | null | undefined) => (n === null || n === undefined ? "—" : `${AED.format(n)} AED`);
const ddmmyyyy = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return y && m && d ? `${d}.${m}.${y}` : iso;
};
const today = () => new Date().toLocaleDateString("en-CA"); // yyyy-mm-dd, local

const blank = (number = "") => ({
  number,
  issuedAt: today(),
  billToName: "",
  billToAddress: "",
  billToTrn: "",
  projectName: "",
  unitNo: "",
  buyerName: "",
  propertyValue: "",
  commissionRate: DEFAULT_RATE,
});
type Form = ReturnType<typeof blank>;

/** Same arithmetic as the server: value x rate, kept to the fil. */
const commissionOf = (value: string, rate: string) => {
  if (value.trim() === "" || rate.trim() === "") return null;
  const v = Number(value.replace(/[^0-9.]/g, ""));
  const r = Number(rate);
  return Number.isFinite(v) && Number.isFinite(r) ? Math.round(v * r) / 100 : null;
};

const fromInvoice = (inv: Invoice): Form => ({
  number: inv.number,
  issuedAt: inv.issuedAt,
  billToName: inv.billToName,
  billToAddress: inv.billToAddress ?? "",
  billToTrn: inv.billToTrn ?? "",
  projectName: inv.projectName ?? "",
  unitNo: inv.unitNo ?? "",
  buyerName: inv.buyerName ?? "",
  propertyValue: inv.propertyValue === null ? "" : String(inv.propertyValue),
  commissionRate: String(inv.commissionRate),
});

const formFields = (f: Form): InvoiceFields => ({
  number: f.number.trim(),
  issuedAt: f.issuedAt,
  billToName: f.billToName.trim(),
  billToAddress: f.billToAddress,
  billToTrn: f.billToTrn,
  projectName: f.projectName,
  unitNo: f.unitNo,
  buyerName: f.buyerName,
  propertyValue: f.propertyValue.trim() === "" ? null : Number(f.propertyValue.replace(/[^0-9.]/g, "")),
  commissionRate: f.commissionRate === "" ? 0 : Number(f.commissionRate),
  commissionAmount: commissionOf(f.propertyValue, f.commissionRate),
});

/* The template (~430 KB) is fetched once per tab, only when a PDF is made. */
let templateCache: { id: string; bytes: Promise<Uint8Array> } | null = null;
function loadTemplate(id: string) {
  if (templateCache?.id !== id) {
    const bytes = fetch(`/api/crm/invoices/template?v=${encodeURIComponent(id)}`).then(async (r) => {
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Could not load the invoice template");
      return Uint8Array.from(atob(d.pdf), (c) => c.charCodeAt(0));
    });
    bytes.catch(() => { if (templateCache?.id === id) templateCache = null; });
    templateCache = { id, bytes };
  }
  return templateCache.bytes;
}

async function renderPdf(templateId: string, fields: InvoiceFields) {
  const [{ fillInvoice }, template] = await Promise.all([import("@/lib/invoicePdf"), loadTemplate(templateId)]);
  const pdf = await fillInvoice(template, fields);
  return new Blob([pdf as BlobPart], { type: "application/pdf" });
}

function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

async function fileName(fields: Pick<InvoiceFields, "number" | "billToName">) {
  const { invoiceFileName } = await import("@/lib/invoicePdf");
  return invoiceFileName(fields);
}

function toBase64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export default function InvoicesPage() {
  const { user, lang } = useCrm();
  const router = useRouter();
  const en = lang === "en";

  const [items, setItems] = useState<Invoice[]>([]);
  const [nextNumber, setNextNumber] = useState<string | null>(null);
  const [template, setTemplate] = useState<TemplateInfo>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Invoice | null>(null);
  const [form, setForm] = useState<Form>(blank());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<"save" | "preview" | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const templateInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "OWNER") { router.replace("/crm/dashboard"); return; }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crm/invoices");
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Error");
      setItems(d.items);
      setNextNumber(d.nextNumber);
      setTemplate(d.template);
    } catch (e: any) {
      setNotice({ tone: "err", text: e.message || "Error" });
    } finally {
      setLoading(false);
    }
  };

  /** Every developer invoiced before, newest details first, so a repeat fills itself in. */
  const developers = useMemo(() => {
    const seen = new Map<string, Invoice>();
    for (const inv of items) {
      const key = inv.billToName.trim().toLowerCase();
      if (!seen.has(key)) seen.set(key, inv);
    }
    return seen;
  }, [items]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const pickDeveloper = (name: string) => {
    const known = developers.get(name.trim().toLowerCase());
    setForm((prev) => ({
      ...prev,
      billToName: name,
      // Only fill what is still empty; never overwrite something typed for this invoice.
      billToAddress: prev.billToAddress || known?.billToAddress || "",
      billToTrn: prev.billToTrn || known?.billToTrn || "",
    }));
    setErrors((prev) => ({ ...prev, billToName: "" }));
  };

  const openCreate = () => {
    setEditing(null);
    setForm(blank(nextNumber ?? ""));
    setErrors({});
    setOpen(true);
  };

  const openEdit = (inv: Invoice) => {
    setEditing(inv);
    setForm(fromInvoice(inv));
    setErrors({});
    setOpen(true);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    const req = en ? "Required" : "Обязательно";
    if (!form.number.trim()) next.number = req;
    if (!form.issuedAt) next.issuedAt = req;
    if (!form.billToName.trim()) next.billToName = req;
    const rate = Number(form.commissionRate);
    if (form.commissionRate === "" || !(rate >= 0 && rate <= 100)) next.commissionRate = en ? "0 to 100" : "От 0 до 100";
    if (form.propertyValue.trim() && !Number.isFinite(Number(form.propertyValue.replace(/[^0-9.]/g, "")))) {
      next.propertyValue = en ? "Numbers only" : "Только число";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const preview = async () => {
    if (!template || !validate()) return;
    // Open the tab inside the click, or the browser treats it as a pop-up.
    const tab = window.open("", "_blank");
    setBusy("preview");
    try {
      const fields = formFields(form);
      const blob = await renderPdf(template.id, fields);
      if (!tab) { saveBlob(blob, await fileName(fields)); return; }
      const url = URL.createObjectURL(blob);
      tab.location.href = url;
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (e: any) {
      tab?.close();
      setNotice({ tone: "err", text: e.message || "PDF error" });
    } finally {
      setBusy(null);
    }
  };

  const save = async () => {
    if (!validate()) return;
    setBusy("save");
    const f = formFields(form);
    const payload = {
      number: f.number,
      issuedAt: f.issuedAt,
      billToName: f.billToName,
      billToAddress: form.billToAddress.trim() || null,
      billToTrn: form.billToTrn.trim() || null,
      projectName: form.projectName.trim() || null,
      unitNo: form.unitNo.trim() || null,
      buyerName: form.buyerName.trim() || null,
      propertyValue: f.propertyValue,
      commissionRate: f.commissionRate,
    };
    try {
      const res = await fetch(editing ? `/api/crm/invoices/${editing.id}` : "/api/crm/invoices", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (res.status === 409) { setErrors({ number: en ? "This number is already used" : "Этот номер уже занят" }); return; }
      if (!res.ok) throw new Error(d.error || "Error");
      setOpen(false);
      if (template) await download(d.invoice as Invoice);
      setNotice({ tone: "ok", text: en ? `Invoice ${d.invoice.number} saved` : `Инвойс ${d.invoice.number} сохранён` });
      await load();
    } catch (e: any) {
      setNotice({ tone: "err", text: e.message || "Error" });
    } finally {
      setBusy(null);
    }
  };

  const download = async (inv: Invoice) => {
    if (!template) return;
    setDownloading(inv.id);
    try {
      const fields: InvoiceFields = { ...inv };
      saveBlob(await renderPdf(template.id, fields), await fileName(fields));
    } catch (e: any) {
      setNotice({ tone: "err", text: e.message || "PDF error" });
    } finally {
      setDownloading(null);
    }
  };

  const remove = async (inv: Invoice) => {
    if (!confirm(en ? `Delete invoice ${inv.number}? A PDF already sent is not affected.` : `Удалить инвойс ${inv.number}? Уже отправленный PDF не изменится.`)) return;
    const res = await fetch(`/api/crm/invoices/${inv.id}`, { method: "DELETE" });
    if (res.ok) load();
    else setNotice({ tone: "err", text: (await res.json()).error || "Error" });
  };

  const onTemplatePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.type && file.type !== "application/pdf") {
      setNotice({ tone: "err", text: en ? "Please choose a PDF file" : "Выберите PDF-файл" });
      return;
    }
    setUploading(true);
    try {
      const res = await fetch("/api/crm/invoices/template", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdf: toBase64(await file.arrayBuffer()) }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Upload failed");
      setTemplate(d.template);
      setNotice({ tone: "ok", text: en ? "Invoice template saved" : "Шаблон инвойса сохранён" });
    } catch (err: any) {
      setNotice({ tone: "err", text: err.message || "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const total = commissionOf(form.propertyValue, form.commissionRate);

  return (
    <div className="space-y-7">
      <input ref={templateInput} type="file" accept="application/pdf,.pdf" className="hidden" onChange={onTemplatePick} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight crm-text flex items-center gap-2">
            <ReceiptText className="w-7 h-7 crm-gold" />{en ? "Invoices" : "Инвойсы"}
          </h2>
          <p className="text-sm crm-muted mt-1">
            {en
              ? "Commission invoices to developers. Only the deal changes — the rest is the company's signed template."
              : "Инвойсы застройщикам на комиссию. Меняется только сделка — остальное из подписанного шаблона компании."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {template && (
            <button onClick={() => templateInput.current?.click()} disabled={uploading} className="crm-btn-ghost whitespace-nowrap" title={en ? "Replace the blank template PDF" : "Заменить шаблон PDF"}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
              {en ? "Template" : "Шаблон"}
            </button>
          )}
          <button onClick={openCreate} disabled={loading || !template} className="crm-btn-primary whitespace-nowrap">
            <Plus className="w-4 h-4" />{en ? "New invoice" : "Новый инвойс"}
          </button>
        </div>
      </div>

      {notice && (
        <div className={`flex items-start justify-between gap-3 p-3 rounded-xl border text-sm ${notice.tone === "ok" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-red-500/10 border-red-500/30 text-red-500"}`}>
          <span>{notice.text}</span>
          <button onClick={() => setNotice(null)} className="opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* One-time setup: the signed blank template lives in the DB, not in the code. */}
      {!loading && !template && (
        <div className="crm-card p-6 flex flex-col md:flex-row md:items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-[#c8a15a]/10 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 crm-gold" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold crm-text">{en ? "Upload the invoice template once" : "Загрузите шаблон инвойса (один раз)"}</h4>
            <p className="text-sm crm-muted mt-1">
              {en
                ? "Choose the blank BIZBUYUK invoice PDF (bizbuyuk-invoice-template.pdf). It carries the signature and stamp, so it is kept privately in the CRM and only the Owner can use it."
                : "Выберите пустой PDF-шаблон инвойса BIZBUYUK (bizbuyuk-invoice-template.pdf). На нём подпись и печать, поэтому он хранится закрыто в CRM и доступен только владельцу."}
            </p>
          </div>
          <button onClick={() => templateInput.current?.click()} disabled={uploading} className="crm-btn-primary">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
            {en ? "Upload PDF" : "Загрузить PDF"}
          </button>
        </div>
      )}

      <div className="crm-panel overflow-hidden">
        <div className="overflow-x-auto crm-scroll">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b crm-bd text-xs uppercase font-semibold crm-muted">
                <th className="px-3 py-4">№</th>
                <th className="px-3 py-4">{en ? "Date" : "Дата"}</th>
                <th className="px-3 py-4">{en ? "Invoice to" : "Кому"}</th>
                <th className="px-3 py-4">{en ? "Project · Unit · Buyer" : "Проект · Юнит · Покупатель"}</th>
                <th className="px-3 py-4 text-right">{en ? "Commission" : "Комиссия"}</th>
                <th className="px-3 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading && <tr><td colSpan={6} className="p-10 text-center crm-muted"><Loader2 className="w-6 h-6 crm-gold animate-spin inline" /></td></tr>}
              {!loading && items.map((inv) => (
                <tr key={inv.id} className="border-b crm-bd hover:bg-[var(--crm-surface-hover)]">
                  <td className="px-3 py-3.5 font-semibold crm-text whitespace-nowrap tabular-nums">{inv.number}</td>
                  <td className="px-3 py-3.5 crm-muted whitespace-nowrap tabular-nums">{ddmmyyyy(inv.issuedAt)}</td>
                  <td className="px-3 py-3.5 min-w-[160px] max-w-[230px]">
                    <p className="crm-text font-medium line-clamp-2 break-words">{inv.billToName}</p>
                    {inv.billToTrn && <p className="text-xs crm-faint tabular-nums truncate">TRN {inv.billToTrn}</p>}
                  </td>
                  <td className="px-3 py-3.5 min-w-[160px] max-w-[240px]">
                    <p className="crm-text line-clamp-2 break-words">{[inv.projectName, inv.unitNo].filter(Boolean).join(" · ") || "—"}</p>
                    {inv.buyerName && <p className="text-xs crm-faint truncate">{inv.buyerName}</p>}
                  </td>
                  <td className="px-3 py-3.5 text-right whitespace-nowrap">
                    <p className="font-bold crm-gold tabular-nums">{aed(inv.commissionAmount)}</p>
                    <p className="text-xs crm-faint tabular-nums">
                      {AED.format(inv.commissionRate)}%{inv.propertyValue !== null && ` · ${AED.format(inv.propertyValue)}`}
                    </p>
                  </td>
                  <td className="pl-1 pr-3 py-3.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center">
                      <button onClick={() => download(inv)} disabled={!template || downloading === inv.id} title={en ? "Download PDF" : "Скачать PDF"} className="p-1.5 rounded-lg crm-gold hover:bg-[var(--crm-surface-hover)] disabled:opacity-40">
                        {downloading === inv.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      </button>
                      <button onClick={() => openEdit(inv)} title={en ? "Edit" : "Изменить"} className="p-1.5 rounded-lg crm-faint hover:crm-text hover:bg-[var(--crm-surface-hover)]">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(inv)} title={en ? "Delete" : "Удалить"} className="p-1.5 rounded-lg crm-faint hover:text-red-500 hover:bg-[var(--crm-surface-hover)]">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && items.length === 0 && (
                <tr><td colSpan={6} className="p-10 text-center crm-muted">
                  {en ? "No invoices yet. Each one downloads as a signed, stamped PDF." : "Инвойсов пока нет. Каждый скачивается как PDF с подписью и печатью."}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-2xl max-h-[92vh] flex flex-col relative animate-modal">
            <div className="p-6 pb-4 border-b crm-bd">
              <button onClick={() => setOpen(false)} className="absolute top-5 right-5 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
              <h3 className="text-xl font-bold crm-text">
                {editing ? (en ? `Edit invoice ${editing.number}` : `Инвойс ${editing.number}`) : (en ? "New invoice" : "Новый инвойс")}
              </h3>
              <p className="text-xs crm-muted mt-1 pr-8">
                {en
                  ? "Logo, agency details, bank details, signature and stamp come from the template and do not change."
                  : "Логотип, данные агентства, банковские реквизиты, подпись и печать берутся из шаблона и не меняются."}
              </p>
            </div>

            <div className="p-6 overflow-y-auto crm-scroll space-y-6">
              <Section title={en ? "Invoice" : "Инвойс"}>
                <div className="grid grid-cols-2 gap-3">
                  <F label={en ? "Invoice No." : "Номер инвойса"} error={errors.number}>
                    <input value={form.number} onChange={(e) => set("number", e.target.value)} placeholder="2013088" className={`crm-input tabular-nums ${errors.number ? "is-invalid" : ""}`} autoFocus={!editing} />
                  </F>
                  <F label={en ? "Date" : "Дата"} error={errors.issuedAt}>
                    <input type="date" value={form.issuedAt} onChange={(e) => set("issuedAt", e.target.value)} className={`crm-input ${errors.issuedAt ? "is-invalid" : ""}`} />
                  </F>
                </div>
              </Section>

              <Section title={en ? "Invoice to (developer)" : "Кому (застройщик)"}>
                <F
                  label={en ? "Company name" : "Название компании"}
                  error={errors.billToName}
                  hint={developers.size ? (en ? "Pick a developer invoiced before and the address and TRN fill in." : "Выберите застройщика из прошлых инвойсов — адрес и TRN подставятся сами.") : undefined}
                >
                  <input list="inv-developers" autoComplete="off" value={form.billToName} onChange={(e) => pickDeveloper(e.target.value)} placeholder="DANUBE PROPERTIES DEVELOPMENT LLC" className={`crm-input ${errors.billToName ? "is-invalid" : ""}`} />
                  <datalist id="inv-developers">
                    {[...developers.values()].map((inv) => <option key={inv.id} value={inv.billToName} />)}
                  </datalist>
                </F>
                <div className="grid gap-3 sm:grid-cols-[1fr_190px] mt-3">
                  <F label={en ? "Address" : "Адрес"}>
                    <textarea rows={2} value={form.billToAddress} onChange={(e) => set("billToAddress", e.target.value)} placeholder="Office No. G1/G2, ..., Dubai, PO Box 113806" className="crm-input resize-none" />
                  </F>
                  <F label="TRN">
                    <input inputMode="numeric" value={form.billToTrn} onChange={(e) => set("billToTrn", e.target.value)} placeholder="100212663700003" className="crm-input tabular-nums" />
                  </F>
                </div>
              </Section>

              <Section title={en ? "Particulars (the deal)" : "Сделка (Particulars)"}>
                <div className="grid gap-3 sm:grid-cols-3">
                  <F label={en ? "Project name" : "Проект"}>
                    <input value={form.projectName} onChange={(e) => set("projectName", e.target.value)} placeholder="OCEANZ By Danube" className="crm-input" />
                  </F>
                  <F label={en ? "Unit #" : "Юнит №"}>
                    <input value={form.unitNo} onChange={(e) => set("unitNo", e.target.value)} placeholder="OCZ-02-F09-910" className="crm-input tabular-nums" />
                  </F>
                  <F label={en ? "Buyer's name" : "Покупатель"} hint={en ? "Cyrillic prints in Latin letters." : "Кириллица выйдет латиницей."}>
                    <input value={form.buyerName} onChange={(e) => set("buyerName", e.target.value)} placeholder="Sergei Prokhorov" className="crm-input" />
                  </F>
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_110px_1fr] items-start mt-3">
                  <F label={en ? "Total value of the property (AED)" : "Стоимость объекта (AED)"} error={errors.propertyValue}>
                    <input inputMode="decimal" value={form.propertyValue} onChange={(e) => set("propertyValue", e.target.value)} placeholder="1753050" className={`crm-input tabular-nums ${errors.propertyValue ? "is-invalid" : ""}`} />
                  </F>
                  <F label={en ? "Rate, %" : "Ставка, %"} error={errors.commissionRate}>
                    <input type="number" min={0} max={100} step={0.5} value={form.commissionRate} onChange={(e) => set("commissionRate", e.target.value)} className={`crm-input tabular-nums ${errors.commissionRate ? "is-invalid" : ""}`} />
                  </F>
                  {/* The figure that goes on the TOTAL line, worked out as it is typed. */}
                  <div className="crm-panel px-4 py-3 sm:mt-[22px]" aria-live="polite">
                    <p className="text-[10px] font-semibold uppercase tracking-wider crm-muted">{en ? "Total commission" : "Итого комиссия"}</p>
                    <p className={`text-lg font-bold tabular-nums mt-0.5 ${total === null ? "crm-faint" : "crm-gold"}`}>{aed(total)}</p>
                  </div>
                </div>
              </Section>
            </div>

            <div className="p-6 pt-4 border-t crm-bd flex items-center gap-2">
              <button onClick={() => setOpen(false)} className="crm-btn-ghost hidden sm:inline-flex">{en ? "Cancel" : "Отмена"}</button>
              <span className="grow" />
              <button onClick={preview} disabled={!template || busy !== null} className="crm-btn-ghost" title={en ? "Open the PDF in a new tab" : "Открыть PDF в новой вкладке"}>
                {busy === "preview" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                <span className="hidden sm:inline">{en ? "Preview PDF" : "Просмотр PDF"}</span>
              </button>
              <button onClick={save} disabled={busy !== null} className="crm-btn-primary">
                {busy === "save" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {en ? "Save & download" : "Сохранить и скачать"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] crm-gold mb-3">{title}</h4>
      {children}
    </section>
  );
}

function F({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold uppercase crm-muted">{label}</label>
      {children}
      {error ? <p className="text-xs text-red-500">{error}</p> : hint ? <p className="text-xs crm-faint">{hint}</p> : null}
    </div>
  );
}
