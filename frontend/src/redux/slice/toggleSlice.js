import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "TOGGLE_LIGHT_MODE",
  initialState: JSON.parse(localStorage.getItem("isDarkMode")) || false,
  reducers: {
    isDarkMode: (state) => {
      return !state;
    },
  },
});

export const toogleSelector = (state) => state.toggle

export const { isDarkMode } = toggleSlice.actions;

export default toggleSlice.reducer;
