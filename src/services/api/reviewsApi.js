import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleTokenExpiration } from "../../utils/tokenUtils";

// const API_URL = "http://localhost:5175";
// const API_URL = "https://appointment-management-json-server.onrender.com/";
const API_URL = "http://localhost:3000/v1";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
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
