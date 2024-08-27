import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleTokenExpiration } from "./tokenUtils";

export const API_URL = "http://localhost:3000/v1"; // Centralized API URL

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = handleTokenExpiration(); // Check token expiration and handle it

    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
    }
    return headers;
  },
});
