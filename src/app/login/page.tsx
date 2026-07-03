"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { MadeByShapeButton } from "@/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      alert("Invalid credentials. Try any email and any password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black">
      <Navbar />

      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto w-20 h-20  rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20 text-4xl">
              📝
            </div>
            <h1 className="text-5xl font-bold tracking-tighter text-white mb-2">
              Welcome back
            </h1>
            <p className="text-zinc-400 text-lg">
              Sign in to continue to your blog
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-700 rounded-3xl p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-400">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                  className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <MadeByShapeButton className="w-full mt-4">
                <button type="submit" color="#008080" disabled={isLoading}>
                  {isLoading && (
                    <Loader className="animate-spin mr-2" size={20} />
                  )}
                  Sign in
                </button>
              </MadeByShapeButton>
            </form>
          </div>

          {/* Footer Link */}
          <p className="text-center mt-8 text-zinc-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#008080] hover:text-blue-300 font-medium transition-colors"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
