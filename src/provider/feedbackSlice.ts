import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    value: {
      optionIndex: 0,
      status: false,
      type: "OBJECTIVE",
    },
  },
  reducers: {
    handleSetOptionIndex: (state, action) => {
      state.value.optionIndex = action.payload;
    },
    handleSetFeedbackStatus: (state, action) => {
      state.value.status = action.payload;
    },
    handleSetFeedbackType: (state, action) => {
      state.value.type = action.payload;
    },
    handleToggleFeedbackStatus: (state) => {
      state.value.status = !state.value.status;
    },
    refreshFeedbackData: (state) => {
      state.value = {
        optionIndex: 0,
        status: false,
        type: "OBJECTIVE",
      };
    },
  },
});

export const {
  handleSetOptionIndex,
  handleSetFeedbackStatus,
  handleSetFeedbackType,
  handleToggleFeedbackStatus,
  refreshFeedbackData,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
