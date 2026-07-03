import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/post";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const loadPosts = (): Post[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("blogPosts");
  return saved ? JSON.parse(saved) : [];
};

const savePosts = (posts: Post[]) => {
  localStorage.setItem("blogPosts", JSON.stringify(posts));
};

const initialState: PostsState = {
  posts: loadPosts(),
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=7",
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
});

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (data: Omit<Post, "id" | "userId">) => ({
    id: Date.now(),
    ...data,
    userId: 1,
  }),
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
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        // Always merge dummy posts if we have less than 5
        if (state.posts.length < 5) {
          const existingIds = new Set(state.posts.map((p) => p.id));
          const newDummyPosts = action.payload.filter(
            (p) => !existingIds.has(p.id),
          );
          state.posts = [...newDummyPosts, ...state.posts];
          savePosts(state.posts);
        }
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        // Don't show error for dummy data
      })

      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        savePosts(state.posts);
        state.loading = false;
      })

      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...action.payload };
          savePosts(state.posts);
        }
      })

      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
        savePosts(state.posts);
      })

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPostAsync.pending, (state) => {
        state.loading = true;
      });
  },
});

export const selectPosts = (state: any) => state.posts;
export default postSlice.reducer;
