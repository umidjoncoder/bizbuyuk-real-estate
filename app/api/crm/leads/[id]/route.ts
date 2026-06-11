import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role, LeadStatus } from "@prisma/client";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

const fmt = (v: unknown) => (v === null || v === undefined || v === "" ? "—" : String(v));

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { status, lostReason, brokerId, name, phone, email, budget, source, propertyIds, archived } = await req.json();

    const existingLead = await prisma.lead.findUnique({
      where: { id },
      include: { broker: { select: { fullName: true } } },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Role checks: Broker can only edit their own leads.
    if (user.role === Role.BROKER && existingLead.brokerId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // Driver and Marketing Director cannot edit leads at all.
    if (user.role === Role.DRIVER || user.role === Role.MARKETING_DIRECTOR) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Prepare update data + collect field-level changes for history.
    const updateData: any = {};
    const changes: { field: string; oldValue: string; newValue: string }[] = [];
    const track = (field: string, oldVal: unknown, newVal: unknown) => {
      if (fmt(oldVal) !== fmt(newVal)) {
        changes.push({ field, oldValue: fmt(oldVal), newValue: fmt(newVal) });
      }
    };

    if (status !== undefined && status !== existingLead.status) {
      if (status === LeadStatus.LOST && (!lostReason || !lostReason.trim())) {
        return NextResponse.json({ error: "Lost status requires a reason" }, { status: 400 });
      }
      updateData.status = status;
      track("status", existingLead.status, status);
      if (status === LeadStatus.LOST) {
        updateData.lostReason = lostReason.trim();
        track("lostReason", existingLead.lostReason, lostReason.trim());
      } else {
        updateData.lostReason = null;
      }
    }

    if (name !== undefined && name.trim() !== existingLead.name) {
      updateData.name = name.trim();
      track("name", existingLead.name, name.trim());
    }
    if (phone !== undefined && phone.trim() !== existingLead.phone) {
      updateData.phone = phone.trim();
      track("phone", existingLead.phone, phone.trim());
    }
    if (email !== undefined) {
      const newEmail = email ? email.trim() : null;
      if (newEmail !== existingLead.email) {
        updateData.email = newEmail;
        track("email", existingLead.email, newEmail);
      }
    }
    if (budget !== undefined) {
      const parsed = budget ? parseFloat(budget) : null;
      const newBudget = parsed !== null && isNaN(parsed) ? null : parsed;
      if (newBudget !== existingLead.budget) {
        updateData.budget = newBudget;
        track("budget", existingLead.budget, newBudget);
      }
    }
    if (source !== undefined && source !== existingLead.source) {
      updateData.source = source;
      track("source", existingLead.source, source);
    }

    // Broker assignment: Broker and Marketing Director cannot reassign brokers
    let notifyBrokerId: string | null = null;
    if (brokerId !== undefined && user.role !== Role.BROKER && user.role !== Role.MARKETING_DIRECTOR) {
      const newBrokerId = brokerId || null;
      if (newBrokerId !== existingLead.brokerId) {
        updateData.brokerId = newBrokerId;
        const newBroker = newBrokerId
          ? await prisma.user.findUnique({ where: { id: newBrokerId }, select: { fullName: true } })
          : null;
        track("broker", existingLead.broker?.fullName, newBroker?.fullName);
        if (newBrokerId && newBrokerId !== user.id) notifyBrokerId = newBrokerId; // notify the assignee
      }
    }

    // Archive / restore (soft-delete) — Owner only.
    if (archived !== undefined && user.role === Role.OWNER) {
      updateData.archived = !!archived;
    }

    // Perform update only if something actually changed
    let updatedLead = existingLead;
    if (Object.keys(updateData).length > 0) {
      updatedLead = await prisma.lead.update({
        where: { id },
        data: updateData,
        include: { broker: { select: { fullName: true } } },
      });
    }

    // Handle property links if provided
    if (propertyIds && Array.isArray(propertyIds)) {
      await prisma.leadProperty.deleteMany({ where: { leadId: id } });
      if (propertyIds.length > 0) {
        await prisma.leadProperty.createMany({
          data: propertyIds.map((pid: string) => ({ leadId: id, propertyId: pid })),
        });
      }
    }

    // Notify the broker a lead was assigned to them (shows in their bell instantly).
    if (notifyBrokerId) {
      await prisma.reminder.create({
        data: {
          userId: notifyBrokerId,
          message: `New lead assigned to you: ${updatedLead.name} (${updatedLead.phone})`,
          remindAt: new Date(),
          leadId: id,
        },
      });
    }

    // Record field-level edit history. Owner/Admin edits are pre-acknowledged
    // (no red alert for their own changes); everyone else's edits show red.
    const preSeen = user.role === Role.OWNER || user.role === Role.ADMIN;
    if (changes.length > 0) {
      await prisma.leadHistory.createMany({
        data: changes.map((c) => ({
          leadId: id,
          field: c.field,
          oldValue: c.oldValue,
          newValue: c.newValue,
          editorId: user.id,
          editorName: user.fullName,
          editorRole: user.role,
          seen: preSeen,
        })),
      });

      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "UPDATE_LEAD",
          details: JSON.stringify({ leadId: id, changes }),
        },
      });
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (err) {
    console.error("PUT Lead detail Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    // Only Owner and Admin can delete leads
    if (user.role !== Role.OWNER && user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Forbidden: Only Admin or Owner can delete" }, { status: 403 });
    }

    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // ?hard=1 (Owner only) permanently removes; otherwise soft-delete (archive),
    // which is reversible — protects against accidental data loss.
    const hard = new URL(req.url).searchParams.get("hard") === "1" && user.role === Role.OWNER;

    if (hard) {
      await prisma.lead.delete({ where: { id } });
    } else {
      await prisma.lead.update({ where: { id }, data: { archived: true } });
    }

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: hard ? "DELETE_LEAD" : "ARCHIVE_LEAD",
        details: JSON.stringify({ leadId: id, name: lead.name, phone: lead.phone }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE Lead detail Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
