"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  SablonaTyp, KategorieBrozury, StavBrozury,
  FormatTisku, OrientaceTisku, LayoutTyp, TemaTyp,
} from "@prisma/client";

export interface BrozuraFormState {
  success?: boolean;
  error?: string;
  id?: string;
}

function parseData(formData: FormData) {
  const s = (key: string) => (formData.get(key) as string) || null;
  const r = (key: string) => formData.get(key) as string;
  const b = (key: string) => formData.get(key) === "true";

  return {
    nazev:           r("nazev"),
    sablona:         r("sablona") as SablonaTyp,
    kategorie:       r("kategorie") as KategorieBrozury,
    format:          r("format") as FormatTisku,
    orientace:       (r("orientace") || "PORTRAIT") as OrientaceTisku,
    layout:          (r("layout") || "KLASICKY") as LayoutTyp,
    tema:            (r("tema") || "TMAVE") as TemaTyp,
    barvaPozadi:     r("barvaPozadi") || "#1c1008",
    barvaText:       r("barvaText") || "#fdf6e3",
    barvaAkcentu:    r("barvaAkcentu") || "#c9a547",
    zobrazitLogo:    b("zobrazitLogo"),
    zobrazitPaticku: b("zobrazitPaticku"),
    nadpis:          r("nadpis"),
    podnadpis:       s("podnadpis"),
    popis:           s("popis"),
    datum:           s("datum"),
    cas:             s("cas"),
    misto:           s("misto"),
    cena:            s("cena"),
    kontakt:         s("kontakt"),
    web:             s("web"),
    fotoUrl:         s("fotoUrl"),
    mapUrl:          s("mapUrl"),
    tagy:            s("tagy")
      ? (formData.get("tagy") as string).split(",").map(t => t.trim()).filter(Boolean)
      : [],
  };
}

export async function createBrozura(
  prevState: BrozuraFormState,
  formData: FormData
): Promise<BrozuraFormState> {
  try {
    const brozura = await prisma.brozura.create({ data: parseData(formData) });
    revalidatePath("/admin/brozury");
    return { success: true, id: brozura.id };
  } catch (err) {
    console.error(err);
    return { error: "Nepodařilo se vytvořit brožuru." };
  }
}

export async function updateBrozura(
  id: string,
  prevState: BrozuraFormState,
  formData: FormData
): Promise<BrozuraFormState> {
  try {
    const stav = formData.get("stav") as StavBrozury | null;
    await prisma.brozura.update({
      where: { id },
      data: { ...parseData(formData), ...(stav && { stav }) },
    });
    revalidatePath("/admin/brozury");
    revalidatePath(`/admin/brozury/${id}`);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Nepodařilo se uložit změny." };
  }
}

export async function deleteBrozura(id: string): Promise<BrozuraFormState> {
  try {
    await prisma.brozura.delete({ where: { id } });
    revalidatePath("/admin/brozury");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Nepodařilo se smazat brožuru." };
  }
}

export async function archivujBrozuru(id: string): Promise<BrozuraFormState> {
  try {
    await prisma.brozura.update({ where: { id }, data: { stav: "ARCHIV" } });
    revalidatePath("/admin/brozury");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Nepodařilo se archivovat brožuru." };
  }
}

export async function getBrozury(kategorie?: KategorieBrozury, stav?: StavBrozury) {
  return prisma.brozura.findMany({
    where: {
      ...(kategorie && { kategorie }),
      ...(stav && { stav }),
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getBrozura(id: string) {
  return prisma.brozura.findUnique({ where: { id } });
}
