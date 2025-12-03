"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export interface MenuItemFormState {
  error?: string;
  success?: boolean;
}

// ============ MENU ITEMS ============

export async function createMenuItem(
  prevState: MenuItemFormState,
  formData: FormData
): Promise<MenuItemFormState> {
  try {
    await requireAdmin();

    const data = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      price: parseInt(formData.get("price") as string) || 0,
      category: formData.get("category") as string,
      weight: (formData.get("weight") as string) || null,
      allergens: (formData.get("allergens") as string) || null,
      note: (formData.get("note") as string) || null,
      isVegetarian: formData.get("isVegetarian") === "on",
      isActive: formData.get("isActive") !== "off",
    };

    if (!data.name || !data.category) {
      return { error: "Vyplňte název a kategorii" };
    }

    // Get max sortOrder for this category
    const maxOrder = await prisma.menuItem.aggregate({
      where: { category: data.category },
      _max: { sortOrder: true },
    });

    await prisma.menuItem.create({
      data: {
        ...data,
        sortOrder: (maxOrder._max.sortOrder || 0) + 1,
      },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Create menu item error:", error);
    return { error: "Nastala chyba při vytváření položky" };
  }
}

export async function updateMenuItem(
  id: string,
  prevState: MenuItemFormState,
  formData: FormData
): Promise<MenuItemFormState> {
  try {
    await requireAdmin();

    const data = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      price: parseInt(formData.get("price") as string) || 0,
      category: formData.get("category") as string,
      weight: (formData.get("weight") as string) || null,
      allergens: (formData.get("allergens") as string) || null,
      note: (formData.get("note") as string) || null,
      isVegetarian: formData.get("isVegetarian") === "on",
      isActive: formData.get("isActive") !== "off",
    };

    if (!data.name || !data.category) {
      return { error: "Vyplňte název a kategorii" };
    }

    await prisma.menuItem.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Update menu item error:", error);
    return { error: "Nastala chyba při úpravě položky" };
  }
}

export async function deleteMenuItem(id: string): Promise<MenuItemFormState> {
  try {
    await requireAdmin();

    await prisma.menuItem.delete({
      where: { id },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete menu item error:", error);
    return { error: "Nastala chyba při mazání položky" };
  }
}

export async function toggleMenuItemActive(
  id: string,
  isActive: boolean
): Promise<MenuItemFormState> {
  try {
    await requireAdmin();

    await prisma.menuItem.update({
      where: { id },
      data: { isActive },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Toggle menu item error:", error);
    return { error: "Nastala chyba" };
  }
}

// ============ MENU CATEGORIES ============

export async function getMenuCategories() {
  return prisma.menuCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function createMenuCategory(
  prevState: MenuItemFormState,
  formData: FormData
): Promise<MenuItemFormState> {
  try {
    await requireAdmin();

    const name = formData.get("name") as string;

    if (!name) {
      return { error: "Vyplňte název kategorie" };
    }

    const maxOrder = await prisma.menuCategory.aggregate({
      _max: { sortOrder: true },
    });

    await prisma.menuCategory.create({
      data: {
        name,
        sortOrder: (maxOrder._max.sortOrder || 0) + 1,
      },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");

    return { success: true };
  } catch (error) {
    console.error("Create menu category error:", error);
    return { error: "Nastala chyba při vytváření kategorie" };
  }
}

export async function deleteMenuCategory(
  id: string
): Promise<MenuItemFormState> {
  try {
    await requireAdmin();

    // Check if category has items
    const category = await prisma.menuCategory.findUnique({
      where: { id },
    });

    if (category) {
      const itemCount = await prisma.menuItem.count({
        where: { category: category.name },
      });

      if (itemCount > 0) {
        return {
          error: `Kategorii nelze smazat - obsahuje ${itemCount} položek`,
        };
      }
    }

    await prisma.menuCategory.delete({
      where: { id },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");

    return { success: true };
  } catch (error) {
    console.error("Delete menu category error:", error);
    return { error: "Nastala chyba při mazání kategorie" };
  }
}

// ============ GET DATA ============

export async function getMenuItems(category?: string) {
  return prisma.menuItem.findMany({
    where: category
      ? { category, isActive: true }
      : { isActive: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

export async function getAllMenuItems() {
  return prisma.menuItem.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

export async function getMenuItem(id: string) {
  return prisma.menuItem.findUnique({
    where: { id },
  });
}

export async function updateMenuItemPrice(
  id: string,
  price: number
): Promise<MenuItemFormState> {
  try {
    await requireAdmin();

    await prisma.menuItem.update({
      where: { id },
      data: { price },
    });

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
    revalidatePath("/restaurace");

    return { success: true };
  } catch (error) {
    console.error("Update menu item price error:", error);
    return { error: "Nastala chyba při úpravě ceny" };
  }
}