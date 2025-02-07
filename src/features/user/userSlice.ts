import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@supabase/supabase-js";
import { routes } from "src/config/routes";
import { SUPABASE } from "src/root";

export const userSlice = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      queryFn: async () => {
        const {
          data: { user },
        } = await SUPABASE.auth.getUser();

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
  }),
});

export const {
  useGetCurrentUserQuery,
  useLoginMutation,
  useSignInWithGoogleMutation,
  useSignUpMutation,
} = userSlice;
