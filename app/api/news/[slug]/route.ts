import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await prisma.newsPost.findUnique({
      where: { slug },
      select: {
        slug: true,
        titleEn: true,
        titleRu: true,
        titleUz: true,
        titleAr: true,
        bodyEn: true,
        bodyRu: true,
        bodyUz: true,
        bodyAr: true,
        coverImage: true,
        status: true,
        publishedAt: true,
      },
    });
    if (!post || post.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (err) {
    console.error("GET Public News detail error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
