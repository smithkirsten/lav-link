import { createSlice } from "@reduxjs/toolkit";
import { zipConverter, geoConverter } from "../../util";

const initialState = {
  currentLocation: false,
  currentCoords: "",
  zipcode: "",
  gpsCoordinates: "",
  adaAccessible: false,
  unisex: false,
  changingTable: false,
};
//if currentLocation
export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.currentLocation = action.payload.currentLocation;
      state.currentCoords = action.payload.currentCoords;
      state.zipcode = action.payload.currentLocation ? geoConverter(action.payload.currentCoords.lat, action.payload.currentCoords.long).zipcode : action.payload.zipcode;
      state.gpsCoordinates = action.payload.currentCoords || zipConverter(action.payload.zipcode);
      state.adaAccessible = action.payload.adaAccessible;
      state.unisex = action.payload.unisex;
      state.changingTable = action.payload.changingTable;
    },
  },
});

export const { updateFilters } = landingSlice.actions;

export default landingSlice.reducer;