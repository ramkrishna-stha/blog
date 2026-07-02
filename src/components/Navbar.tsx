"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-purple-600">
          Blogify
        </Link>
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/create"
                className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700"
              >
                New Post
              </Link>
              <span>{user?.name}</span>
              <button
                onClick={() => dispatch(logout())}
                className="text-red-500"
              >
                <LogOut />
              </button>
            </>
          ) : (
            <Link href="/login" className="font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
