import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NewsDetail } from "@/components/news/NewsDetail";
import { prisma } from "@/lib/db";

const SITE = "https://bizbuyuk.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.newsPost.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") return {};

  const url = `${SITE}/news/${slug}`;
  const description = post.bodyEn.slice(0, 160);

  return {
    title: post.titleEn,
    description,
    alternates: { canonical: url, languages: { en: url, ru: url, uz: url, "x-default": url } },
    openGraph: { type: "article", url, title: post.titleEn, description, siteName: "BIZBUYUK Real Estate" },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.newsPost.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <>
      <Nav />
      <main>
        <NewsDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
