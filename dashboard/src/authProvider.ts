import { AuthBindings } from "@refinedev/core";
// import jwt from "jsonwebtoken";
import axios from "axios";

export const axiosInstance = axios.create();

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    const {
      data: { status, token },
    } = await axiosInstance.post("http://localhost:5000/signin", {
      email,
      password,
    });
    console.log(status, token);
    if ((username || email) && password && status) {
      localStorage.setItem(TOKEN_KEY, token);
      // if ((username || email) && password) {
      //   localStorage.setItem(TOKEN_KEY, username);
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    // decode the token
    // const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    console.log(process.env.JWT_SECRET);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
