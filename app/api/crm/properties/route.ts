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

    const {
      title, location, locationUrl, price, startPrice, type, description, developer,
      agentName, agentPhone, agentEmail, cashAccepted,
    } = await req.json();

    if (!title || !location || !price || !type) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const str = (v: unknown) => (v !== undefined && v !== null && String(v).trim() ? String(v).trim() : null);

    const newProperty = await prisma.property.create({
      data: {
        title: title.trim(),
        developer: str(developer),
        agentName: str(agentName),
        agentPhone: str(agentPhone),
        agentEmail: str(agentEmail),
        location: location.trim(),
        locationUrl: str(locationUrl),
        startPrice: startPrice !== undefined && startPrice !== "" && !isNaN(parseFloat(startPrice)) ? parseFloat(startPrice) : null,
        price: parseFloat(price),
        type: type.trim(),
        cashAccepted: !!cashAccepted,
        description: str(description),
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
