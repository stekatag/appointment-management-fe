import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URL = "http://localhost:5175";
const API_URL = "https://appointment-management-json-server.onrender.com/";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["User", "Barber"],
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/users",
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["User", "Barber"],
    }),
    loginUser: builder.query({
      query: ({ email }) => ({
        url: `/users?email=${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useLoginUserQuery,
} = usersApi;
