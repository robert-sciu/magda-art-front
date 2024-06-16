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
    console.log("refetching");
    const pageImages = await fetch("http://localhost:4000/api/v1/pageImages");
    const data = await pageImages.json();
    return data;
  }
);

export const mainPageImagesSlice = createSlice({
  name: "mainPageImages",
  initialState: {
    pageImages: {
      welcome: {},
      bio: {},
      socials: {},
      visualizations: {},
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
      action.payload.data.forEach((imageObject) => {
        if (roles.includes(imageObject.role)) {
          state.pageImages[imageObject.role][imageObject.name] =
            createImageObject(imageObject);
          return;
        }
        state.pageImages[imageObject.role] = createImageObject(imageObject);
      });
      manageFulfilledState(state);
    });

    builder.addCase(fetchPageImages.rejected, manageRejectedState);
  },
});

export const selectAllPageImages = (state) => state.mainPageImages.pageImages;
export const selectHeroImage = (state) => state.mainPageImages.pageImages.hero;
// export const selectLogoImage = (state) => state.mainPageImages.pageImages.logo;
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

export default mainPageImagesSlice.reducer;
