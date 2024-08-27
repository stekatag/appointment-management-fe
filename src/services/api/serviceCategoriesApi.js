import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleTokenExpiration } from "../../utils/tokenUtils";

// const API_URL = "http://localhost:5175";
// const API_URL = "https://appointment-management-json-server.onrender.com/";
const API_URL = "http://localhost:3000/v1";

export const serviceCategoriesApi = createApi({
  reducerPath: "serviceCategoriesApi",
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
  tagTypes: ["ServiceCategory"],
  endpoints: (builder) => ({
    fetchServiceCategories: builder.query({
      query: () => "/service-categories",
      providesTags: ["ServiceCategory"],
    }),
    fetchServiceCategoryById: builder.query({
      query: (id) => `/service-categories/${id}`,
      providesTags: ["ServiceCategory"],
    }),
    createServiceCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/service-categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["ServiceCategory"],
    }),
    updateServiceCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/service-categories/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["ServiceCategory"],
    }),
    deleteServiceCategory: builder.mutation({
      query: (id) => ({
        url: `/service-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceCategory"],
    }),
  }),
});

export const {
  useFetchServiceCategoriesQuery,
  useFetchServiceCategoryByIdQuery,
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
} = serviceCategoriesApi;
