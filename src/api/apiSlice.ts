import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { SUPABASE, FIREBASE_AUTH } from "src/root";
import { BodyPart, Equipment, Muscle, Exercise, Plan } from "src/types";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const apiSlice = createApi({
  reducerPath: "customApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Exercises", "Plans"],
  endpoints: (builder) => ({
    login: builder.mutation<
      { uid: string; email: string | null },
      { email: string; password: string }
    >({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            FIREBASE_AUTH,
            email,
            password
          );
          const user = userCredential.user;

          return { data: { uid: user.uid, email: user.email } };
        } catch {
          return { error: "Invalid email/password" };
        }
      },
    }),

    signInWithGoogle: builder.mutation({
      queryFn: async () => {
        try {
          const provider = new GoogleAuthProvider();

          await signInWithPopup(FIREBASE_AUTH, provider);

          return { data: "Redirecting to Google" };
        } catch (error) {
          return { error };
        }
      },
    }),

    signUp: builder.mutation<
      { uid: string; email: string | null },
      { email: string; password: string }
    >({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            FIREBASE_AUTH,
            email,
            password
          );

          const createdUser = userCredential.user;

          await sendEmailVerification(createdUser);

          return { data: { uid: createdUser.uid, email: createdUser.email } };
        } catch {
          return { error: "User already exists" };
        }
      },
    }),

    logout: builder.mutation<void, void>({
      queryFn: async () => {
        await signOut(FIREBASE_AUTH);

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

      providesTags: ["Exercises"],
    }),

    updateExercises: builder.mutation<void, Exercise[]>({
      queryFn: async (exercises) => {
        const { error } = await SUPABASE.from("exercises").upsert(exercises);

        if (error) throw { error };

        return { data: undefined };
      },

      invalidatesTags: ["Exercises"],
    }),

    getUserPlans: builder.query<Plan[], string>({
      queryFn: async (userId) => {
        const { data, error } = await SUPABASE.from("plans")
          .select()
          .eq("userId", userId)
          .order("created_at", { ascending: false });

        if (error) throw { error };

        return { data };
      },

      providesTags: ["Plans"],
    }),

    createOrEditPlan: builder.mutation<void, Plan>({
      queryFn: async (plan) => {
        const { error } = await SUPABASE.from("plans").upsert(plan);

        if (error) throw { error };

        return { data: undefined };
      },
      invalidatesTags: ["Plans"],
    }),

    getExercisesByIds: builder.query<Exercise[], string[]>({
      queryFn: async (ids) => {
        const { data, error } = await SUPABASE.from("exercises")
          .select()
          .in("id", ids);

        if (error) throw { error };

        return { data };
      },
    }),

    deletePlan: builder.mutation<void, string>({
      queryFn: async (planId) => {
        const { error } = await SUPABASE.from("plans")
          .delete()
          .eq("id", planId);

        if (error) throw error;

        return { data: undefined };
      },

      invalidatesTags: ["Plans"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignInWithGoogleMutation,
  useSignUpMutation,
  useLogoutMutation,
  useGetBodyPartListQuery,
  useGetEquipmentListQuery,
  useGetMusclesQuery,
  useGetExercisesQuery,
  useUpdateExercisesMutation,
  useCreateOrEditPlanMutation,
  useLazyGetUserPlansQuery,
  useGetExercisesByIdsQuery,
  useDeletePlanMutation,
} = apiSlice;
