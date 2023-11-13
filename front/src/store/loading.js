import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false };

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
