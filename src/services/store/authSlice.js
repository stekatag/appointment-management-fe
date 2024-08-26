import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";

// Initialize user from localStorage or sessionStorage
const storedUser =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApi.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
          const token = action.payload.tokens?.access?.token; // Use optional chaining
          const refreshToken = action.payload.tokens?.refresh?.token;
          const userString = JSON.stringify(state.user);

          if (token && refreshToken) {
            localStorage.setItem("token", token);
            sessionStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("user", userString);
            sessionStorage.setItem("user", userString);
          } else {
            console.error("Token or refresh token is undefined");
          }

          state.error = null;
        }
      )
      .addMatcher(
        usersApi.endpoints.loginUser.matchRejected,
        (state, action) => {
          state.error = action.error.message;
        }
      )
      .addMatcher(usersApi.endpoints.logoutUser.matchFulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
