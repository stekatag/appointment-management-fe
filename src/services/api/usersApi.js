import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromStorage } from "../../utils/storage";

const API_URL = "http://localhost:3000/v1";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getTokenFromStorage(); // Get the token from storage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Barber"],
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/users",
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: "User", id })),
              { type: "Barber" },
            ]
          : [{ type: "User" }, { type: "Barber" }],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/auth/register", // Register endpoint for new users
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "User" }, { type: "Barber" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "Barber" },
      ],
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
  useAddUserMutation,
  useUpdateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = usersApi;
