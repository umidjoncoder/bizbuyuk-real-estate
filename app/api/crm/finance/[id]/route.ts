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

// DELETE a transaction (Owner only).
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 });

    const { id } = await params;
    await prisma.transaction.delete({ where: { id } }).catch(() => {});
    await prisma.auditLog.create({ data: { userId: user.id, action: "DELETE_TRANSACTION", details: JSON.stringify({ id }) } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE Finance error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
