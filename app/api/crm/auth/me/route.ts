import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("crm_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = verifyJWT(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        role: true,
        avatarUrl: true,
      },
    });

    return NextResponse.json({ user });
  } catch (err: any) {
    console.error("Get Me API Error:", err);
    return NextResponse.json({ user: null });
  }
}
