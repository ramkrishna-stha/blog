// redux/postSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/post";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// Load posts from localStorage
const loadPosts = (): Post[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("blogPosts");
  return saved ? JSON.parse(saved) : [];
};

// Save posts to localStorage
const savePosts = (posts: Post[]) => {
  localStorage.setItem("blogPosts", JSON.stringify(posts));
};

const initialState: PostsState = {
  posts: loadPosts(),
  loading: false,
  error: null,
};

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (data: Omit<Post, "id" | "userId">) => {
    const newPost: Post = {
      id: Date.now(),
      ...data,
      userId: 1,
    };
    return newPost;
  },
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async (data: { id: number; title: string; body: string }) => data,
);

export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => id,
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Post
      .addCase(
        createPostAsync.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.posts.unshift(action.payload); // Show newest first
          savePosts(state.posts);
          state.loading = false;
        },
      )

      // Update Post
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...action.payload };
          savePosts(state.posts);
        }
      })

      // Delete Post
      .addCase(
        deletePostAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.posts = state.posts.filter((p) => p.id !== action.payload);
          savePosts(state.posts);
        },
      )

      .addCase(createPostAsync.pending, (state) => {
        state.loading = true;
      });
  },
});

export const selectPosts = (state: any) => state.posts;
export default postSlice.reducer;
