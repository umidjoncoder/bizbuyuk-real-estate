import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

// PUT: update the current user's own profile photo (avatar). Expects a small
// base64 data URL (the client resizes before upload).
export async function PUT(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { avatarUrl } = await req.json();
    if (avatarUrl && typeof avatarUrl === "string") {
      if (avatarUrl.length > 400_000) {
        return NextResponse.json({ error: "Image too large" }, { status: 400 });
      }
      if (!avatarUrl.startsWith("data:image/")) {
        return NextResponse.json({ error: "Invalid image" }, { status: 400 });
      }
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { avatarUrl: avatarUrl || null },
      select: { id: true, avatarUrl: true },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    console.error("PUT Profile error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
