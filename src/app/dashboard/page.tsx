"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync, deletePostAsync } from "../../redux/postSlice"; // Removed fetchPosts
import { selectPosts } from "../../redux/postSlice";
import Navbar from "../../components/Navbar";
import BlogCard from "../../components/BlogCard";
import PrivateRoute from "../../components/PrivateRoute";
import Loader from "../../components/Loader";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Post } from "../../types/post";

export default function Dashboard() {
  const dispatch = useDispatch<any>();
  const { posts, loading, error } = useSelector(selectPosts);

  const [isClient, setIsClient] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // No need to fetch from dummy API anymore
  // Posts are loaded from localStorage automatically

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePostAsync(id));
    }
  };

  if (!isClient) {
    return (
      <PrivateRoute>
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
          <Navbar />
          <Loader />
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">
                Your Posts
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your published content
              </p>
            </div>

            <Link
              href="/create"
              className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors"
            >
              <Plus size={20} /> New Post
            </Link>
          </div>

          {loading && <Loader />}

          {error && (
            <div className="text-red-500 p-4 bg-red-50 dark:bg-red-950 rounded-xl mb-6">
              {error}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl">
              <p className="text-xl text-gray-400">No posts yet.</p>
              <Link
                href="/create"
                className="text-blue-600 mt-4 inline-block hover:underline"
              >
                Create your first post →
              </Link>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post: Post) => (
              <BlogCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
