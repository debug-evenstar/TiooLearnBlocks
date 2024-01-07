import { createSlice } from "@reduxjs/toolkit";

export const showOptionsBoxSlice = createSlice({
  name: "showOptionsBox",
  initialState: {
    value: false,
  },
  reducers: {
    handleToggleShowOptionBox: (state) => {
      state.value = !state.value;
    },
    handleSetShowOptionBox: (state, action) => {
      state.value = action.payload;
    },
    refreshToggleShowOptionBox: (state) => {
      state.value = false;
    },
  },
});

export const {
  handleToggleShowOptionBox,
  handleSetShowOptionBox,
  refreshToggleShowOptionBox,
} = showOptionsBoxSlice.actions;

export default showOptionsBoxSlice.reducer;
