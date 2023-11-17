import { createSlice } from "@reduxjs/toolkit";
import { LoginState } from "../../typings/types";

const initialState = { userInfo: {} } as LoginState;

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: initialState,
  reducers: {
    storeUser(state, action) {
      state.userInfo = action.payload;
    },
    clearUser(state) {
      state = initialState;
    },
  },
});

export const userLoginActions = userLoginSlice.actions;

export default userLoginSlice.reducer;

// https://velog.io/@ww8007/Ts-WritableDraftselectDay-%EC%9D%B8%EB%8D%B1%EC%8A%A4-%ED%98%95%EC%8B%9D%EC%97%90-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%97%86%EC%9C%BC%EB%AF%80%EB%A1%9C-%EC%9A%94%EC%86%8C%EC%97%90-%EC%95%94%EC%8B%9C%EC%A0%81%EC%9C%BC%EB%A1%9C-any-%ED%98%95%EC%8B%9D%EC%9D%B4-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4
