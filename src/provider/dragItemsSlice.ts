import { createSlice } from "@reduxjs/toolkit";

export const dragItemsSlice = createSlice({
  name: "dragItems",
  initialState: {
    value: [],
  },
  reducers: {
    handleSetDragItems: (state, action) => {
      state.value = action.payload;
    },
    refreshDragItems: (state) => {
      state.value = [];
    },
  },
});

export const { handleSetDragItems, refreshDragItems } = dragItemsSlice.actions;

export default dragItemsSlice.reducer;
