import { createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: {} };

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: initialState,
  reducers: {
    storeUser(state, action) {
      state.userInfo = action.payload;
    },
    clearUser(state) {
      state.userInfo = {};
    },
  },
});

export const userLoginActions = userLoginSlice.actions;

export default userLoginSlice.reducer;
