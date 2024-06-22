import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
} from "../../../utilities";

const api_url = import.meta.env.VITE_API_BASE_URL;

export const fetchContent = createAsyncThunk(
  "mainPageContent/fetchContent",
  async () => {
    const content = await fetch(`${api_url}/contents`);
    const data = await content.json();
    return data;
  }
);

export const mainPageContentSlice = createSlice({
  name: "mainPageContent",
  initialState: {
    content: { visualizations: {} },
    isLoadingContent: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch content cases ////////////////////////////////////////////////////////////
    builder.addCase(fetchContent.pending, managePendingState);
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      action.payload.data.forEach((contentObject) => {
        if (/^visualization\d+$/.test(contentObject.heading)) {
          state.content.visualizations[contentObject.heading] = {
            content: contentObject.content,
            placement: contentObject.heading.slice(-1),
          };
          return;
        }
        state.content[contentObject.heading] = contentObject.content;
      });
      manageFulfilledState(state);
    });
    builder.addCase(fetchContent.rejected, manageRejectedState);
  },
});

export const selectName = (state) => state.mainPageContent.content.name;
export const selectWelcome = (state) => state.mainPageContent.content.welcome;
export const selectBio = (state) => state.mainPageContent.content.bio;
export const selectVisualizationsTexts = (state) =>
  state.mainPageContent.content.visualizations;
export const selectFooterOwner = (state) =>
  state.mainPageContent.content.footerOwner;
export const selectFooterDesign = (state) =>
  state.mainPageContent.content.footerDesign;

export default mainPageContentSlice.reducer;
