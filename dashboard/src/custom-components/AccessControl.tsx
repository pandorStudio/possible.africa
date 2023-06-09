import { RootState } from "../store";
import { useGetIdentity } from "@refinedev/core";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../features/user/userSlice";
import { IUser } from "../features/user/userSlice";

let user: IUser = {
  id: "",
  role: "",
  roleSlug: "",
  username: "",
  lastname: "",
  firstname: "",
  avatar: "",
};

// Get token from local storage
const token = localStorage.getItem("refine-auth");

const apiUrl = import.meta.env.VITE_BACKEND_PROD;

let userId = "";

if (token) {
  // console.log("token: ", token);

  const key = import.meta.env.VITE_JWT_SECRET;

  const decoded: { user: any; iat: number; exp: number } = jwt_decode(
    token,
    key
  );

  userId = decoded.user.id;
  // console.log("apiUrl: ", apiUrl);

  const result = await axios
    .get(apiUrl + "/users/" + userId, {})
    .then((res) => {
      user.id = res.data.id;
      user.role = res.data.role.name;
      user.roleSlug = res.data.role.slug;
      user.username = res.data.username;
      user.lastname = res.data.lastname;
      user.firstname = res.data.firstname;
      user.avatar = res.data.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
}

// export async function InitState() {
//   const dispatch = useDispatch();
//   const result = await axios
//     .get(apiUrl + "/users/" + userId, {})
//     .then((res) => {
//       user.id = res.data.id;
//       user.role = res.data.role.name;
//       user.roleSlug = res.data.role.slug;
//       user.username = res.data.username;
//       user.lastname = res.data.lastname;
//       user.firstname = res.data.firstname;
//       user.avatar = res.data.avatar;

//       dispatch(update(user));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   return null;
// }

export function Connected({ children }) {
  // const dispatch = useDispatch();
  // console.log("userState: ", userState);
  if (user) {
    // dispatch(update(user));
    return <>{children}</>;
  }

  return null;
}

export function AdminOrContributor({ children }) {
  // @ts-ignore
  if (user.roleSlug === "admin" || user.roleSlug === "contributor") {
    return <>{children}</>;
  }

  return null;
}

export function Admin({ children }) {
  // @ts-ignore
  if (user.roleSlug === "admin") {
    return <>{children}</>;
  }

  return null;
}

export function User({ children }) {
  // @ts-ignore
  if (user.roleSlug === "user") {
    return <>{children}</>;
  }

  return null;
}
