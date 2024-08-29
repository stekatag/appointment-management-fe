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
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUserByIdQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = usersApi;
