import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: " ",
};

export const resultsSlice = createSlice({
  name: "",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {} = resultsSlice.actions;

export default resultsSlice.reducer;