"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePosts } from "../../hooks/usePosts";
import Navbar from "../../components/Navbar";
import BlogForm from "../../components/BlogForm";
import PrivateRoute from "../../components/PrivateRoute";

export default function CreatePage() {
  const router = useRouter();
  const { createPost } = usePosts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const result = await createPost(data);

      if (result.success) {
        router.push("/dashboard");
      } else {
        console.error("Create post failed:", result);
        alert(result.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-10">
            <h1 className="text-4xl font-semibold tracking-tight mb-2">
              Create New Post
            </h1>
            <p className="text-gray-500">
              Share something amazing with the world
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 border border-gray-100 dark:border-gray-800">
            <BlogForm onSubmit={handleSubmit} isLoading={isSubmitting} />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
