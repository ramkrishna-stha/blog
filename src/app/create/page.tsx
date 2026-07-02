"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostAsync } from "../../redux/postSlice";
import Navbar from "../../components/Navbar";
import BlogForm from "../../components/BlogForm";
import PrivateRoute from "../../components/PrivateRoute";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await dispatch(createPostAsync({ ...data, userId: 1 })).unwrap();
      router.push("/dashboard");
    } catch (error) {
      alert("Failed to create post");
    }
    setIsSubmitting(false);
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
