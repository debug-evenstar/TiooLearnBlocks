import { createSlice } from "@reduxjs/toolkit";

export const triggerSlice = createSlice({
  name: "trigger",
  initialState: {
    value: false,
  },
  reducers: {
    handleToggleTrigger: (state) => {
      state.value = !state.value;
    },
    handleSetTrigger: (state, action) => {
      state.value = action.payload;
    },
    refreshToggleTrigger: (state) => {
      state.value = false;
    },
  },
});

export const { handleToggleTrigger, handleSetTrigger, refreshToggleTrigger } =
  triggerSlice.actions;

export default triggerSlice.reducer;
