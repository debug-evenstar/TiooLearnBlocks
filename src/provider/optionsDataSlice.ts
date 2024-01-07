import { createSlice } from "@reduxjs/toolkit";

export const optionsDataSlice = createSlice({
  name: "optionsData",
  initialState: {
    value: {
      correctOption: "",
      wrongOption: "",
    },
  },
  reducers: {
    handleSetCorrectOption: (state, action) => {
      state.value.correctOption = action.payload;
    },
    handleSetWrongOption: (state, action) => {
      state.value.wrongOption = action.payload;
    },
    refreshOptionsData: (state) => {
      state.value = {
        correctOption: "",
        wrongOption: "",
      };
    },
  },
});

export const {
  handleSetCorrectOption,
  handleSetWrongOption,
  refreshOptionsData,
} = optionsDataSlice.actions;

export default optionsDataSlice.reducer;
