import { createSlice } from "@reduxjs/toolkit";
import profilePicHolder from "../components/icons/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.png";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    profilePic: profilePicHolder,
    userName: "",
    email: "",
    phoneNumber: "",
    age: "",
  },
  reducers: {
    setProfilePic(state, action) {
      state.profilePic = action.payload;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
  },
});
export const userActions = userSlice.actions;
