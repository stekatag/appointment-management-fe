import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.loginUser.matchFulfilled, (state, action) => {
        state.user = action.payload.length ? action.payload[0] : null;
        state.error = action.payload.length ? null : "Invalid credentials";
      })
      .addMatcher(api.endpoints.loginUser.matchRejected, (state, action) => {
        state.error = action.error.message;
      })
      .addMatcher(api.endpoints.addUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addMatcher(api.endpoints.addUser.matchRejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
