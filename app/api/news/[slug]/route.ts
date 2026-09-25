import { NextResponse } from "next/server";
import { getNewsPost } from "@/lib/publicContent";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await getNewsPost(slug);
    if (!post || post.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (err) {
    console.error("GET Public News detail error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
