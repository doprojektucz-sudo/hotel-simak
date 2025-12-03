"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export interface DrinkFormState {
  error?: string;
  success?: boolean;
}

// ============ DRINKS ============

export async function createDrink(
  prevState: DrinkFormState,
  formData: FormData
): Promise<DrinkFormState> {
  try {
    await requireAdmin();

    const data = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      price: parseInt(formData.get("price") as string) || 0,
      category: formData.get("category") as string,
      size: (formData.get("size") as string) || null,
      isActive: formData.get("isActive") !== "off",
    };

    if (!data.name || !data.category) {
      return { error: "Vyplňte název a kategorii" };
    }

    // Get max sortOrder for this category
    const maxOrder = await prisma.drink.aggregate({
      where: { category: data.category },
      _max: { sortOrder: true },
    });

    await prisma.drink.create({
      data: {
        ...data,
        sortOrder: (maxOrder._max.sortOrder || 0) + 1,
      },
    });

    revalidatePath("/admin/drinks");
    revalidatePath("/napojovy-listek");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Create drink error:", error);
    return { error: "Nastala chyba při vytváření položky" };
  }
}

export async function updateDrink(
  id: string,
  prevState: DrinkFormState,
  formData: FormData
): Promise<DrinkFormState> {
  try {
    await requireAdmin();

    const data = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      price: parseInt(formData.get("price") as string) || 0,
      category: formData.get("category") as string,
      size: (formData.get("size") as string) || null,
      isActive: formData.get("isActive") !== "off",
    };

    if (!data.name || !data.category) {
      return { error: "Vyplňte název a kategorii" };
    }

    await prisma.drink.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/drinks");
    revalidatePath("/napojovy-listek");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Update drink error:", error);
    return { error: "Nastala chyba při úpravě položky" };
  }
}

export async function deleteDrink(id: string): Promise<DrinkFormState> {
  try {
    await requireAdmin();

    await prisma.drink.delete({
      where: { id },
    });

    revalidatePath("/admin/drinks");
    revalidatePath("/napojovy-listek");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete drink error:", error);
    return { error: "Nastala chyba při mazání položky" };
  }
}

export async function toggleDrinkActive(
  id: string,
  isActive: boolean
): Promise<DrinkFormState> {
  try {
    await requireAdmin();

    await prisma.drink.update({
      where: { id },
      data: { isActive },
    });

    revalidatePath("/admin/drinks");
    revalidatePath("/napojovy-listek");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Toggle drink error:", error);
    return { error: "Nastala chyba" };
  }
}

// ============ DRINK CATEGORIES ============

export async function getDrinkCategories() {
  return prisma.drinkCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function createDrinkCategory(
  prevState: DrinkFormState,
  formData: FormData
): Promise<DrinkFormState> {
  try {
    await requireAdmin();

    const name = formData.get("name") as string;

    if (!name) {
      return { error: "Vyplňte název kategorie" };
    }

    const maxOrder = await prisma.drinkCategory.aggregate({
      _max: { sortOrder: true },
    });

    await prisma.drinkCategory.create({
      data: {
        name,
        sortOrder: (maxOrder._max.sortOrder || 0) + 1,
      },
    });

    revalidatePath("/admin/drinks");
    revalidatePath("/napojovy-listek");

    return { success: true };
  } catch (error) {
    console.error("Create drink category error:", error);
    return { error: "Nastala chyba při vytváření kategorie" };
  }
}

export async function deleteDrinkCategory(
  id: string
): Promise<DrinkFormState> {
  try {
    await requireAdmin();

    // Check if category has items
    const category = await prisma.drinkCategory.findUnique({
      where: { id },
    });

    if (category) {
      const itemCount = await prisma.drink.count({
        where: { category: category.name },
      });

      if (itemCount > 0) {
        return {
          error: `Kategorii nelze smazat - obsahuje ${itemCount} položek`,
        };
      }
    }

    await prisma.drinkCategory.delete({
      where: { id },
    });

    revalidatePath("/admin/drinks");
    revalidatePath("/napojovy-listek");

    return { success: true };
  } catch (error) {
    console.error("Delete drink category error:", error);
    return { error: "Nastala chyba při mazání kategorie" };
  }
}

// ============ GET DATA ============

export async function getDrinks(category?: string) {
  return prisma.drink.findMany({
    where: category
      ? { category, isActive: true }
      : { isActive: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

export async function getAllDrinks() {
  return prisma.drink.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

export async function getDrink(id: string) {
  return prisma.drink.findUnique({
    where: { id },
  });
}

export async function updateDrinkPrice(
  id: string,
  price: number
): Promise<DrinkFormState> {
  try {
    await requireAdmin();

    await prisma.drink.update({
      where: { id },
      data: { price },
    });

    revalidatePath("/admin/drinks");
    revalidatePath("/napojovy-listek");
    revalidatePath("/restaurace");

    return { success: true };
  } catch (error) {
    console.error("Update drink price error:", error);
    return { error: "Nastala chyba při úpravě ceny" };
  }
}