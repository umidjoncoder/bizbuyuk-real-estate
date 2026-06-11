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

    // Only Owner and Sales Director and Marketing Director (for sources) can view dashboard analytics
    if (
      user.role !== Role.OWNER &&
      user.role !== Role.SALES_DIRECTOR &&
      user.role !== Role.MARKETING_DIRECTOR
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Lead Status breakdown
    const statusCounts = await prisma.lead.groupBy({
      by: ["status"],
      _count: true,
    });

    // Lead Source breakdown
    const sourceCounts = await prisma.lead.groupBy({
      by: ["source"],
      _count: true,
    });

    // Broker performance (WON leads count)
    const brokerPerformanceRaw = await prisma.user.findMany({
      where: {
        role: Role.BROKER,
      },
      select: {
        fullName: true,
        assignedLeads: {
          select: {
            status: true,
            budget: true,
          },
        },
      },
    });

    const brokerPerformance = brokerPerformanceRaw.map((b) => {
      const wonLeads = b.assignedLeads.filter((l) => l.status === "WON");
      const totalBudget = wonLeads.reduce((sum, l) => sum + (l.budget || 0), 0);
      return {
        name: b.fullName,
        totalLeads: b.assignedLeads.length,
        wonLeads: wonLeads.length,
        totalSales: totalBudget,
      };
    });

    // Property stats
    const propertyCount = await prisma.property.count();
    const propertySum = await prisma.property.aggregate({
      _sum: {
        price: true,
      },
    });

    return NextResponse.json({
      statusCounts: statusCounts.map((s) => ({ status: s.status, count: s._count })),
      sourceCounts: sourceCounts.map((s) => ({ source: s.source, count: s._count })),
      brokerPerformance,
      propertyCount,
      propertyTotalValue: propertySum._sum.price || 0,
    });
  } catch (err: any) {
    console.error("GET Analytics Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
