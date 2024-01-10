import { createSlice } from "@reduxjs/toolkit";

export const optionsDataSlice = createSlice({
  name: "optionsData",
  initialState: {
    value: {
      identifier: "",
      correctOption: "",
      wrongOption: "",
    },
  },
  reducers: {
    handleSetIdentifier: (state, action) => {
      state.value.identifier = action.payload;
      console.log(action.payload, "successful");
    },
    handleSetCorrectOption: (state, action) => {
      state.value.correctOption = action.payload;
    },
    handleSetWrongOption: (state, action) => {
      state.value.wrongOption = action.payload;
    },
    refreshOptionsData: (state) => {
      state.value = {
        identifier: "",
        correctOption: "",
        wrongOption: "",
      };
    },
  },
});

export const {
  handleSetIdentifier,
  handleSetCorrectOption,
  handleSetWrongOption,
  refreshOptionsData,
} = optionsDataSlice.actions;

export default optionsDataSlice.reducer;
