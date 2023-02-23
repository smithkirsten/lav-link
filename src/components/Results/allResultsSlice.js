import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: "",
};

export const allResultsSlice = createSlice({
  name: "allResults",
  initialState,
  reducers: {
    results: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { results } = allResultsSlice.actions;

export default allResultsSlice.reducer;
