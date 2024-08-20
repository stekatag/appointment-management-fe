import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URL = "http://localhost:5175";
const API_URL = "https://appointment-management-json-server.onrender.com/";

export const statusesApi = createApi({
  reducerPath: "statusesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Status"],
  endpoints: (builder) => ({
    fetchStatuses: builder.query({
      query: () => "/statuses",
      providesTags: ["Status"],
    }),
    fetchStatusById: builder.query({
      query: (id) => `/statuses/${id}`,
      providesTags: ["Status"],
    }),
    createStatus: builder.mutation({
      query: (newStatus) => ({
        url: "/statuses",
        method: "POST",
        body: newStatus,
      }),
      invalidatesTags: ["Status"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/statuses/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Status"],
    }),
    deleteStatus: builder.mutation({
      query: (id) => ({
        url: `/statuses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Status"],
    }),
  }),
});

export const {
  useFetchStatusesQuery,
  useFetchStatusByIdQuery,
  useCreateStatusMutation,
  useUpdateStatusMutation,
  useDeleteStatusMutation,
} = statusesApi;
