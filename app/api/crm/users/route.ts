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

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Brokers and Drivers have no need for the staff directory (they cannot
    // assign leads/tasks). Return an empty list to avoid leaking colleagues' data.
    if (user.role === Role.BROKER || user.role === Role.DRIVER) {
      return NextResponse.json({ users: [] });
    }

    // Management roles get the staff list (passwords always excluded).
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        avatarUrl: true,
        position: true,
        createdAt: true,
      },
      orderBy: { fullName: "asc" },
    });

    return NextResponse.json({ users });
  } catch (err: any) {
    console.error("GET Users Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Only Admin and Owner can create users
    if (user.role !== Role.ADMIN && user.role !== Role.OWNER) {
      return NextResponse.json({ error: "Forbidden: Only Admin/Owner can manage users" }, { status: 403 });
    }

    const { username, password, fullName, email, role, position } = await req.json();

    if (!username || !password || !fullName || !email || !role) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    if (String(password).length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Privilege guard: only an Owner can create another Owner.
    if (role === Role.OWNER && user.role !== Role.OWNER) {
      return NextResponse.json({ error: "Forbidden: only an Owner can create an Owner" }, { status: 403 });
    }

    // Check unique username and email
    const existingUsername = await prisma.user.findUnique({
      where: { username: username.toLowerCase().trim() },
    });
    if (existingUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (existingEmail) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username.toLowerCase().trim(),
        password: hashedPassword,
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        role: role as Role,
        position: position ? String(position).trim() : null,
      },
    });

    // Write audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CREATE_USER",
        details: JSON.stringify({ newUserId: newUser.id, username: newUser.username, role: newUser.role }),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err: any) {
    console.error("POST User Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
