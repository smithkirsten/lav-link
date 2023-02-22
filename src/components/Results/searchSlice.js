import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: []
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchResults: (state, action) => {
      state.searchResults = action.payload
    }
  }
})

export const { updateSearchResults } = searchSlice.actions;

export default searchSlice.reducer;