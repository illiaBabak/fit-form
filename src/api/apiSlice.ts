import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@supabase/supabase-js";
import { routes } from "src/config/routes";
import { SUPABASE } from "src/root";
import { BodyPart, Equipment, Muscle, Exercise } from "src/types";
import { isExerciseArr } from "src/utils/guards";

export const apiSlice = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User | null, void>({
      queryFn: async () => {
        const {
          data: { user },
          error,
        } = await SUPABASE.auth.getUser();

        if (error) throw { error };

        return { data: user };
      },
    }),

    login: builder.mutation<User, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        const { data, error } = await SUPABASE.auth.signInWithPassword({
          email,
          password,
        });

        if (error) return { error: error.message };

        return { data: data.user };
      },
    }),

    signInWithGoogle: builder.mutation({
      queryFn: async () => {
        const { data, error } = await SUPABASE.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `http://localhost:3000${routes.main}`,
          },
        });

        if (error) return { error: error.message };

        return { data: data.url };
      },
    }),

    signUp: builder.mutation<User | null, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        const { data, error } = await SUPABASE.auth.signUp({
          email,
          password,
        });

        if (error) return { error: error.message };

        return { data: data.user };
      },
    }),

    logout: builder.mutation<void, void>({
      queryFn: async () => {
        const { error } = await SUPABASE.auth.signOut();

        if (error) throw { error };

        return { data: undefined };
      },
    }),

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

    getExercises: builder.query<Exercise[], void>({
      queryFn: async () => {
        const { data, error } = await SUPABASE.from("exercises").select();

        if (error) throw { error };

        return { data };
      },
    }),

    updateExercises: builder.mutation<void, Exercise[]>({
      queryFn: async (exercises) => {
        const { error } = await SUPABASE.from("exercises").upsert(exercises);

        if (error) throw { error };

        return { data: undefined };
      },
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLoginMutation,
  useSignInWithGoogleMutation,
  useSignUpMutation,
  useLogoutMutation,
  useGetBodyPartListQuery,
  useGetEquipmentListQuery,
  useGetMusclesQuery,
  useGetExercisesQuery,
  useUpdateExercisesMutation,
} = apiSlice;
