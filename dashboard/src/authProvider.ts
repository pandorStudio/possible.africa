import { AuthBindings } from "@refinedev/core";
// import jwt from "jsonwebtoken";
import axios from "axios";
import jwt_decode from "jwt-decode";

const ENV = import.meta.env.VITE_NODE_ENV;
const API_URL =
  ENV === "developement"
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;

export const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    const {
      data: { status, token },
    } = await axiosInstance.post(`${API_URL}/signin`, {
      email,
      password,
    });
    // console.log(status, token);
    if ((username || email) && password && status) {
      localStorage.setItem(TOKEN_KEY, token);
      // if ((username || email) && password) {
      //   localStorage.setItem(TOKEN_KEY, username);
      /*axiosInstance.defaults.headers.common = {
                                Authorization: `Bearer ${token}`,
                              };*/
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
  register: async ({
    email,
    firstname,
    lastname,
    password,
    confirmPassword,
  }) => {
    const {
      data: { status, token, message },
    } = await axiosInstance.post(
      `${API_URL}/signup`,
      {
        password,
        confirmPassword,
        email,
        firstname,
        lastname,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      status
    ) {
      localStorage.setItem(TOKEN_KEY, token);
      /*axiosInstance.defaults.headers.common = {
                                Authorization: `Bearer ${token}`,
                              };*/
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "RegisterError",
        message: "Invalid Informations",
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
  getPermissions: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      const key = import.meta.env.VITE_JWT_SECRET;
      const decoded: { user: any; iat: number; exp: number } = jwt_decode(
        token,
        key
      );
      return [decoded.user.role.slug];
    }
    return null;
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      const key = import.meta.env.VITE_JWT_SECRET;
      const decoded: { user: any; iat: number; exp: number } = jwt_decode(
        token,
        key
      );
      // const { data } = await axiosInstance.get(
      //   `${API_URL}/users/${decoded.user.id}`
      // );
      return {
        id: decoded.user.id,
        role: decoded.user.role.name,
        roleSlug: decoded.user.role.slug,
        username: decoded.user.username,
        lastname: decoded.user.lastname || "",
        firstname: decoded.user.firstname || "",
        avatar: decoded.user.avatar,
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
