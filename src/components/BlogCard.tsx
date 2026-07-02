"use client";

import Link from "next/link";
import { Post } from "../types/post";
import { Edit, Trash2 } from "lucide-react";

interface BlogCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

export default function BlogCard({ post, onDelete }: BlogCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <Link
          href={`/edit/${post.id}`}
          className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
        >
          {post.title}
        </Link>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/edit/${post.id}`}
            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={() => onDelete(post.id)}
            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 text-[15px]">
        {post.body}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-2">
        <span>By User {post.userId}</span>
        <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
        <span>Just now</span>
      </div>
    </div>
  );
}
