import { Post } from "../types/post";

const API_BASE = "https://jsonplaceholder.typicode.com";

export const api = {
  login: async (email: string, password: string) => {
    // Mock login
    const response = await fetch(`${API_BASE}/users/1`);
    const user = await response.json();
    const token = "mock-jwt-token-" + Date.now();
    return { ...user, token, email };
  },

  register: async (username: string, email: string, password: string) => {
    // Mock register
    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      body: JSON.stringify({ username, email }),
      headers: { "Content-Type": "application/json" },
    });
    const user = await response.json();
    const token = "mock-jwt-token-" + Date.now();
    return { ...user, token, username, email };
  },

  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE}/posts?_limit=20`);
    return response.json();
  },

  createPost: async (post: Omit<Post, "id">): Promise<Post> => {
    const response = await fetch(`${API_BASE}/posts`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },

  deletePost: async (id: number): Promise<void> => {
    await fetch(`${API_BASE}/posts/${id}`, { method: "DELETE" });
  },
};
