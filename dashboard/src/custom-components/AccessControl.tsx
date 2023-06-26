import { useGetIdentity } from "@refinedev/core";
import axios from "axios";
import jwt_decode from "jwt-decode";

type IUser = {
  id: number;
  name: string;
  role: string;
  roleSlug: string;
  username: string;
  lastname: string;
  firstname: string;
  avatar: string;
};

// Get token from local storage
const token = localStorage.getItem("refine-auth");
console.log("token: ", token);

const key = import.meta.env.VITE_JWT_SECRET;

const decoded: { id: string; iat: number; exp: number } = jwt_decode(
  token,
  key
);

const userId = decoded.id;
console.log("decoded: ", userId);

const apiUrl = import.meta.env.VITE_BACKEND_PROD;
console.log("apiUrl: ", apiUrl);

const result = await axios.get(apiUrl + "/users/" + userId, {});
let user = result.data;

const roleResult = await axios.get(apiUrl + "/user_roles/" + user.role, {});
const role = roleResult.data;

user.roleSlug = role.slug;

console.log(roleResult);

export function Connected({ children }) {
  const { data: user } = useGetIdentity<IUser>();

  if (user) {
    return <>{children}</>;
  }

  return null;
}

export function AdminOrContributor({ children }) {
  const { data: user } = useGetIdentity<IUser>();

  if (user.roleSlug === "admin" || user.roleSlug === "contributor") {
    return <>{children}</>;
  }

  return null;
}
