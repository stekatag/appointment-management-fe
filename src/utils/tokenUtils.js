// utils/tokenUtils.js
import { jwtDecode } from "jwt-decode";
import { store } from "../services/store/index.js";
import { logout } from "../services/store/authSlice";
import { getTokenFromStorage, clearStorage } from "./storage";

// Utility function to check if a token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds

  return decodedToken.exp < currentTime; // Check if the token is expired
};

// Utility function to handle token expiration
export const handleTokenExpiration = () => {
  const token = getTokenFromStorage();

  if (token && isTokenExpired(token)) {
    clearStorage(); // Clear tokens from storage
    store.dispatch(logout()); // Dispatch the logout action
    window.location.href = "/"; // Redirect to home page
  }

  return token;
};
