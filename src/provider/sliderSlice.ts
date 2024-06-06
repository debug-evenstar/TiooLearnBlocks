import { createSlice } from "@reduxjs/toolkit";

export const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    value: {
      activeCompName: "",
      activeCompIndex: 0,
    },
  },
  reducers: {
    handleSetActiveCompName: (state, action) => {
      state.value.activeCompName = action.payload;
    },
    handleSetActiveCompIndex: (state, action) => {
      state.value.activeCompIndex = action.payload;
    },
    refreshslider: (state) => {
      state.value = {
        activeCompName: "",
        activeCompIndex: 0,
      };
    },
  },
});

export const {
  handleSetActiveCompName,
  handleSetActiveCompIndex,
  refreshslider,
} = sliderSlice.actions;

export default sliderSlice.reducer;
