import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  extractErrorResponse,
  extractResponseData,
} from "../utilities";
import apiClient from "../api/api";
import { populatePageImagesState } from "../utilities/reduxUtilities";

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
      apiClient.defaults.headers["Content-Type"] = "application/json";
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
  async ({ data, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("JSON", JSON.stringify(data));
    try {
      const response = await apiClient.post(
        `${api_url}/admin/pageImages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
      hero: [],
      welcome: [],
      bioParallax: [],
      bio: [],
      galleryParallax: [],
      visualizations: [],
      contactBig: [],
      contactSmall: [],
      contact: [],
    },
    commonImages: {
      socials: [],
      logo: [],
    },
    sectionInView: {
      hero: false,
      welcome: false,
      bioParallax: false,
      bio: false,
      galleryParallax: false,
      visualizations: false,
      contactBig: false,
      contactSmall: false,
      contact: false,
    },

    isLoading: false,
    hasError: false,
    error: null,

    pageImagesFetchComplete: false,
    commonImagesFetchComplete: false,
    roleToRefetch: null,
    refetchNeeded: false,
  },
  reducers: {
    setRoleToRefetch(state, action) {
      state.roleToRefetch = action.payload;
    },
    setSectionInView(state, action) {
      state.sectionInView[action.payload] = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageImages.pending, managePendingState)
      .addCase(fetchPageImages.fulfilled, (state, action) => {
        state.pageImagesFetchComplete = true;
        populatePageImagesState({
          state,
          action,
        });
        manageFulfilledState(state);
      })
      .addCase(fetchPageImages.rejected, manageRejectedState)

      .addCase(fetchCommonImages.pending, managePendingState)
      .addCase(fetchCommonImages.fulfilled, (state, action) => {
        state.commonImagesFetchComplete = true;
        populatePageImagesState({
          state,
          action,
          commonOnly: true,
        });
        manageFulfilledState(state);
      })
      .addCase(fetchCommonImages.rejected, manageRejectedState)

      .addCase(fetchPageImagesForRole.pending, managePendingState)
      .addCase(fetchPageImagesForRole.fulfilled, (state, action) => {
        state.refetchNeeded = false;
        populatePageImagesState({
          state,
          action,
          role: state.roleToRefetch,
        });
        state.roleToRefetch = null;
        manageFulfilledState(state);
      })
      .addCase(fetchPageImagesForRole.rejected, manageRejectedState)

      .addCase(uploadPageImage.pending, managePendingState)
      .addCase(uploadPageImage.fulfilled, (state) => {
        manageFulfilledState(state);
        state.refetchNeeded = true;
      })
      .addCase(uploadPageImage.rejected, manageRejectedState)

      .addCase(deletePageImage.pending, managePendingState)
      .addCase(deletePageImage.fulfilled, (state) => {
        manageFulfilledState(state);
        state.refetchNeeded = true;
      })
      .addCase(deletePageImage.rejected, manageRejectedState);
  },
});

export const { setRoleToRefetch, setSectionInView } =
  mainPageImagesSlice.actions;
export const selectLogoImage = (state) =>
  state.mainPageImages.commonImages.logo;
export const selectSocialIcons = (state) =>
  state.mainPageImages.commonImages.socials;
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

export const selectPageImagesLoadingStatus = (state) =>
  state.mainPageImages.isLoading;

export const selectPageImagesFetchStatus = (state) =>
  state.mainPageImages.pageImagesFetchComplete;

export const selectCommonImagesFetchStatus = (state) =>
  state.mainPageImages.commonImagesFetchComplete;

export const selectSectionInView = (state, section) =>
  state.mainPageImages.sectionInView[section];

export default mainPageImagesSlice.reducer;
