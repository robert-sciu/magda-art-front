import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  extractErrorResponse,
  extractResponseData,
} from "../utilities";
import apiClient from "../api/api";
import {
  clearPageImageStateForRoleToRefetch,
  populatePageImagesState,
} from "../utilities/reduxUtilities";

const api_url = import.meta.env.VITE_API_BASE_URL;

export const fetchPageImages = createAsyncThunk(
  "mainPageImages/fetchPageImages",
  async (_, { rejectWithValue }) => {
    try {
      const pageImages = await apiClient.get(`${api_url}/pageImages`);
      return extractResponseData(pageImages);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const fetchCommonImages = createAsyncThunk(
  "mainPageImages/fetchCommonImages",
  async (_, { rejectWithValue }) => {
    try {
      const commonImages = await apiClient.get(`${api_url}/pageImages/common`);
      return extractResponseData(commonImages);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const fetchPageImagesForRole = createAsyncThunk(
  "mainPageImages/fetchPageImagesForRole",
  async (role, { rejectWithValue }) => {
    try {
      const pageImages = await apiClient.get(
        `${api_url}/admin/pageImages/${role}`
      );
      return extractResponseData(pageImages);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const uploadPageImage = createAsyncThunk(
  "mainPageImages/uploadPageImage",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `${api_url}/admin/pageImages`,
        data
      );
      return extractResponseData(response);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const deletePageImage = createAsyncThunk(
  "mainPageImages/deletePageImage",
  async ({ id }, { rejectWithValue }) => {
    try {
      await apiClient.delete(`${api_url}/admin/pageImages/${id}`);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const mainPageImagesSlice = createSlice({
  name: "mainPageImages",
  initialState: {
    pageImages: {
      common: {
        socials: {},
        logo: {},
      },
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
    error: null,

    roleToRefetch: null,
    refetchNeeded: false,
  },
  reducers: {
    setRoleToRefetch(state, action) {
      state.roleToRefetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch content cases ////////////////////////////////////////////////////////////
    builder
      .addCase(fetchPageImages.pending, managePendingState)
      .addCase(fetchPageImages.fulfilled, (state, action) => {
        populatePageImagesState({
          state,
          action,
          commonRoles: Object.keys(state.pageImages.common),
        });
        manageFulfilledState(state);
      })
      .addCase(fetchPageImages.rejected, manageRejectedState)

      .addCase(fetchCommonImages.pending, managePendingState)
      .addCase(fetchCommonImages.fulfilled, (state, action) => {
        populatePageImagesState({
          state,
          action,
          commonRoles: Object.keys(state.pageImages.common),
        });
        manageFulfilledState(state);
      })
      .addCase(fetchCommonImages.rejected, manageRejectedState)

      .addCase(deletePageImage.pending, managePendingState)
      .addCase(deletePageImage.fulfilled, (state) => {
        manageFulfilledState(state);
        state.refetchNeeded = true;
      })
      .addCase(deletePageImage.rejected, manageRejectedState)

      .addCase(fetchPageImagesForRole.pending, managePendingState)
      .addCase(fetchPageImagesForRole.fulfilled, (state, action) => {
        clearPageImageStateForRoleToRefetch({
          state,
          commonRoles: Object.keys(state.pageImages.common),
        });

        populatePageImagesState({
          state,
          action,
          commonRoles: Object.keys(state.pageImages.common),
        });

        state.roleToRefetch = null;
        state.refetchNeeded = false;
        manageFulfilledState(state);
      })
      .addCase(fetchPageImagesForRole.rejected, manageRejectedState);
  },
});

export const { setRoleToRefetch } = mainPageImagesSlice.actions;
export const selectLogoImage = (state) =>
  state.mainPageImages.pageImages.common.logo;

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

export const selectPageImagesRoleToRefetch = (state) =>
  state.mainPageImages.roleToRefetch;
export const selectPageImagesRefetchNeeded = (state) =>
  state.mainPageImages.refetchNeeded;

export default mainPageImagesSlice.reducer;
