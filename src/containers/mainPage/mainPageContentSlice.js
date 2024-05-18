import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
} from "../../utilities";

export const fetchContent = createAsyncThunk(
  "mainPageContent/fetchContent",
  async () => {
    const content = await fetch("http://localhost:4000/api/v1/contents");
    const data = await content.json();
    return data;
  }
);

export const mainPageContentSlice = createSlice({
  name: "mainPageContent",
  initialState: {
    content: {},
    isLoadingContent: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch content cases ////////////////////////////////////////////////////////////
    builder.addCase(fetchContent.pending, managePendingState);
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      action.payload.data.forEach(
        (contentObject) =>
          (state.content[contentObject.heading] = contentObject.content)
      );
      manageFulfilledState(state);
    });
    builder.addCase(fetchContent.rejected, manageRejectedState);
  },
});

export const selectAllContent = (state) => state.mainPageContent.content;
export const selectName = (state) => state.mainPageContent.content.name;
export const selectWelcome = (state) => state.mainPageContent.content.welcome;
export const selectBio = (state) => state.mainPageContent.content.bio;

export default mainPageContentSlice.reducer;
