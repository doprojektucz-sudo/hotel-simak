"use client";

import { logout } from "@/lib/actions/auth";
import type { SessionPayload } from "@/lib/auth";

interface AdminHeaderProps {
  user: SessionPayload;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm lg:mt-0 mt-14">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Administrace</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="hidden sm:inline">Přihlášen jako </span>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="hidden sm:inline">Odhlásit</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
