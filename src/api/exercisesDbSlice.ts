import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Exercise } from "src/types";
import { isExerciseArr } from "src/utils/guards";

export const exercisesDbSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exercisedb.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", import.meta.env.ENV_EXERCISE_DB_API_KEY);
      headers.set("x-rapidapi-host", "exercisedb.p.rapidapi.com");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getValidExercises: builder.query<Exercise[], void>({
      query: () => ({
        url: "/exercises?limit=0&offset=0",
        method: "GET",
      }),
      transformResponse: (response: unknown) =>
        isExerciseArr(response) ? response : [],
    }),
  }),
});

export const { useLazyGetValidExercisesQuery } = exercisesDbSlice;
