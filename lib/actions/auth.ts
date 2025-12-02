"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession, getSession } from "@/lib/auth";

export interface LoginFormState {
  error?: string;
  success?: boolean;
}

export async function login(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Vyplňte email a heslo" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return { error: "Neplatné přihlašovací údaje" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { error: "Neplatné přihlašovací údaje" };
    }

    if (!user.isAdmin) {
      return { error: "Nemáte oprávnění pro přístup do administrace" };
    }

    await createSession(user.id);
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Nastala chyba při přihlašování" };
  }

  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}

export async function getCurrentUser() {
  const session = await getSession();
  
  if (!session) {
    return null;
  }

  return {
    id: session.userId,
    email: session.email,
    name: session.name,
    isAdmin: session.isAdmin,
  };
}
