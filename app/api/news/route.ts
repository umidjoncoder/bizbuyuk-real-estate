import { NextResponse } from "next/server";
import { getPublishedNews } from "@/lib/publicContent";

// Public feed: published posts only, newest first.
export async function GET() {
  try {
    const posts = await getPublishedNews();
    return NextResponse.json({ posts });
  } catch (err) {
    console.error("GET Public News error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
