import { createSlice } from "@reduxjs/toolkit";

const initialState = { locate: "" };

const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    storeLocate(state, action) {
      state.locate = action.payload;
    },
    clearLocate(state) {
      state.locate = "";
    },
  },
});

export const locationActions = locationSlice.actions;

export default locationSlice.reducer;
