import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  extractResponseData,
  extractErrorResponse,
} from "../utilities";
import apiClient from "../api/api";

import he from "he";

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
      visualizations: {
        visualization1: {},
        visualization2: {},
        visualization3: {},
      },
    },
    isLoading: false,
    hasError: false,
    error: null,
    refetchNeeded: false,
    fetchComplete: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch content cases ////////////////////////////////////////////////////////////
    builder
      .addCase(fetchContent.pending, managePendingState)
      .addCase(fetchContent.fulfilled, (state, action) => {
        const parser = new DOMParser();
        action.payload.data.forEach((contentObject) => {
          if (/^visualization\d+$/.test(contentObject.heading)) {
            state.content.visualizations[contentObject.heading] = {
              content: parser.parseFromString(
                contentObject.content,
                "text/html"
              ).body.textContent, // he.decode(contentObject.content), // contentObject.content,
              placement: contentObject.heading.slice(-1),
            };
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
// export const selectVisualizationsTexts = (state) =>
//   state.mainPageContent.content.visualizations;

export const selectVisualization1Text = (state) =>
  state.mainPageContent.content.visualizations["visualization1"].content;
export const selectVisualization2Text = (state) =>
  state.mainPageContent.content.visualizations["visualization2"].content;
export const selectVisualization3Text = (state) =>
  state.mainPageContent.content.visualizations["visualization3"].content;
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
