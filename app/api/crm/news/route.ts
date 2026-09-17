import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role } from "@prisma/client";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

const CAN_MANAGE = [Role.OWNER, Role.ADMIN, Role.MARKETING_DIRECTOR];

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "post";
}

// GET: every post (draft + published) for the CRM's own list — any logged-in
// user can read, same as Settings; only Owner/Admin/Marketing can write.
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const posts = await prisma.newsPost.findMany({
      include: { author: { select: { fullName: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ posts });
  } catch (err) {
    console.error("GET News error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!CAN_MANAGE.includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { titleEn, titleRu, titleUz, titleAr, bodyEn, bodyRu, bodyUz, bodyAr, coverImage, status } = body;
    if (!titleEn?.trim() || !titleRu?.trim() || !titleUz?.trim()) {
      return NextResponse.json({ error: "Title is required in all three languages" }, { status: 400 });
    }
    if (!bodyEn?.trim() || !bodyRu?.trim() || !bodyUz?.trim()) {
      return NextResponse.json({ error: "Body is required in all three languages" }, { status: 400 });
    }

    let slug = slugify(titleEn);
    let attempt = 0;
    while (await prisma.newsPost.findUnique({ where: { slug } })) {
      attempt += 1;
      slug = `${slugify(titleEn)}-${attempt + 1}`;
    }

    const willPublish = status === "PUBLISHED";
    const post = await prisma.newsPost.create({
      data: {
        slug,
        titleEn: titleEn.trim(),
        titleRu: titleRu.trim(),
        titleUz: titleUz.trim(),
        titleAr: titleAr?.trim() || null,
        bodyEn: bodyEn.trim(),
        bodyRu: bodyRu.trim(),
        bodyUz: bodyUz.trim(),
        bodyAr: bodyAr?.trim() || null,
        coverImage: coverImage || null,
        status: willPublish ? "PUBLISHED" : "DRAFT",
        publishedAt: willPublish ? new Date() : null,
        authorId: user.id,
      },
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: "CREATE_NEWS", details: JSON.stringify({ slug, status: post.status }) },
    });

    return NextResponse.json({ post });
  } catch (err) {
    console.error("POST News error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
