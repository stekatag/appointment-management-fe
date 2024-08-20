import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";

// Initialize user from local storage
const storedUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApi.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload.length ? action.payload[0] : null;
          if (state.user) {
            localStorage.setItem("token", "dummy-token"); // Store a dummy token
            localStorage.setItem("user", JSON.stringify(state.user)); // Store user info
          }
          state.error = action.payload.length ? null : "Invalid credentials";
        }
      )
      .addMatcher(
        usersApi.endpoints.loginUser.matchRejected,
        (state, action) => {
          state.error = action.error.message;
        }
      )
      .addMatcher(
        usersApi.endpoints.addUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          if (state.user) {
            localStorage.setItem("token", "dummy-token"); // Store a dummy token
            localStorage.setItem("user", JSON.stringify(state.user)); // Store user info
          }
          state.error = null;
        }
      )
      .addMatcher(usersApi.endpoints.addUser.matchRejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
