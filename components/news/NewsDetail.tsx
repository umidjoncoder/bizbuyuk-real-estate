"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { useLang } from "../LanguageProvider";
import type { Locale } from "@/lib/i18n";

type Post = {
  slug: string;
  titleEn: string;
  titleRu: string;
  titleUz: string;
  titleAr: string | null;
  bodyEn: string;
  bodyRu: string;
  bodyUz: string;
  bodyAr: string | null;
  coverImage: string | null;
  publishedAt: string;
};

// News is stored per-locale as separate DB columns. Arabic is optional per
// post (staff aren't required to translate every post) — fall back to the
// English column when a post has no Arabic text yet, rather than showing
// nothing.
const TITLE_KEY: Record<Locale, keyof Post> = { en: "titleEn", ru: "titleRu", uz: "titleUz", ar: "titleAr" };
const BODY_KEY: Record<Locale, keyof Post> = { en: "bodyEn", ru: "bodyRu", uz: "bodyUz", ar: "bodyAr" };

function pick(post: Post, key: Record<Locale, keyof Post>, loc: Locale): string {
  return (post[key[loc]] as string | null) || (post[key.en] as string);
}

export function NewsDetail({ slug }: { slug: string }) {
  const { t, locale } = useLang();
  const n = t.newsPage;
  const loc = locale as Locale;
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/news/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.resolve({ post: null })))
      .then((d) => setPost(d.post))
      .catch(() => setPost(null));
  }, [slug]);

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleDateString(loc === "ru" ? "ru-RU" : loc === "uz" ? "uz-UZ" : "en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  if (post === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-ink pt-24">
        <Loader2 className="h-7 w-7 animate-spin text-gold" />
      </div>
    );
  }

  if (post === null) {
    return (
      <section className="bg-ink px-5 pt-40 pb-24 text-center">
        <p className="text-lg text-cream">{n.empty}</p>
        <a href="/news" className="btn-outline text-cream mt-8 inline-flex">
          <span>{n.back}</span>
        </a>
      </section>
    );
  }

  const title = pick(post, TITLE_KEY, loc);
  const body = pick(post, BODY_KEY, loc);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted">
              <li>
                <a href="/" className="transition-colors hover:text-gold">
                  {n.home}
                </a>
              </li>
              <li aria-hidden className="text-muted/40">
                <ChevronRight size={13} strokeWidth={1.6} className="rtl:-scale-x-100" />
              </li>
              <li>
                <a href="/news" className="transition-colors hover:text-gold">
                  {n.current}
                </a>
              </li>
            </ol>
          </nav>
          <p className="eyebrow mb-5">{dateFmt(post.publishedAt)}</p>
          <h1 className="display text-[clamp(2rem,5.5vw,3.2rem)]">{title}</h1>
        </div>
      </section>

      <section className="surface-light">
        <div className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 sm:py-20">
          {post.coverImage && (
            <div className="card-img mb-12 aspect-[16/9] overflow-hidden rounded-[1.4rem]">
              <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="legal-prose">
            {body.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-16 border-t border-line-dark pt-8">
            <a href="/news" className="text-sm font-bold text-bronze transition-colors hover:text-coal">
              <span aria-hidden className="inline-block rtl:-scale-x-100">←</span> {n.back}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .legal-prose p {
          margin: 0 0 1.1rem;
          max-width: 64ch;
          line-height: 1.75;
          color: rgba(21,18,13,0.72);
          font-size: 0.97rem;
        }
      `}</style>
    </>
  );
}
