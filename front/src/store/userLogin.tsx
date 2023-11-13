import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  userInfo: Object;
}

const initialState = { userInfo: {} } as LoginState;

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
