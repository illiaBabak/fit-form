import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { SUPABASE } from "src/root";
import { BodyPart, Equipment, Muscle } from "src/types";

export const exercisesSlice = createApi({
  reducerPath: "supabaseApiExercise",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getBodyPartList: builder.query<BodyPart[], void>({
      queryFn: async () => {
        const { data, error } = await SUPABASE.from("bodyParts").select();

        if (error) throw { error };

        return { data };
      },
    }),

    getEquipmentList: builder.query<Equipment[], void>({
      queryFn: async () => {
        const { data, error } = await SUPABASE.from("equipment").select();

        if (error) throw { error };

        return { data };
      },
    }),

    getMuscles: builder.query<Muscle[], void>({
      queryFn: async () => {
        const { data, error } = await SUPABASE.from("target").select();

        if (error) throw { error };

        return { data };
      },
    }),
  }),
});

export const {
  useGetBodyPartListQuery,
  useGetEquipmentListQuery,
  useGetMusclesQuery,
} = exercisesSlice;
