import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  extractResponseData,
  extractErrorResponse,
} from "../utilities";
import apiClient from "../api/api";

const api_url = import.meta.env.VITE_API_BASE_URL;

export const fetchContent = createAsyncThunk(
  "mainPageContent/fetchContent",
  async (_, { rejectWithValue }) => {
    try {
      const content = await apiClient.get(`${api_url}/contents`);
      const data = extractResponseData(content);

      return data;
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const updateContent = createAsyncThunk(
  "mainPageContent/updateContent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`${api_url}/admin/contents`, data);
      return extractResponseData(response);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const mainPageContentSlice = createSlice({
  name: "mainPageContent",
  initialState: {
    content: {
      visualizations: {},
    },
    isLoading: false,
    hasError: false,
    error: null,
    refetchNeeded: false,
    fetchComplete: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, managePendingState)
      .addCase(fetchContent.fulfilled, (state, action) => {
        action.payload.data.forEach((contentObject) => {
          if (/^visualization\d+$/.test(contentObject.heading)) {
            state.content.visualizations[contentObject.heading] =
              contentObject.content;
            return;
          }
          state.content[contentObject.heading] = contentObject.content;
        });

        state.refetchNeeded = false;
        state.fetchComplete = true;
        manageFulfilledState(state);
      })
      .addCase(fetchContent.rejected, manageRejectedState)

      .addCase(updateContent.pending, managePendingState)
      .addCase(updateContent.fulfilled, (state) => {
        state.refetchNeeded = true;
        manageFulfilledState(state);
      })
      .addCase(updateContent.rejected, manageRejectedState);
  },
});

export const selectName = (state) => state.mainPageContent.content.name;
export const selectWelcome = (state) => state.mainPageContent.content.welcome;
export const selectBio = (state) => state.mainPageContent.content.bio;

export const selectVisualizationsTexts = (state) =>
  state.mainPageContent.content.visualizations;
export const selectFooterOwner = (state) =>
  state.mainPageContent.content["site owner"];
export const selectFooterDesign = (state) =>
  state.mainPageContent.content["developer name"];

export const selectContentLoadingStatus = (state) =>
  state.mainPageContent.isLoading;

export const selectContentRefetchNeeded = (state) =>
  state.mainPageContent.refetchNeeded;

export const selectContentFetchComplete = (state) =>
  state.mainPageContent.fetchComplete;

export default mainPageContentSlice.reducer;
