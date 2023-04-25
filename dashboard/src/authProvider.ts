import { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";

const mockUsers = [
  {
    email: "john@mail.com",
    password: "iuhfiuqhewufhw",
    remenber: true,
    token: "ezfieqbiqueufhquhewudw",
    role: ["admin"],
  },
  {
    email: "jane@mail.com",
    password: "uzgf3uiwqgwhre",
    remenber: true,
    token: "ouewzgiuqhwofhqwhfuqhw",
    role: ["editor"],
  },
];

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    const user = mockUsers.find((item) => {
      return item.email === email && item.password === password;
    });

    if ((username || email) && password && user) {
      localStorage.setItem(TOKEN_KEY, username);
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
  register: async ({ email, password }) => {
    const user = mockUsers.find((user) => user.email === email);

    if (user) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "User already exists",
        },
      };
    }

    mockUsers.push({
      email,
      password,
      remenber: true,
      token: "iugeigqufguwqgufguw",
      role: ["editor"],
    });

    return {
      success: true,
      redirectTo: "/login",
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
