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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!CAN_MANAGE.includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const existing = await prisma.newsPost.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const { titleEn, titleRu, titleUz, titleAr, bodyEn, bodyRu, bodyUz, bodyAr, coverImage, status } = body;

    const willPublish = status === "PUBLISHED";
    const wasPublished = existing.status === "PUBLISHED";

    const post = await prisma.newsPost.update({
      where: { id },
      data: {
        ...(titleEn !== undefined ? { titleEn: String(titleEn).trim() } : {}),
        ...(titleRu !== undefined ? { titleRu: String(titleRu).trim() } : {}),
        ...(titleUz !== undefined ? { titleUz: String(titleUz).trim() } : {}),
        ...(titleAr !== undefined ? { titleAr: String(titleAr).trim() || null } : {}),
        ...(bodyEn !== undefined ? { bodyEn: String(bodyEn).trim() } : {}),
        ...(bodyRu !== undefined ? { bodyRu: String(bodyRu).trim() } : {}),
        ...(bodyUz !== undefined ? { bodyUz: String(bodyUz).trim() } : {}),
        ...(bodyAr !== undefined ? { bodyAr: String(bodyAr).trim() || null } : {}),
        ...(coverImage !== undefined ? { coverImage: coverImage || null } : {}),
        ...(status !== undefined ? { status: willPublish ? "PUBLISHED" : "DRAFT" } : {}),
        ...(willPublish && !wasPublished ? { publishedAt: new Date() } : {}),
      },
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: "UPDATE_NEWS", details: JSON.stringify({ slug: post.slug, status: post.status }) },
    });

    return NextResponse.json({ post });
  } catch (err) {
    console.error("PUT News error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!CAN_MANAGE.includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const existing = await prisma.newsPost.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.newsPost.delete({ where: { id } });
    await prisma.auditLog.create({
      data: { userId: user.id, action: "DELETE_NEWS", details: JSON.stringify({ slug: existing.slug }) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE News error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
