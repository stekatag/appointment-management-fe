import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5175";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Appointment"],
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
      query: ({ email }) => ({
        url: `/users?email=${email}`,
        method: "GET",
      }),
    }),
    createAppointment: builder.mutation({
      query: (newAppointment) => ({
        url: "/appointments",
        method: "POST",
        body: newAppointment,
      }),
      invalidatesTags: ["Appointment"],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, ...updatedAppointment }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        body: updatedAppointment,
      }),
      invalidatesTags: ["Appointment"],
    }),
    fetchAppointmentsByUser: builder.query({
      query: (userId) => `/appointments?userId=${userId}`,
      providesTags: ["Appointment"],
    }),
    fetchAppointmentsByDayAndBarber: builder.query({
      query: ({ day, barber }) => `/appointments?day=${day}&barber=${barber}`,
      providesTags: ["Appointment"],
    }),

    fetchAppointmentById: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: ["Appointment"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useAddUserMutation,
  useLoginUserQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useFetchAppointmentsByUserQuery,
  useFetchAppointmentsByDayAndBarberQuery,
  useFetchAppointmentByIdQuery, // New Hook
} = api;
