"use client";

import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
          >
            📝 Blogify
          </Link>
          {isAuthenticated && (
            <div className="flex gap-6 text-sm">
              <Link
                href="/dashboard"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/create"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                New Post
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <User size={18} />
                <span>{user?.username || user?.email}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
