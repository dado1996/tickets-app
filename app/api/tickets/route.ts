import { auth0 } from "@/lib/auth0";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth0.getSession();

  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const data = await request.json();

  const ticket = await prisma.ticket.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      status: "OPEN",
      priority: data.priority,
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}

export async function GET() {
  const session = await auth0.getSession();

  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const tickets = await prisma.ticket.findMany();
  return NextResponse.json(tickets);
}
