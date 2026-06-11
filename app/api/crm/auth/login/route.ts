import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Deactivated accounts cannot sign in.
    if (user.isActive === false) {
      return NextResponse.json({ error: "Account is deactivated. Contact your administrator." }, { status: 403 });
    }

    // Sign JWT
    const token = signJWT({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });

    // Save login audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "LOGIN",
        details: JSON.stringify({ username: user.username, ip: req.headers.get("x-forwarded-for") || "unknown" }),
      },
    });

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("crm_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error("Login API Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
