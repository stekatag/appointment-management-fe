import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../utils/apiUtils";

export const barbersApi = createApi({
  reducerPath: "barbersApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Barber"],
  endpoints: (builder) => ({
    fetchBarbers: builder.query({
      query: () => "/barbers", // Updated endpoint
      providesTags: ["Barber"],
    }),
    fetchBarberById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["Barber"],
    }),
    assignBarber: builder.mutation({
      query: ({ id, ...barberData }) => ({
        url: `/barbers/${id}/assign`,
        method: "PATCH",
        body: barberData,
      }),
      invalidatesTags: ["Barber"],
    }),
    updateBarber: builder.mutation({
      query: ({ id, ...barberData }) => ({
        url: `/barbers/${id}/update`,
        method: "PATCH",
        body: barberData,
      }),
      invalidatesTags: ["Barber"],
    }),
    unassignBarber: builder.mutation({
      query: (id) => ({
        url: `/barbers/${id}/unassign`,
        method: "PATCH",
      }),
      invalidatesTags: ["Barber"],
    }),
  }),
});

export const {
  useFetchBarbersQuery,
  useFetchBarberByIdQuery,
  useAssignBarberMutation,
  useUpdateBarberMutation,
  useUnassignBarberMutation,
} = barbersApi;
