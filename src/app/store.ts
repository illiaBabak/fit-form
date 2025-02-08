import { configureStore } from "@reduxjs/toolkit";
import { exercisesSlice } from "src/features/exercises/exercisesSlice";
import { userSlice } from "src/features/user/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [exercisesSlice.reducerPath]: exercisesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userSlice.middleware)
      .concat(exercisesSlice.middleware),
});
