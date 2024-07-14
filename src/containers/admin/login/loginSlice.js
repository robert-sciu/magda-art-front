import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
} from "../../../utilities";

import api from "../../../api/api";

const api_url = import.meta.env.VITE_API_BASE_URL;

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token) => {
    if (token) {
      const response = await api.post(
        `${api_url}/login/verifyToken`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.isValid;
    }

    return Promise.reject();
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
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

    return Promise.reject();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoadingContent: false,
    hasError: false,
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
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isAuthenticated = true;
      manageFulfilledState(state);
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isAuthenticated = false;
      manageRejectedState(state);
    });

    builder.addCase(verifyToken.pending, managePendingState);
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
      manageFulfilledState(state);
    });
    builder.addCase(verifyToken.rejected, manageRejectedState);
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const isAuthenticated = (state) => state.auth.isAuthenticated;
