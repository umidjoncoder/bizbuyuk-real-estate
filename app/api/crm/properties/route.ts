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

    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ properties });
  } catch (err: any) {
    console.error("GET Properties Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Only Owner, Admin, Sales Director and Marketing Director can add properties
    if (
      user.role === Role.BROKER ||
      user.role === Role.DRIVER
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { title, location, price, type, description, developer } = await req.json();

    if (!title || !location || !price || !type) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const newProperty = await prisma.property.create({
      data: {
        title: title.trim(),
        developer: developer ? String(developer).trim() : null,
        location: location.trim(),
        price: parseFloat(price),
        type: type.trim(),
        description: description ? description.trim() : null,
      },
    });

    // Write audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CREATE_PROPERTY",
        details: JSON.stringify({ propertyId: newProperty.id, title: newProperty.title }),
      },
    });

    return NextResponse.json({ success: true, property: newProperty });
  } catch (err: any) {
    console.error("POST Property Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
