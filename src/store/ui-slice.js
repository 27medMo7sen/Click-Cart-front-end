import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: localStorage.getItem("dark") === "true" ? true : false,
    cartIsVisible: false,
  },
  reducers: {
    toggle(state) {
      state.darkMode = !state.darkMode;
    },
    showCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
