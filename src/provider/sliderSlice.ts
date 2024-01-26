import { createSlice } from "@reduxjs/toolkit";

export const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    value: {
      activeCompName: "",
    },
  },
  reducers: {
    handleSetActiveCompName: (state, action) => {
      state.value.activeCompName = action.payload;
    },
    refreshslider: (state) => {
      state.value = {
        activeCompName: "",
      };
    },
  },
});

export const { handleSetActiveCompName, refreshslider } = sliderSlice.actions;

export default sliderSlice.reducer;
