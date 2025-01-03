import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  extractResponseData,
  extractErrorResponse,
} from "../utilities";

import apiClient from "../api/api";
import store from "./store";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      const { token } = extractResponseData(response);
      localStorage.setItem("access_token", token);
      return extractResponseData(response);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const verifyStoredToken = createAsyncThunk(
  "admin/auth/verifyStoredToken",
  async (token, { rejectWithValue }) => {
    try {
      if (token) {
        const response = await apiClient.post("/admin/auth/verifyToken", {
          token,
        });
        if (response.status === 200) {
          return extractResponseData(response);
        }
      }
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk("/auth/logoutUser", async () => {
  localStorage.removeItem("access_token");
  await apiClient.post("/auth/logout");
  store.dispatch(clearToken());
  return null;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    hasError: false,
    error: null,

    isAuthenticated: false,
    tokenVerificationComplete: false,
    token: localStorage.getItem("access_token"),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, managePendingState)
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.tokenVerificationComplete = true;
        manageFulfilledState(state);
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.tokenVerificationComplete = true;
        manageRejectedState(state);
      });

    builder
      .addCase(verifyStoredToken.pending, managePendingState)
      .addCase(verifyStoredToken.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.tokenVerificationComplete = true;
        manageFulfilledState(state);
      })
      .addCase(verifyStoredToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.tokenVerificationComplete = true;
        manageRejectedState(state);
      });

    builder
      .addCase(logoutUser.pending, managePendingState)

      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("access_token");
        state.token = null;
        state.isAuthenticated = false;
        state.tokenVerificationComplete = false;
        manageFulfilledState(state);
      })
      .addCase(logoutUser.rejected, manageRejectedState);
  },
});

export const { clearToken, setToken } = authSlice.actions;

export default authSlice.reducer;

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthToken = (state) => state.auth.token;
export const selectTokenVerificationComplete = (state) =>
  state.auth.tokenVerificationComplete;
