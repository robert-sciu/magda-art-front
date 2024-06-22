import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  createImageObject,
} from "../../../utilities";

const api_url = import.meta.env.VITE_API_BASE_URL;

export const fetchPageImages = createAsyncThunk(
  "mainPageImages/fetchPageImages",
  async () => {
    const pageImages = await fetch(`${api_url}/pageImages`);
    const data = await pageImages.json();
    return data;
  }
);

export const mainPageImagesSlice = createSlice({
  name: "mainPageImages",
  initialState: {
    pageImages: {
      hero: {},
      welcome: {},
      bioParallax: {},
      bio: {},
      galleryParallax: {},
      visualizations: {},
      contactBig: {},
      contactSmall: {},
      contact: {},
    },
    isLoadingContent: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch content cases ////////////////////////////////////////////////////////////
    builder.addCase(fetchPageImages.pending, managePendingState);
    builder.addCase(fetchPageImages.fulfilled, (state, action) => {
      const roles = Object.keys(state.pageImages);
      roles.forEach((role) => {
        state.pageImages[role] = {};
      });
      action.payload.data.forEach((imageObject) => {
        if (roles.includes(imageObject.role)) {
          state.pageImages[imageObject.role][imageObject.name] =
            createImageObject(imageObject);
          return;
        }
      });
      manageFulfilledState(state);
    });

    builder.addCase(fetchPageImages.rejected, manageRejectedState);
  },
});

export const selectHeroImage = (state) => state.mainPageImages.pageImages.hero;
export const selectWelcomeImages = (state) =>
  state.mainPageImages.pageImages.welcome;
export const selectBioImages = (state) => state.mainPageImages.pageImages.bio;
export const selectBioParallaxImage = (state) =>
  state.mainPageImages.pageImages.bioParallax;
export const selectVisualizationsImages = (state) =>
  state.mainPageImages.pageImages.visualizations;
export const selectGalleryParallaxImage = (state) =>
  state.mainPageImages.pageImages.galleryParallax;
export const selectContactImages = (state) =>
  state.mainPageImages.pageImages.contact;
export const selectBigContactImage = (state) =>
  state.mainPageImages.pageImages.contactBig;
export const selectSmallContactImages = (state) =>
  state.mainPageImages.pageImages.contactSmall;

export default mainPageImagesSlice.reducer;
