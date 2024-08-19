import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5175";
// const API_URL = "https://appointment-management-json-server.onrender.com/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Appointment", "Barber", "Service", "ServiceCategory"],
  endpoints: (builder) => ({
    // User endpoints...
    fetchUsers: builder.query({
      query: () => "/users",
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["User", "Barber"],
    }),
    loginUser: builder.query({
      query: ({ email }) => ({
        url: `/users?email=${email}`,
        method: "GET",
      }),
    }),

    // Appointment endpoints...
    createAppointment: builder.mutation({
      query: (newAppointment) => ({
        url: "/appointments",
        method: "POST",
        body: newAppointment,
      }),
      invalidatesTags: ["Appointment"],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, ...updatedAppointment }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        body: updatedAppointment,
      }),
      invalidatesTags: ["Appointment"],
    }),
    fetchAppointmentsByUser: builder.query({
      query: (userId) => `/appointments?userId=${userId}`,
      providesTags: ["Appointment"],
    }),
    fetchAppointmentsByDayAndBarber: builder.query({
      query: ({ day, barber }) => `/appointments?day=${day}&barber=${barber}`,
      providesTags: ["Appointment"],
    }),
    fetchAppointmentById: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: ["Appointment"],
    }),

    // New endpoints for managing barbers...
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

    // Service endpoints...
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

    // Service category endpoints...
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
  useFetchUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useLoginUserQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useFetchAppointmentsByUserQuery,
  useFetchAppointmentsByDayAndBarberQuery,
  useFetchAppointmentByIdQuery,
  useFetchBarbersQuery,
  useFetchBarberByIdQuery,
  useFetchServicesQuery,
  useFetchServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useFetchServiceCategoriesQuery,
  useFetchServiceCategoryByIdQuery,
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
} = api;
