import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  createImageObject,
} from "../../utilities";

export const fetchPageImages = createAsyncThunk(
  "mainPageImages/fetchPageImages",
  async () => {
    const pageImages = await fetch("http://localhost:4000/api/v1/pageImages");
    const data = await pageImages.json();
    return data;
  }
);

export const mainPageImagesSlice = createSlice({
  name: "mainPageImages",
  initialState: {
    pageImages: { welcome: {} },
    isLoadingContent: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch content cases ////////////////////////////////////////////////////////////
    builder.addCase(fetchPageImages.pending, managePendingState);
    builder.addCase(fetchPageImages.fulfilled, (state, action) => {
      manageFulfilledState(state);

      action.payload.data.forEach((imageObject) => {
        if (imageObject.role === "welcome") {
          state.pageImages[imageObject.role][imageObject.name] =
            createImageObject(imageObject);
          return;
        }
        state.pageImages[imageObject.role] = createImageObject(imageObject);
      });
    });

    builder.addCase(fetchPageImages.rejected, manageRejectedState);
  },
});

export const selectAllPageImages = (state) => state.mainPageImages.pageImages;
export const selectHeroImage = (state) => state.mainPageImages.pageImages.hero;
export const selectLogoImage = (state) => state.mainPageImages.pageImages.logo;
export const selectWelcomeImages = (state) =>
  state.mainPageImages.pageImages.welcome;

export default mainPageImagesSlice.reducer;
