import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../utils/apiUtils";

export const serviceCategoriesApi = createApi({
  reducerPath: "serviceCategoriesApi",
  baseQuery: baseQueryWithAuth,
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
