"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, X } from "lucide-react";
import { Post } from "../types/post";

interface BlogCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

export default function BlogCard({ post, onDelete }: BlogCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer active:scale-[0.985]"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold leading-tight text-white pr-4 line-clamp-2">
              {post.title}
            </h3>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Link
                href={`/edit/${post.id}`}
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-950 rounded-xl transition-colors"
              >
                <Edit2 size={18} />
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(post.id);
                }}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-950 rounded-xl transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div
            className="prose dark:prose-invert text-gray-600 dark:text-gray-400 line-clamp-4 text-[15px] leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <div className="flex items-center justify-between text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <span>By User 1</span>
            <span>Just now</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b text-white border-gray-200 dark:border-zinc-700 px-8 py-5">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] text-white overflow-y-auto prose dark:prose-invert max-w-none text-[15.5px] leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>

            <div className="border-t border-gray-200 dark:border-zinc-700 px-8 py-5 flex justify-between items-center text-sm text-gray-500">
              <span>By User 1 • Just now</span>
              <div className="flex gap-3">
                <Link
                  href={`/edit/${post.id}`}
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center gap-2 px-5 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-2xl"
                >
                  <Edit2 size={18} /> Edit
                </Link>
                <button
                  onClick={() => {
                    onDelete(post.id);
                    setIsModalOpen(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-2xl"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
