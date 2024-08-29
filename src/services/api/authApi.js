import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../utils/apiUtils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/auth/register", // Register endpoint for new users
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User", "Barber"],
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: `/auth/login`, // Login endpoint
        method: "POST",
        body: { email, password },
      }),
    }),
    logoutUser: builder.mutation({
      query: (refreshToken) => ({
        url: `/auth/logout`,
        method: "POST",
        body: { refreshToken },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
        } catch (err) {
          console.error("Failed to logout:", err);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset-password?token=${token}`,
        method: "POST",
        body: { password },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
