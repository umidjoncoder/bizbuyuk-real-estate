import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { isValidEmail, normalizeEmail } from "@/lib/email";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

// PUT: edit a user — full name, email, role, password reset, activate/deactivate.
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const actor = await getSessionUser();
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (actor.role !== Role.OWNER && actor.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Forbidden: only Admin/Owner can manage users" }, { status: 403 });
    }

    const { id } = await params;
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { fullName, email, role, password, isActive, position, phone, telegramChatId } = await req.json();

    // Admin cannot edit an Owner, nor promote anyone to Owner.
    if (actor.role === Role.ADMIN) {
      if (target.role === Role.OWNER) {
        return NextResponse.json({ error: "Forbidden: only the Owner can edit an Owner" }, { status: 403 });
      }
      if (role && role === Role.OWNER) {
        return NextResponse.json({ error: "Forbidden: only an Owner can grant the Owner role" }, { status: 403 });
      }
    }

    const data: any = {};

    if (fullName !== undefined && fullName.trim()) data.fullName = fullName.trim();
    if (position !== undefined) data.position = position ? String(position).trim() : null;
    if (phone !== undefined) data.phone = phone ? String(phone).trim() : null;
    if (telegramChatId !== undefined) data.telegramChatId = telegramChatId ? String(telegramChatId).trim() : null;

    if (email !== undefined && String(email).trim()) {
      // "sardor" -> "sardor@gmail.com"; an own domain is kept as typed.
      const normalized = normalizeEmail(email);
      if (!isValidEmail(normalized)) {
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
      }
      if (normalized !== target.email) {
        const clash = await prisma.user.findUnique({ where: { email: normalized } });
        if (clash) return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        data.email = normalized;
      }
    }

    if (role !== undefined && role !== target.role) {
      // Prevent demoting the last remaining Owner (avoids lockout).
      if (target.role === Role.OWNER && role !== Role.OWNER) {
        const ownerCount = await prisma.user.count({ where: { role: Role.OWNER } });
        if (ownerCount <= 1) {
          return NextResponse.json({ error: "Cannot remove the last Owner" }, { status: 400 });
        }
      }
      data.role = role;
    }

    if (password !== undefined && password) {
      if (String(password).length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }
      data.password = await bcrypt.hash(password, 10);
    }

    if (isActive !== undefined) {
      // Don't allow deactivating the last active Owner or yourself.
      if (isActive === false && target.id === actor.id) {
        return NextResponse.json({ error: "You cannot deactivate yourself" }, { status: 400 });
      }
      if (isActive === false && target.role === Role.OWNER) {
        const activeOwners = await prisma.user.count({ where: { role: Role.OWNER, isActive: true } });
        if (activeOwners <= 1) {
          return NextResponse.json({ error: "Cannot deactivate the last active Owner" }, { status: 400 });
        }
      }
      data.isActive = !!isActive;
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, username: true, fullName: true, email: true, role: true, isActive: true, position: true, phone: true, telegramChatId: true, createdAt: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: actor.id,
        action: "UPDATE_USER",
        details: JSON.stringify({
          targetId: id,
          username: target.username,
          changed: Object.keys(data).map((k) => (k === "password" ? "password(reset)" : k)),
        }),
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error("PUT User error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: permanently remove a user. Owner-only (per spec: only Owner deletes data).
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const actor = await getSessionUser();
    if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (actor.role !== Role.OWNER) {
      return NextResponse.json({ error: "Forbidden: only the Owner can delete users" }, { status: 403 });
    }

    const { id } = await params;
    if (id === actor.id) {
      return NextResponse.json({ error: "You cannot delete yourself" }, { status: 400 });
    }

    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (target.role === Role.OWNER) {
      const ownerCount = await prisma.user.count({ where: { role: Role.OWNER } });
      if (ownerCount <= 1) {
        return NextResponse.json({ error: "Cannot delete the last Owner" }, { status: 400 });
      }
    }

    await prisma.user.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: actor.id,
        action: "DELETE_USER",
        details: JSON.stringify({ targetId: id, username: target.username, role: target.role }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE User error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
