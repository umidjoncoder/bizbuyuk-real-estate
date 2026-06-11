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

// DELETE: remove a custom option (Admin / Owner). Defaults are not stored here,
// so only admin-added options can be removed.
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER && user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { id } = await params;
    await prisma.setting.delete({ where: { id } }).catch(() => {});
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE Setting error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
