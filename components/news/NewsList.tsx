"use client";

import { useEffect, useState } from "react";
import { useLang } from "../LanguageProvider";
import { Reveal } from "../Reveal";
import type { Locale } from "@/lib/i18n";
import { ArrowUpRight, Loader2 } from "lucide-react";

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

export function NewsList() {
  const { t, locale } = useLang();
  const n = t.newsPage;
  const loc = locale as Locale;
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []))
      .catch(() => setPosts([]));
  }, []);

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleDateString(loc === "ru" ? "ru-RU" : loc === "uz" ? "uz-UZ" : "en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow mb-5">{n.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display max-w-[16ch] text-[clamp(2.1rem,5.5vw,3.6rem)]">{n.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[56ch] text-[1rem] leading-relaxed text-muted">{n.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="surface-light">
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 sm:py-20">
          {posts === null && (
            <div className="flex justify-center py-16 text-bronze">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {posts?.length === 0 && <p className="text-center text-muted-dark">{n.empty}</p>}

          <div className="grid gap-6 sm:grid-cols-2">
            {posts?.map((p, i) => (
              <Reveal key={p.slug} delay={0.05 * i}>
                <a
                  href={`/news/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-sand-2 ring-1 ring-line-dark transition-all duration-500 hover:-translate-y-1 hover:ring-bronze/40 hover:shadow-[0_24px_50px_-28px_rgba(21,18,13,0.4)]"
                >
                  {p.coverImage && (
                    <div className="card-img aspect-[16/10] overflow-hidden">
                      <img src={p.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-[1.03]" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-bronze/70">{dateFmt(p.publishedAt)}</p>
                    <h2 className="mt-3 text-[1.15rem] font-extrabold leading-snug tracking-tight text-coal">{pick(p, TITLE_KEY, loc)}</h2>
                    <p className="mt-2.5 line-clamp-3 flex-1 text-[0.9rem] leading-relaxed text-muted-dark">{pick(p, BODY_KEY, loc)}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-bronze">
                      {n.readMore}
                      <ArrowUpRight size={14} strokeWidth={2.4} className="transition-transform duration-500 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
