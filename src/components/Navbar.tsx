"use client";

import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold text-white flex items-center gap-2 hover:scale-105 transition-transform"
          >
            📝 <span className="tracking-tight">Blogify</span>
          </Link>

          {/* <div className="hidden md:flex items-center gap-10">
            {isAuthenticated && (
              <div className="flex items-center gap-8 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/create"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  New Post
                </Link>
              </div>
            )}
          </div> */}

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-2xl">
                  <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                    <User size={18} className="text-zinc-400" />
                  </div>
                  <div className="text-sm">
                    <p className="text-white font-medium">
                      {user?.username || user?.email?.split("@")[0]}
                    </p>
                    <p className="text-zinc-500 text-xs">Online</p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm text-red-400 hover:bg-red-950/50 rounded-2xl transition-all hover:text-red-300"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-all text-sm"
              >
                Sign in
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pt-6 border-t border-zinc-800">
            {isAuthenticated && (
              <div className="flex flex-col gap-6 text-lg">
                <Link
                  href="/dashboard"
                  className="text-zinc-300 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/create"
                  className="text-zinc-300 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New Post
                </Link>

                <div className="pt-4 border-t border-zinc-800">
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-red-400 hover:text-red-300"
                  >
                    <LogOut size={22} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
