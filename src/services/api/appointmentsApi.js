import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleTokenExpiration } from "../../utils/tokenUtils";

// Update the API URL to match your Node.js API
const API_URL = "http://localhost:3000/v1"; // Replace with your actual Node.js API URL

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = handleTokenExpiration(); // Check token expiration and handle it
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
      }
      return headers;
    },
  }),
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
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
        method: "PATCH", // Changed from PUT to PATCH as per REST best practices
        body: updatedAppointment,
      }),
      invalidatesTags: ["Appointment"],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointment"],
    }),
    fetchAllAppointments: builder.query({
      query: () => "/appointments",
      providesTags: ["Appointment"],
    }),
    fetchAppointmentsByUser: builder.query({
      query: (userId) => `/appointments?userId=${userId}`,
      providesTags: ["Appointment"],
    }),
    fetchAppointmentsByBarber: builder.query({
      query: (barberId) => `/appointments?preferredHairdresser=${barberId}`,
      providesTags: ["Appointment"],
    }),
    fetchAppointmentsByDayAndBarber: builder.query({
      query: ({ barberId }) => `/appointments?preferredHairdresser=${barberId}`,
      providesTags: ["Appointment"],
    }),
    fetchAppointmentById: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useFetchAllAppointmentsQuery,
  useFetchAppointmentsByUserQuery,
  useFetchAppointmentsByBarberQuery,
  useFetchAppointmentsByDayAndBarberQuery,
  useFetchAppointmentByIdQuery,
} = appointmentsApi;
