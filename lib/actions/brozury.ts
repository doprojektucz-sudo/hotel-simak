"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  SablonaTyp, KategorieBrozury, StavBrozury,
  FormatTisku, OrientaceTisku, LayoutTyp, TemaTyp, NarocnostTrasy,
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
  const n = (key: string) => {
    const v = formData.get(key);
    return v ? Number(v) : null;
  };

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
    // Cyklotrasa pole
    trasaKm:         n("trasaKm") as number | null,
    trasaNarocnost:  (s("trasaNarocnost") || null) as NarocnostTrasy | null,
    trasaPrevyseni:  n("trasaPrevyseni") as number | null,
    trasaPovrch:     s("trasaPovrch"),
    trasaTyp:        s("trasaTyp"),
    trasaCislo:      n("trasaCislo") as number | null,
    gpxUrl:          s("gpxUrl"),
    mapaTrasyUrl:    s("mapaTrasyUrl"),
    mapaMiniUrl:     s("mapaMiniUrl"),
    tagy:            s("tagy")
      ? (formData.get("tagy") as string).split(",").map(t => t.trim()).filter(Boolean)
      : [],
  };
}

async function saveZastavky(brozuraId: string, zastavkyJson: string) {
  if (!zastavkyJson) return;
  try {
    const zastavky = JSON.parse(zastavkyJson);
    if (!Array.isArray(zastavky)) return;

    // Delete existing and recreate (simplest approach)
    await prisma.zastavka.deleteMany({ where: { brozuraId } });

    if (zastavky.length > 0) {
      await prisma.zastavka.createMany({
        data: zastavky.map((z: any, i: number) => ({
          brozuraId,
          poradi:  z.poradi || i + 1,
          nazev:   z.nazev || "",
          popis:   z.popis || null,
          gps:     z.gps || null,
          fotoUrl: z.fotoUrl || null,
        })),
      });
    }
  } catch (err) {
    console.error("saveZastavky error:", err);
  }
}

export async function createBrozura(
  prevState: BrozuraFormState,
  formData: FormData
): Promise<BrozuraFormState> {
  try {
    const brozura = await prisma.brozura.create({ data: parseData(formData) });
    const zastavkyJson = formData.get("zastavkyJson") as string;
    if (zastavkyJson) await saveZastavky(brozura.id, zastavkyJson);
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
    const zastavkyJson = formData.get("zastavkyJson") as string;
    if (zastavkyJson) await saveZastavky(id, zastavkyJson);
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
  return prisma.brozura.findUnique({
    where: { id },
    include: { zastavky: { orderBy: { poradi: "asc" } } },
  });
}
