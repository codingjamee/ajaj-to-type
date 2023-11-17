import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading";
import locationReducer from "./location";
import userLoginReducer from "./userLogin";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    location: locationReducer,
    userLogin: userLoginReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
