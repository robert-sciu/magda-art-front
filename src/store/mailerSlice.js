import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../api/api";
import {
  extractErrorResponse,
  extractResponseData,
  manageFulfilledState,
  managePendingState,
  manageRejectedState,
} from "../utilities";
import { capitalizeString } from "../utilities/utilities";

export const sendMail = createAsyncThunk(
  "mailer/sendMail",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/mailer", data);

      return extractResponseData(response);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const mailerSlice = createSlice({
  name: "mailer",
  initialState: {
    isLoading: false,
    hasError: false,
    error: null,
    mailSentMessage: "",
  },
  reducers: {
    clearMailerErrors: (state) => {
      state.hasError = false;
      state.error = null;
    },
    clearMailerMessage: (state) => {
      state.mailSentMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMail.pending, managePendingState)
      .addCase(sendMail.fulfilled, (state, action) => {
        manageFulfilledState(state, action);
        const name = action.payload.name;
        const email = action.payload.email;
        state.mailSentMessage = `${capitalizeString(
          name
        )}, thanks for reaching out 😊. I will get back to soon you via ${email} 🫡`;
      })
      .addCase(sendMail.rejected, manageRejectedState);
  },
});

export const { clearMailerErrors, clearMailerMessage } = mailerSlice.actions;

export const selectMailerLoadingStatus = (state) => state.mailer.isLoading;
export const selectMailerErrorStatus = (state) => state.mailer.hasError;
export const selectMailerErrorMessage = (state) => state.mailer.error;
export const selectMailerSuccessMessage = (state) =>
  state.mailer.mailSentMessage;

export default mailerSlice.reducer;
