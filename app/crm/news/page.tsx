"use client";

import React, { useEffect, useState } from "react";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { fileToResizedDataUrl } from "@/lib/imageResize";
import { Newspaper, Plus, Loader2, Pencil, Trash2, X, Image as ImageIcon, Globe2 } from "lucide-react";

type Post = {
  id: string;
  slug: string;
  titleEn: string;
  titleRu: string;
  titleUz: string;
  bodyEn: string;
  bodyRu: string;
  bodyUz: string;
  coverImage: string | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  createdAt: string;
  author?: { fullName: string } | null;
};

const emptyDraft = { titleEn: "", titleRu: "", titleUz: "", bodyEn: "", bodyRu: "", bodyUz: "", coverImage: "" };

export default function NewsPage() {
  const { user, lang } = useCrm();
  const en = lang === "en";
  const canManage = user?.role === "OWNER" || user?.role === "ADMIN" || user?.role === "MARKETING_DIRECTOR";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const [tab, setTab] = useState<"en" | "ru" | "uz">("en");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crm/news");
      if (res.ok) setPosts((await res.json()).posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setDraft(emptyDraft);
    setTab("en");
    setError("");
    setShowForm(true);
  };

  const openEdit = (p: Post) => {
    setEditing(p);
    setDraft({
      titleEn: p.titleEn,
      titleRu: p.titleRu,
      titleUz: p.titleUz,
      bodyEn: p.bodyEn,
      bodyRu: p.bodyRu,
      bodyUz: p.bodyUz,
      coverImage: p.coverImage || "",
    });
    setTab("en");
    setError("");
    setShowForm(true);
  };

  const onImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await fileToResizedDataUrl(file, 1400, 0.82);
      setDraft((d) => ({ ...d, coverImage: dataUrl }));
    } catch {
      alert(en ? "Could not process image" : "Не удалось обработать изображение");
    } finally {
      setUploading(false);
    }
  };

  const save = async (status: "DRAFT" | "PUBLISHED") => {
    setError("");
    if (!draft.titleEn.trim() || !draft.titleRu.trim() || !draft.titleUz.trim()) {
      setError(en ? "Title is required in EN, RU and UZ." : "Заголовок обязателен на EN, RU и UZ.");
      return;
    }
    if (!draft.bodyEn.trim() || !draft.bodyRu.trim() || !draft.bodyUz.trim()) {
      setError(en ? "Body text is required in EN, RU and UZ." : "Текст обязателен на EN, RU и UZ.");
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/crm/news/${editing.id}` : "/api/crm/news";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, coverImage: draft.coverImage || null, status }),
      });
      if (!res.ok) {
        setError((await res.json()).error || "Error");
        return;
      }
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Post) => {
    if (!confirm(en ? `Delete "${p.titleEn}"?` : `Удалить «${p.titleRu}»?`)) return;
    const res = await fetch(`/api/crm/news/${p.id}`, { method: "DELETE" });
    if (res.ok) load();
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 crm-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight crm-text flex items-center gap-2">
            <Newspaper className="w-7 h-7 crm-gold" />
            {en ? "News" : "Новости"}
          </h2>
          <p className="text-sm crm-muted mt-1">
            {en ? "Post updates to the public site — every post needs EN, RU and UZ." : "Публикация новостей на сайт — каждый пост нужен на EN, RU и UZ."}
          </p>
        </div>
        {canManage && (
          <button onClick={openNew} className="crm-btn-primary px-4">
            <Plus className="w-4 h-4" />
            {en ? "New post" : "Новый пост"}
          </button>
        )}
      </div>

      {posts.length === 0 && <div className="crm-panel py-16 text-center crm-muted">{en ? "No posts yet." : "Пока нет постов."}</div>}

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="crm-card p-4 flex items-center gap-4">
            {p.coverImage ? (
              <img src={p.coverImage} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border crm-bd" />
            ) : (
              <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 border crm-bd crm-faint">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold crm-text truncate">{p.titleEn}</p>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    p.status === "PUBLISHED" ? "bg-emerald-500/15 text-emerald-500" : "crm-chip"
                  }`}
                >
                  {p.status === "PUBLISHED" ? (en ? "Published" : "Опубликовано") : en ? "Draft" : "Черновик"}
                </span>
              </div>
              <p className="text-xs crm-muted mt-0.5 truncate">/news/{p.slug}</p>
              <p className="text-[11px] crm-faint mt-1 flex items-center gap-1">
                <Globe2 className="w-3 h-3" />
                {p.author?.fullName || (en ? "Unknown author" : "Автор неизвестен")}
              </p>
            </div>
            {canManage && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="crm-btn-ghost py-1.5 px-2 text-xs">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => remove(p)} className="crm-btn-ghost py-1.5 px-2 text-xs hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => !saving && setShowForm(false)}>
          <div className="crm-panel w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold crm-text">{editing ? (en ? "Edit post" : "Редактировать пост") : en ? "New post" : "Новый пост"}</h3>
              <button onClick={() => setShowForm(false)} className="crm-faint hover:crm-text">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {draft.coverImage ? (
                <img src={draft.coverImage} alt="" className="w-20 h-20 rounded-lg object-cover border crm-bd" />
              ) : (
                <div className="w-20 h-20 rounded-lg flex items-center justify-center border crm-bd crm-faint">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}
              <label className="crm-btn-ghost cursor-pointer">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : en ? "Cover image" : "Обложка"}
                <input type="file" accept="image/*" className="hidden" onChange={onImagePick} />
              </label>
            </div>

            <div className="flex gap-1.5">
              {(["en", "ru", "uz"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setTab(l)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${tab === l ? "crm-btn-primary" : "crm-btn-ghost"}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <input
                value={draft[`title${tab[0].toUpperCase()}${tab.slice(1)}` as keyof typeof draft]}
                onChange={(e) => setDraft((d) => ({ ...d, [`title${tab[0].toUpperCase()}${tab.slice(1)}`]: e.target.value }))}
                placeholder={en ? `Title (${tab.toUpperCase()})` : `Заголовок (${tab.toUpperCase()})`}
                className="crm-input w-full"
              />
              <textarea
                value={draft[`body${tab[0].toUpperCase()}${tab.slice(1)}` as keyof typeof draft]}
                onChange={(e) => setDraft((d) => ({ ...d, [`body${tab[0].toUpperCase()}${tab.slice(1)}`]: e.target.value }))}
                placeholder={en ? `Body text (${tab.toUpperCase()})` : `Текст (${tab.toUpperCase()})`}
                rows={10}
                className="crm-input w-full resize-y"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button disabled={saving} onClick={() => save("DRAFT")} className="crm-btn-ghost px-4">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : en ? "Save draft" : "Сохранить черновик"}
              </button>
              <button disabled={saving} onClick={() => save("PUBLISHED")} className="crm-btn-primary px-4">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : en ? "Publish" : "Опубликовать"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
