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

export async function GET(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Only Owner can see the Audit Log
    if (user.role !== Role.OWNER) {
      return NextResponse.json({ error: "Forbidden: Only Owner can view audit logs" }, { status: 403 });
    }

    const url = new URL(req.url);
    const take = Math.min(parseInt(url.searchParams.get("take") || "50", 10) || 50, 200);
    const skip = parseInt(url.searchParams.get("skip") || "0", 10) || 0;
    const action = url.searchParams.get("action") || "";
    const q = (url.searchParams.get("q") || "").trim();

    const where: any = {};
    if (action) where.action = action;
    if (q) where.details = { contains: q, mode: "insensitive" };

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: { user: { select: { fullName: true, role: true } } },
        orderBy: { createdAt: "desc" },
        take: take + 1, // fetch one extra to know if there's more
        skip,
      }),
      prisma.auditLog.count({ where }),
    ]);

    const hasMore = logs.length > take;
    return NextResponse.json({ logs: hasMore ? logs.slice(0, take) : logs, hasMore, total });
  } catch (err: any) {
    console.error("GET Logs Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
