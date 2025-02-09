import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "src/api/apiSlice";
import exercisesReducer from "src/features/exercises/exercisesSlice";

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
