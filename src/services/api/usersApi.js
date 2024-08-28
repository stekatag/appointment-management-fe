import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../utils/apiUtils";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User", "Barber"],
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/users",
      providesTags: ["User", "Barber"],
    }),
    fetchUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User", "Barber"],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/auth/register", // Register endpoint for new users
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User", "Barber"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["User", "Barber"],
    }),
    changePassword: builder.mutation({
      query: ({ id, currentPassword, newPassword }) => ({
        url: `/users/${id}/password`,
        method: "PATCH",
        body: { currentPassword, newPassword },
      }),
      invalidatesTags: ["User"],
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
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = usersApi;
