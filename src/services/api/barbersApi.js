import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URL = "http://localhost:5175";
const API_URL = "https://appointment-management-json-server.onrender.com/";

export const barbersApi = createApi({
  reducerPath: "barbersApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Barber"],
  endpoints: (builder) => ({
    fetchBarbers: builder.query({
      query: () => "/users?role=barber",
      providesTags: ["Barber"],
    }),
    fetchBarberById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["Barber"],
    }),
    createBarber: builder.mutation({
      query: (newBarber) => ({
        url: "/users",
        method: "POST",
        body: { ...newBarber, role: "barber" },
      }),
      invalidatesTags: ["Barber"],
    }),
  }),
});

export const {
  useFetchBarbersQuery,
  useFetchBarberByIdQuery,
  useCreateBarberMutation,
} = barbersApi;
