"use client";

import { useEffect } from "react";
import api from "@/services/api";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchPosts, addPost, updatePost, deletePost } from "@/redux/postSlice";

import { CreatePostDto, UpdatePostDto, Post } from "@/types/post";

export default function usePosts() {
  const dispatch = useAppDispatch();

  const { posts, loading, error } = useAppSelector((state) => state.posts);

  /**
   * Load posts when component mounts
   */
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  /**
   * Create Post
   */
  const createPost = async (data: CreatePostDto) => {
    try {
      const response = await api.post("/posts", {
        title: data.title,
        body: data.body,
        userId: 1,
      });

      const newPost: Post = {
        id: response.data.id || Date.now(),
        title: data.title,
        body: data.body,
        userId: 1,
      };

      dispatch(addPost(newPost));

      return {
        success: true,
        post: newPost,
      };
    } catch (err) {
      return {
        success: false,
        message: "Unable to create post.",
      };
    }
  };

  /**
   * Update Post
   */
  const editPost = async (data: UpdatePostDto) => {
    try {
      await api.put(`/posts/${data.id}`, data);

      dispatch(
        updatePost({
          id: data.id,
          title: data.title,
          body: data.body,
          userId: 1,
        }),
      );

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message: "Unable to update post.",
      };
    }
  };

  /**
   * Delete Post
   */
  const removePost = async (id: number) => {
    try {
      await api.delete(`/posts/${id}`);

      dispatch(deletePost(id));

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message: "Unable to delete post.",
      };
    }
  };

  /**
   * Find a post by ID
   */
  const getPostById = (id: number) => {
    return posts.find((post) => post.id === id);
  };

  /**
   * Search posts
   */
  const searchPosts = (keyword: string) => {
    if (!keyword.trim()) return posts;

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(keyword.toLowerCase()) ||
        post.body.toLowerCase().includes(keyword.toLowerCase()),
    );
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
  };
}
