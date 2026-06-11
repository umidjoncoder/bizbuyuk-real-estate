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

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Only Owner can see the Audit Log
    if (user.role !== Role.OWNER) {
      return NextResponse.json({ error: "Forbidden: Only Owner can view audit logs" }, { status: 403 });
    }

    const logs = await prisma.auditLog.findMany({
      include: {
        user: {
          select: {
            fullName: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100, // Limit to 100 for safety
    });

    return NextResponse.json({ logs });
  } catch (err: any) {
    console.error("GET Logs Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
