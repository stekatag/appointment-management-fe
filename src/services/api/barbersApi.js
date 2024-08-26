import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromStorage } from "../../utils/storage";

// const API_URL = "http://localhost:5175";
// const API_URL = "https://appointment-management-json-server.onrender.com/";
const API_URL = "http://localhost:3000/v1";

export const barbersApi = createApi({
  reducerPath: "barbersApi",
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
