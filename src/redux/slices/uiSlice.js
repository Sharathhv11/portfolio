import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: "light",
    menuOpen: false,
  },

  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { toggleTheme, toggleMenu } = uiSlice.actions;
export default uiSlice.reducer;
