// // hooks/usePosts.ts
// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createPostAsync,
//   updatePostAsync,
//   deletePostAsync,
// } from "../redux/postSlice";
// import { selectPosts } from "../redux/postSlice";
// import { Post } from "../types/post";

// export const usePosts = () => {
//   const dispatch = useDispatch<any>();
//   const { posts, loading, error } = useSelector(selectPosts);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const createPost = async (data: Omit<Post, "id" | "userId">) => {
//     try {
//       const result = await dispatch(createPostAsync(data)).unwrap();
//       return { success: true, post: result };
//     } catch (err: any) {
//       console.error("Create error:", err);
//       return { success: false, message: "Failed to create post" };
//     }
//   };

//   const editPost = async (data: {
//     id: number;
//     title: string;
//     body: string;
//   }) => {
//     try {
//       await dispatch(updatePostAsync(data)).unwrap();
//       return { success: true };
//     } catch (err) {
//       return { success: false, message: "Failed to update" };
//     }
//   };

//   const removePost = async (id: number) => {
//     try {
//       await dispatch(deletePostAsync(id)).unwrap();
//       return { success: true };
//     } catch (err) {
//       return { success: false, message: "Failed to delete" };
//     }
//   };

//   const getPostById = (id: number): Post | undefined => {
//     return posts.find((post: Post) => post.id === id);
//   };

//   const searchPosts = (keyword: string): Post[] => {
//     if (!keyword?.trim()) return posts;
//     const lower = keyword.toLowerCase();
//     return posts.filter(
//       (p: Post) =>
//         p.title.toLowerCase().includes(lower) ||
//         p.body.toLowerCase().includes(lower),
//     );
//   };

//   return {
//     posts,
//     loading,
//     error,
//     createPost,
//     editPost,
//     removePost,
//     getPostById,
//     searchPosts,
//   };
// };

// hooks/usePosts.ts
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  createPostAsync,
  updatePostAsync,
  deletePostAsync,
} from "../redux/postSlice";
import { selectPosts } from "../redux/postSlice";
import { Post } from "../types/post";

export const usePosts = () => {
  const dispatch = useDispatch<any>();
  const { posts, loading, error } = useSelector(selectPosts);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch initial posts
  useEffect(() => {
    if (isClient && posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, isClient, posts.length]);

  const createPost = async (data: Omit<Post, "id" | "userId">) => {
    try {
      const result = await dispatch(createPostAsync(data)).unwrap();
      return {
        success: true,
        post: result,
      };
    } catch (err: any) {
      console.error("Create post error:", err);
      return {
        success: false,
        message: err.message || "Failed to create post",
      };
    }
  };

  const editPost = async (data: {
    id: number;
    title: string;
    body: string; // This will be HTML from rich editor
  }) => {
    try {
      await dispatch(updatePostAsync(data)).unwrap();
      return { success: true };
    } catch (err: any) {
      console.error("Update post error:", err);
      return {
        success: false,
        message: err.message || "Failed to update post",
      };
    }
  };

  const removePost = async (id: number) => {
    try {
      await dispatch(deletePostAsync(id)).unwrap();
      return { success: true };
    } catch (err: any) {
      console.error("Delete post error:", err);
      return {
        success: false,
        message: err.message || "Failed to delete post",
      };
    }
  };

  const getPostById = (id: number): Post | undefined => {
    return posts.find((post: Post) => post.id === id);
  };

  const searchPosts = (keyword: string): Post[] => {
    if (!keyword?.trim()) return posts;
    const lower = keyword.toLowerCase();
    return posts.filter(
      (p: Post) =>
        p.title.toLowerCase().includes(lower) ||
        (p.body && p.body.toLowerCase().includes(lower)),
    );
  };

  // Optional: Get posts with rich content preview
  const getPreviewPosts = (limit = 5) => {
    return posts.slice(0, limit).map((post: Post) => ({
      ...post,
      preview: post.body
        ? post.body.replace(/<[^>]+>/g, " ").slice(0, 150) + "..."
        : "",
    }));
  };

  return {
    posts,
    loading,
    error,
    createPost,
    editPost,
    removePost,
    getPostById,
    searchPosts,
    getPreviewPosts, // New helper for rich content
  };
};
