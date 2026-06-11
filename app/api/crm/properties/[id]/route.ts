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

// PUT: edit a property (managers only — not Broker/Driver).
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role === Role.BROKER || user.role === Role.DRIVER) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Property not found" }, { status: 404 });

    const { title, location, price, type, description, developer } = await req.json();
    const data: any = {};
    if (title !== undefined && title.trim()) data.title = title.trim();
    if (developer !== undefined) data.developer = developer ? String(developer).trim() : null;
    if (location !== undefined && location.trim()) data.location = location.trim();
    if (price !== undefined && price !== "" && !isNaN(parseFloat(price))) data.price = parseFloat(price);
    if (type !== undefined && type.trim()) data.type = type.trim();
    if (description !== undefined) data.description = description ? description.trim() : null;

    const updated = await prisma.property.update({ where: { id }, data });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "UPDATE_PROPERTY",
        details: JSON.stringify({ propertyId: id, title: updated.title }),
      },
    });

    return NextResponse.json({ success: true, property: updated });
  } catch (err) {
    console.error("PUT Property error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: remove a property (Owner / Admin).
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER && user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Forbidden: only Owner/Admin can delete properties" }, { status: 403 });
    }

    const { id } = await params;
    const prop = await prisma.property.findUnique({ where: { id } });
    if (!prop) return NextResponse.json({ error: "Property not found" }, { status: 404 });

    await prisma.property.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "DELETE_PROPERTY",
        details: JSON.stringify({ propertyId: id, title: prop.title }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE Property error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
