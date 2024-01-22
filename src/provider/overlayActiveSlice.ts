import { createSlice } from "@reduxjs/toolkit";

export const overlayActiveSlice = createSlice({
  name: "overlayActive",
  initialState: {
    value: false,
  },
  reducers: {
    handleToggleOverlayState: (state) => {
      state.value = !state.value;
    },
    handleSetOverlayState: (state, action) => {
      state.value = action.payload;
    },
    refreshToggleOverlayState: (state) => {
      state.value = false;
    },
  },
});

export const {
  handleToggleOverlayState,
  handleSetOverlayState,
  refreshToggleOverlayState,
} = overlayActiveSlice.actions;

export default overlayActiveSlice.reducer;
