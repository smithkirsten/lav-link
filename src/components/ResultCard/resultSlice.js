import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBathroom: ""
};

export const resultSlice = createSlice({
  name: "result card",
  initialState,
  reducers: {
    selectBathroom: (state, action) => {
      state.selectedBathroom = action.payload;
    },
  },
});

export const { selectBathroom } = resultSlice.actions;

export default resultSlice.reducer;
