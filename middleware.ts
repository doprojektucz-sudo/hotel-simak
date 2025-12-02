import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("session");

    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const session = await decrypt(sessionCookie.value);

      if (!session || !session.isAdmin) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      if (new Date(session.expiresAt) < new Date()) {
        const response = NextResponse.redirect(
          new URL("/admin/login", request.url)
        );
        response.cookies.delete("session");
        return response;
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect logged in users from login page to admin
  if (pathname === "/admin/login") {
    const sessionCookie = request.cookies.get("session");

    if (sessionCookie?.value) {
      try {
        const session = await decrypt(sessionCookie.value);

        if (session?.isAdmin && new Date(session.expiresAt) > new Date()) {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch {
        // Invalid session, let them access login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
