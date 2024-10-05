import { createSlice } from "@reduxjs/toolkit";
export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: localStorage.getItem("dark") === "true" ? true : false,
    cartIsVisible: false,
    SideModalIsVisible: false,
    searchModalIsVisible: false,
    cropperModalIsVisible: false,
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
    toggleCropperModal(state) {
      state.cropperModalIsVisible = !state.cropperModalIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
