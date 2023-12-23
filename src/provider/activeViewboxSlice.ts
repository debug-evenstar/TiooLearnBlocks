import { createSlice } from "@reduxjs/toolkit";

export const activeViewboxSlice = createSlice({
  name: "activeViewbox",
  initialState: {
    value: "",
  },
  reducers: {
    handleSetActiveViewbox: (state, action) => {
      state.value = action.payload;
    },
    refreshActiveViewbox: (state) => {
      state.value = "";
    },
  },
});

export const { handleSetActiveViewbox, refreshActiveViewbox } =
  activeViewboxSlice.actions;

export default activeViewboxSlice.reducer;
