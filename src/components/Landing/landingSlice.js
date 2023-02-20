import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLocation: false,
  zipcode: "",
  gpsCoordinates: "",
  adaAccessible: false,
  unisex: false,
  changingTable: false,
};

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.currentLocation = action.payload.currentLocation;
      state.zipcode = action.payload.zipcode;
      state.gpsCoordinates = //
      state.adaAccessible = action.payload.adaAccessible;
      state.unisex = action.payload.unisex;
      state.changingTable = action.payload.changingTable;
    },
  },
});

export const { updateFilters } = landingSlice.actions;

export default landingSlice.reducer;