import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulate backend with JSON
const demoUsers = [
  {
    email: "user1@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
  },
  {
    email: "user2@example.com",
    password: "password456",
    firstName: "Jane",
    lastName: "Doe",
  },
];

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const user = demoUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      return user;
    } else {
      throw new Error("Invalid credentials");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password }) => {
    const user = { firstName, lastName, email, password };
    demoUsers.push(user);
    return user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
