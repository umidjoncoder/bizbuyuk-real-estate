import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Public feed: published posts only, newest first.
export async function GET() {
  try {
    const posts = await prisma.newsPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        titleEn: true,
        titleRu: true,
        titleUz: true,
        bodyEn: true,
        bodyRu: true,
        bodyUz: true,
        coverImage: true,
        publishedAt: true,
      },
    });
    return NextResponse.json({ posts });
  } catch (err) {
    console.error("GET Public News error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
