// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createPostAsync, deletePostAsync } from "../../redux/postSlice"; // Removed fetchPosts
// import { selectPosts } from "../../redux/postSlice";
// import Navbar from "../../components/Navbar";
// import BlogCard from "../../components/BlogCard";
// import PrivateRoute from "../../components/PrivateRoute";
// import Loader from "../../components/Loader";
// import Link from "next/link";
// import { Plus } from "lucide-react";
// import { Post } from "../../types/post";

// export default function Dashboard() {
//   const dispatch = useDispatch<any>();
//   const { posts, loading, error } = useSelector(selectPosts);

//   const [isClient, setIsClient] = useState(false);

//   // Prevent hydration issues
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // No need to fetch from dummy API anymore
//   // Posts are loaded from localStorage automatically

//   const handleDelete = (id: number) => {
//     if (confirm("Are you sure you want to delete this post?")) {
//       dispatch(deletePostAsync(id));
//     }
//   };

//   if (!isClient) {
//     return (
//       <PrivateRoute>
//         <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
//           <Navbar />
//           <Loader />
//         </div>
//       </PrivateRoute>
//     );
//   }

//   return (
//     <PrivateRoute>
//       <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
//         <Navbar />

//         <div className="max-w-6xl mx-auto px-6 py-10">
//           <div className="flex justify-between items-end mb-10">
//             <div>
//               <h1 className="text-4xl font-semibold tracking-tight">
//                 Your Posts
//               </h1>
//               <p className="text-gray-500 mt-1">
//                 Manage your published content
//               </p>
//             </div>

//             <Link
//               href="/create"
//               className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors"
//             >
//               <Plus size={20} /> New Post
//             </Link>
//           </div>

//           {loading && <Loader />}

//           {error && (
//             <div className="text-red-500 p-4 bg-red-50 dark:bg-red-950 rounded-xl mb-6">
//               {error}
//             </div>
//           )}

//           {!loading && posts.length === 0 && (
//             <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl">
//               <p className="text-xl text-gray-400">No posts yet.</p>
//               <Link
//                 href="/create"
//                 className="text-blue-600 mt-4 inline-block hover:underline"
//               >
//                 Create your first post →
//               </Link>
//             </div>
//           )}

//           <div className="grid md:grid-cols-2 gap-6">
//             {posts.map((post: Post) => (
//               <BlogCard key={post.id} post={post} onDelete={handleDelete} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </PrivateRoute>
//   );
// }
"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePostAsync } from "../../redux/postSlice";
import { selectPosts } from "../../redux/postSlice";
import Navbar from "../../components/Navbar";
import BlogCard from "../../components/BlogCard";
import PrivateRoute from "../../components/PrivateRoute";
import Loader from "../../components/Loader";
import Link from "next/link";
import { Plus, Search, X } from "lucide-react";
import { Post } from "../../types/post";

const ITEMS_PER_PAGE = 6;

export default function Dashboard() {
  const dispatch = useDispatch<any>();
  const { posts, loading, error } = useSelector(selectPosts);

  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, isClient, posts.length]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;

    const lowerSearch = searchTerm.toLowerCase();
    return posts.filter(
      (post: Post) =>
        post.title.toLowerCase().includes(lowerSearch) ||
        post.body.toLowerCase().includes(lowerSearch),
    );
  }, [posts, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePostAsync(id));
    }
  };

  const clearSearch = () => setSearchTerm("");

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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-semibold text-white tracking-tight">
                Your Posts
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your published content
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                href="/create"
                className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors whitespace-nowrap"
              >
                <Plus size={20} /> New Post
              </Link>

              <div className="relative flex-1 min-w-70">
                <Search
                  className="absolute left-4 top-3.5 "
                  color="#008080"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-white text-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-blue-500 placeholder:text-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {loading && <Loader />}

          {error && (
            <div className="text-red-500 p-4 bg-red-50 dark:bg-red-950 rounded-xl mb-6">
              {error}
            </div>
          )}

          {filteredPosts.length === 0 && !loading && (
            <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl">
              <p className="text-xl text-gray-400">
                {searchTerm ? "No matching posts found." : "No posts yet."}
              </p>
              {!searchTerm && (
                <Link
                  href="/create"
                  className="text-blue-600 mt-4 inline-block hover:underline"
                >
                  Create your first post →
                </Link>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {paginatedPosts.map((post: Post) => (
              <BlogCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 border rounded-xl disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Previous
              </button>

              <span className="text-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="px-6 py-3 border rounded-xl disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}
