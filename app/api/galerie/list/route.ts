import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const obrazky = await prisma.galerieObrazek.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(obrazky);
}
