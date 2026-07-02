"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, selectAuth } from "../redux/authSlice";
import { api } from "../services/api";
import { useRouter } from "next/navigation";
import { User } from "../types/post";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const userData = await api.login(email, password);
      dispatch(loginSuccess(userData));
      return userData;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      const userData = await api.register(username, email, password);
      dispatch(loginSuccess(userData));
      return userData;
    } catch (error) {
      console.error("Register failed", error);
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("token");
    if (token && !auth.isAuthenticated) {
      // Mock user from token
      const mockUser: User = {
        id: 1,
        username: "user",
        email: "user@example.com",
        token,
      };
      dispatch(loginSuccess(mockUser));
    }
  }, [dispatch, auth.isAuthenticated]);

  return {
    ...auth,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
