import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../types/post";
import { api } from "../services/api";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await api.getPosts();
});

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (post: Omit<Post, "id">) => {
    return await api.createPost(post);
  },
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async ({ id, ...post }: { id: number } & Partial<Post>) => {
    return await api.updatePost(id, post);
  },
);

export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await api.deletePost(id);
    return id;
  },
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setPosts } = postSlice.actions;
export const selectPosts = (state: any) => state.posts;

export default postSlice.reducer; // ← This was missing!
