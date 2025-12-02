import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "./prisma";

const secretKey = process.env.AUTH_SECRET || "your-secret-key-change-in-production";
const key = new TextEncoder().encode(secretKey);

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  isAdmin: boolean;
  expiresAt: Date;
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, isAdmin: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const session: SessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    expiresAt,
  };

  const encryptedSession = await encrypt(session);

  const cookieStore = await cookies();
  cookieStore.set("session", encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie?.value) {
    return null;
  }

  const session = await decrypt(sessionCookie.value);

  if (!session || new Date(session.expiresAt) < new Date()) {
    return null;
  }

  return session;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  if (!session.isAdmin) {
    throw new Error("Not authorized");
  }

  return session;
}
