import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
import { appointmentsApi } from "../api/appointmentsApi";
import { barbersApi } from "../api/barbersApi";
import { servicesApi } from "../api/servicesApi";
import { serviceCategoriesApi } from "../api/serviceCategoriesApi";
import { reviewsApi } from "../api/reviewsApi";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
    [barbersApi.reducerPath]: barbersApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [serviceCategoriesApi.reducerPath]: serviceCategoriesApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      appointmentsApi.middleware,
      barbersApi.middleware,
      servicesApi.middleware,
      serviceCategoriesApi.middleware,
      reviewsApi.middleware
    ),
});

export default store;
