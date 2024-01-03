import { createSlice } from "@reduxjs/toolkit";

export const rightSidebarSlice = createSlice({
  name: "rightSidebar",
  initialState: {
    value: false,
  },
  reducers: {
    handleToggleSidebarState: (state) => {
      state.value = !state.value;
    },
    handleSetSidebarState: (state, action) => {
      state.value = action.payload;
    },
    refreshToggleSidebarState: (state) => {
      state.value = false;
    },
  },
});

export const {
  handleToggleSidebarState,
  handleSetSidebarState,
  refreshToggleSidebarState,
} = rightSidebarSlice.actions;

export default rightSidebarSlice.reducer;
