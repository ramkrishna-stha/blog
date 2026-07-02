"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { fetchPosts, updatePostAsync } from "../../../redux/postSlice";
import { selectPosts } from "../../../redux/postSlice";
import Navbar from "../../../components/Navbar";
import BlogForm from "../../../components/BlogForm";
import PrivateRoute from "../../../components/PrivateRoute";
import Loader from "../../../components/Loader";

export default function EditPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { posts, loading } = useSelector(selectPosts);
  const [post, setPost] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    const foundPost = posts.find((p: any) => p.id === id);
    if (foundPost) setPost(foundPost);
  }, [posts, id]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await dispatch(updatePostAsync({ id, ...data })).unwrap();
      router.push("/dashboard");
    } catch (error) {
      alert("Failed to update post");
    }
    setIsSubmitting(false);
  };

  if (loading && !post) return <Loader />;

  if (!post) {
    return (
      <PrivateRoute>
        <div>Post not found</div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-10">
            <h1 className="text-4xl font-semibold tracking-tight mb-2">
              Edit Post
            </h1>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 border border-gray-100 dark:border-gray-800">
            <BlogForm
              initialData={post}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
