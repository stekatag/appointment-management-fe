import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleTokenExpiration } from "../../utils/tokenUtils";

// const API_URL = "http://localhost:5175";
// const API_URL = "https://appointment-management-json-server.onrender.com/";
const API_URL = "http://localhost:3000/v1";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
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
  tagTypes: ["Service"],
  endpoints: (builder) => ({
    fetchServices: builder.query({
      query: () => "/services",
      providesTags: ["Service"],
    }),
    fetchServiceById: builder.query({
      query: (id) => `/services/${id}`,
      providesTags: ["Service"],
    }),
    createService: builder.mutation({
      query: (newService) => ({
        url: "/services",
        method: "POST",
        body: newService,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useFetchServicesQuery,
  useFetchServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
