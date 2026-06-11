import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

// PUT: the current user updates their OWN account.
//  - avatarUrl: any user (small base64 data URL)
//  - username (login) + password: Owner / Admin can reset their own.
export async function PUT(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { avatarUrl, username, password } = await req.json();
    const data: any = {};

    // Avatar — everyone.
    if (avatarUrl !== undefined) {
      if (avatarUrl && typeof avatarUrl === "string") {
        if (avatarUrl.length > 400_000) return NextResponse.json({ error: "Image too large" }, { status: 400 });
        if (!avatarUrl.startsWith("data:image/")) return NextResponse.json({ error: "Invalid image" }, { status: 400 });
      }
      data.avatarUrl = avatarUrl || null;
    }

    // Login + password reset — Owner / Admin only (they manage their own credentials).
    const canCreds = user.role === Role.OWNER || user.role === Role.ADMIN;
    if ((username !== undefined || password !== undefined) && !canCreds) {
      return NextResponse.json({ error: "Forbidden: ask your administrator to reset your login" }, { status: 403 });
    }

    if (username !== undefined && username.trim()) {
      const normalized = username.toLowerCase().trim();
      const clash = await prisma.user.findUnique({ where: { username: normalized } });
      if (clash && clash.id !== user.id) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 });
      }
      data.username = normalized;
    }

    if (password !== undefined && password) {
      if (String(password).length < 6) return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      data.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data,
      select: { id: true, username: true, avatarUrl: true },
    });

    if (data.username || data.password) {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "UPDATE_USER",
          details: JSON.stringify({ targetId: user.id, self: true, changed: Object.keys(data).map((k) => (k === "password" ? "password(reset)" : k)) }),
        },
      });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error("PUT Profile error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
