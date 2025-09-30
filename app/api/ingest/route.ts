import { TicketPriority, TicketStatus, TicketType } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.INGEST_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch("data/tickets.json");
    const tickets = await response.json();

    let count = 0;
    for (const ticket of tickets) {
      const status = normalizeStatus(ticket.status);
      const resolvedAt =
        status === TicketStatus.RESOLVED || status === TicketStatus.CLOSED
          ? new Date()
          : null;

      await prisma.ticket.upsert({
        where: {
          externalId: ticket.id,
        },
        create: {
          externalId: ticket.id,
          title: ticket.title,
          description: ticket.details,
          type: normalizeType(ticket.category),
          priority: normalizePriority(ticket.urgency),
          status,
          resolvedAt,
          createdAt: new Date(ticket.created_date),
        },
        update: {
          status,
          resolvedAt,
        },
      });
      count++;
    }
    console.log(`Ingested ${count} tickets succesfully`);
  } catch (error) {
    console.error("Error when ingesting: ", error);
    return NextResponse.json(
      { success: false, error: "Ingestion failed" },
      { status: 500 }
    );
  }
}

const normalizeStatus = (status: string): TicketStatus => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("progress")) return TicketStatus.IN_PROGRESS;
  if (statusLower.includes("resolved")) return TicketStatus.RESOLVED;
  if (statusLower.includes("closed")) return TicketStatus.CLOSED;
  return TicketStatus.OPEN;
};

const normalizeType = (type: string): TicketType => {
  const typeLower = type.toLowerCase();
  if (typeLower.includes("feature")) return TicketType.FEATURE;
  if (typeLower.includes("question")) return TicketType.QUESTION;
  return TicketType.BUG;
};

const normalizePriority = (priority: string): TicketPriority => {
  const priorityLower = priority.toLowerCase();
  if (priorityLower.includes("low")) return TicketPriority.LOW;
  if (priorityLower.includes("high")) return TicketPriority.HIGH;
  return TicketPriority.MEDIUM;
};
