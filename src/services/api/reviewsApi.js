import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URL = "http://localhost:5175";
const API_URL = "https://appointment-management-json-server.onrender.com/";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    fetchReviews: builder.query({
      query: () => "/reviews",
      providesTags: ["Review"],
    }),
    fetchReviewById: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: (newReview) => ({
        url: "/reviews",
        method: "POST",
        body: newReview,
      }),
      invalidatesTags: ["Review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useFetchReviewsQuery,
  useFetchReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
