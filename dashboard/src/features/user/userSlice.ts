import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "axios";
export interface IUser {
  id: "";
  role: "";
  roleSlug: "";
  username: "";
  lastname: "";
  firstname: "";
  avatar: "";
}

let initialState: IUser = {
  id: "",
  role: "",
  roleSlug: "",
  username: "",
  lastname: "",
  firstname: "",
  avatar: "",
};

// const token = localStorage.getItem("refine-auth");
// if (token) {
//   const key = import.meta.env.VITE_JWT_SECRET;

//   const decoded: { user: any; iat: number; exp: number } = jwt_decode(
//     token,
//     key
//   );
//   console.log('jwt_decode', decoded);

//   if (decoded) {
//     const userId = decoded.user.id;
//     if (userId) {
//       const apiUrl = import.meta.env.VITE_BACKEND_PROD;

//       const result = await axios
//         .get(apiUrl + "/users/" + userId, {})
//         .then((res) => {
//           initialState.id = res.data.id;
//           initialState.role = res.data.role.name;
//           initialState.roleSlug = res.data.role.slug;
//           initialState.username = res.data.username;
//           initialState.lastname = res.data.lastname;
//           initialState.firstname = res.data.firstname;
//           initialState.avatar = res.data.avatar;
//           // console.log("userSlice", initialState);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }
// }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IUser>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = { ...action.payload };
    },
    cleanState: (state) => { 
      state = initialState;
    },
  },
});

export const { update, cleanState } = userSlice.actions;

export default userSlice.reducer;
