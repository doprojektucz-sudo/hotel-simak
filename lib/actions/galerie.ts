"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getGalerieObrazky(tag?: string) {
  return prisma.galerieObrazek.findMany({
    where: tag ? { tagy: { has: tag } } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function updateObrazekPopis(id: string, popis: string, tagy: string[]) {
  await prisma.galerieObrazek.update({
    where: { id },
    data: { popis, tagy },
  });
  revalidatePath("/admin/galerie");
}
