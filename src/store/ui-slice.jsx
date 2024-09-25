import { createSlice } from "@reduxjs/toolkit";
import { SideModal } from "../UI/Modal";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: localStorage.getItem("dark") === "true" ? true : false,
    cartIsVisible: false,
    SideModalIsVisible: false,
    searchModalIsVisible: false,
  },
  reducers: {
    toggle(state) {
      state.darkMode = !state.darkMode;
    },
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    toggleSideModal(state) {
      state.SideModalIsVisible = !state.SideModalIsVisible;
    },
    toggleSearchModal(state) {
      state.searchModalIsVisible = !state.searchModalIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
