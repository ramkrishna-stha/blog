"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Post } from "../types/post";

const schema = yup.object({
  title: yup.string().required("Title is required").min(5),
  body: yup.string().required("Content is required").min(20),
});

interface BlogFormProps {
  initialData?: Partial<Post>;
  onSubmit: (data: Omit<Post, "id" | "userId">) => void;
  isLoading?: boolean;
}

export default function BlogForm({
  initialData,
  onSubmit,
  isLoading,
}: BlogFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const submitHandler = (data: any) => {
    onSubmit(data);
    if (!initialData) reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          {...register("title")}
          type="text"
          className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
          placeholder="Post title..."
        />
        {errors.title && (
          <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Content
        </label>
        <textarea
          {...register("body")}
          rows={12}
          className="w-full px-5 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 resize-y text-[15px] leading-relaxed"
          placeholder="Write your thoughts here..."
        />
        {errors.body && (
          <p className="mt-1 text-red-500 text-sm">{errors.body.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:brightness-105 transition-all disabled:opacity-70 text-lg"
      >
        {isLoading ? "Saving..." : initialData ? "Update Post" : "Publish Post"}
      </button>
    </form>
  );
}
