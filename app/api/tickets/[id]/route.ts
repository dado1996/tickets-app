import { auth0 } from "@/lib/auth0";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const session = await auth0.getSession();

  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const { status } = await request.json();

  await prisma.ticket.update({
    data: {
      status,
    },
    where: {
      id: Number(params.slug),
    },
  });

  return NextResponse.json({ success: true }, { status: 202 });
}
