"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Loader } from "lucide-react";
import { MadeByShapeButton } from "@/ui/Button";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(username, email, password);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black">
      <Navbar />

      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            {/* <div className="mx-auto w-20 h-20 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-violet-500/20 text-4xl">
              ✨
            </div> */}
            <h1 className="text-5xl font-bold tracking-tighter text-white mb-2">
              Create account
            </h1>
            <p className="text-zinc-400 text-lg">
              Join the community and start blogging
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-700 rounded-3xl p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-400">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  placeholder="johndoe"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-400">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-400">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <MadeByShapeButton className="w-full mt-6">
                <button
                  onClick={handleSubmit}
                  color="#008080"
                  disabled={isLoading}
                >
                  {" "}
                  {isLoading && (
                    <Loader className="animate-spin mr-2" size={20} />
                  )}
                  Create account
                </button>
                x
              </MadeByShapeButton>
            </form>
          </div>

          {/* Footer Link */}
          <p className="text-center mt-8 text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#008080] hover:text-violet-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
