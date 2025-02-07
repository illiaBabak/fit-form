import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "src/features/user/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware),
});
