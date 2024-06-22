import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
} from "../../utilities";
import api from "../../api/api";

const api_url = import.meta.env.VITE_API_BASE_URL;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    if (email && password) {
      const response = await api.post(
        `${api_url}/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);

      return response.data.token;
    }

    return null;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, managePendingState);
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      manageFulfilledState(state);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      manageRejectedState(state);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
