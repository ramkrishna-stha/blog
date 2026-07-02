"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { updatePostAsync } from "../../../redux/postSlice"; // ← Removed fetchPosts
import Navbar from "../../../components/Navbar";
import PrivateRoute from "../../../components/PrivateRoute";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<any>();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);

  // Load post data from localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    const post = savedPosts.find((p: any) => p.id === Number(id));

    if (post) {
      setFormData({
        title: post.title,
        body: post.body,
      });
    } else {
      router.push("/dashboard");
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(
        updatePostAsync({
          id: Number(id),
          title: formData.title,
          body: formData.body,
        }),
      ).unwrap();

      router.push("/dashboard");
    } catch (err) {
      alert("Failed to update post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-semibold mb-8">Edit Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Content</label>
              <textarea
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="flex-1 py-3 border border-gray-300 rounded-2xl font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}
