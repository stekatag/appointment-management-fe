import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5175";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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
    loginUser: builder.query({
      query: ({ email, password }) => ({
        url: `/users?email=${email}&password=${password}`,
        method: "GET",
      }),
    }),
    createAppointment: builder.mutation({
      query: (newAppointment) => ({
        url: "/appointments",
        method: "POST",
        body: newAppointment,
      }),
    }),
    fetchAppointments: builder.query({
      query: (userId) => `/appointments?userId=${userId}`,
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useAddUserMutation,
  useLoginUserQuery,
  useCreateAppointmentMutation,
  useFetchAppointmentsQuery,
} = api;
