import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "src/api/apiSlice";
import { exercisesDbSlice } from "src/api/exercisesDbSlice";
import exercisesReducer from "src/features/exercises/exercisesSlice";
import { plansSlice } from "src/features/plans/plansSlice";

export const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [exercisesDbSlice.reducerPath]: exercisesDbSlice.reducer,
    [plansSlice.reducerPath]: plansSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      exercisesDbSlice.middleware
    ),
});

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
