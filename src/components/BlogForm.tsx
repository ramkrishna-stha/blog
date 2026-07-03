"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Post } from "../types/post";
import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor"; // Draft.js version
import { MadeByShapeButton } from "@/ui/Button";

const schema = yup
  .object({
    title: yup.string().required("Title is required").min(5),
    body: yup.string().required("Content is required").min(20),
  })
  .required();

interface BlogFormProps {
  initialData?: Partial<Post>;
  onSubmit: (data: Omit<Post, "id" | "userId">) => void;
  isLoading?: boolean;
}

type FormData = yup.InferType<typeof schema>;

export default function BlogForm({
  initialData,
  onSubmit,
  isLoading,
}: BlogFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
  });

  const bodyValue = watch("body");

  const submitHandler = (data: FormData) => {
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
          className="w-full px-5 py-3 bg-zinc-900 dark:bg-white border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
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

        <RichTextEditor
          value={bodyValue}
          onChange={(html) => setValue("body", html, { shouldValidate: true })}
        />

        {errors.body && (
          <p className="mt-1 text-red-500 text-sm">{errors.body.message}</p>
        )}
      </div>

      <MadeByShapeButton className="w-full ">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:brightness-105 transition-all disabled:opacity-70 text-lg"
        >
          {isLoading
            ? "Saving..."
            : initialData
              ? "Update Post"
              : "Publish Post"}
        </button>
      </MadeByShapeButton>
    </form>
  );
}
