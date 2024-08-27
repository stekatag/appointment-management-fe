import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../utils/apiUtils";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: baseQueryWithAuth,
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
