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
