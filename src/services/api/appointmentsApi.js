import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../utils/apiUtils";

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: baseQueryWithAuth,
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
      query: ({ page, limit }) => ({
        url: `/appointments?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Appointment"],
    }),
    fetchAppointmentsByUser: builder.query({
      query: ({ userId, page, limit }) => ({
        url: `/appointments?userId=${userId}&page=${page}&limit=${limit}`,
      }),
      providesTags: ["Appointment"],
    }),
    fetchAppointmentsByBarber: builder.query({
      query: ({ barberId, page, limit }) => ({
        url: `/appointments?preferredHairdresser=${barberId}&page=${page}&limit=${limit}`,
      }),
      providesTags: ["Appointment"],
    }),
    fetchAppointmentsByDayAndBarber: builder.query({
      query: ({ barberId, page, limit }) => ({
        url: `/appointments?preferredHairdresser=${barberId}&page=${page}&limit=${limit}`,
      }),
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
