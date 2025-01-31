import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  extractResponseData,
  extractErrorResponse,
} from "../utilities/index";

import apiClient from "../api/api";
import { populateGalleryPageColumns } from "../utilities/reduxUtilities";

const api_url = import.meta.env.VITE_API_BASE_URL;

export const fetchGalleryImages = createAsyncThunk(
  "galleryPage/fetchGalleryImages",
  async (_, { rejectWithValue }) => {
    try {
      const images = await apiClient.get(`${api_url}/paintings`);
      return extractResponseData(images);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const uploadGalleryImage = createAsyncThunk(
  "galleryPage/uploadGalleryImage",
  async ({ data, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("JSON", JSON.stringify(data));
    try {
      const response = await apiClient.post(
        `${api_url}/admin/paintings`,
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

export const updateGalleryImage = createAsyncThunk(
  "galleryPage/updateGalleryImage",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(
        `${api_url}/admin/paintings/${id}`,
        data
      );
      return extractResponseData(response);
    } catch (error) {
      return rejectWithValue(extractErrorResponse(error));
    }
  }
);

export const deleteGalleryImage = createAsyncThunk(
  "galleryPage/deletePageImage",
  async ({ id }) => {
    try {
      await apiClient.delete(`${api_url}/admin/paintings/${id}`);
    } catch (error) {
      return extractErrorResponse(error);
    }
  }
);

export const galleryPageSlice = createSlice({
  name: "galleryPage",
  initialState: {
    galleryImages: [],
    imagesCount: 0,

    lazyLoadCount: 0,
    lazyIsLoaded: false,

    highQualityLoadCount: 0,
    highQualityIsLoaded: false,

    useBlur: true,

    clickedImage: null,
    imageToEdit: null,
    columns: {},
    fillers: null,

    updatedImageData: null,

    isLoading: false,
    hasError: false,
    error: null,
    fetchComplete: false,
    refetchNeeded: false,
  },
  reducers: {
    /**
     * Populates the columns with paintings and fillers.
     *
     * @param {Array} action.payload.paintings - An array of paintings to be added to the columns.
     * @param {Array} action.payload.fillers - An array of fillers to be added to the columns.
     * @return {void} This function does not return anything.
     */
    populateColumns: (state, action) => {
      populateGalleryPageColumns({ state, action });
      state.imagesCount = state.galleryImages.length;
    },
    setClickedImage: (state, action) => {
      state.clickedImage = action.payload;
    },
    setImgToEdit: (state, action) => {
      state.imageToEdit = action.payload;
    },
    resetClickedImage: (state) => {
      state.clickedImage = null;
    },
    resetImgToEdit: (state) => {
      state.updatedImageData = null;
    },
    setFillers: (state, action) => {
      state.fillers = action.payload;
    },
    clearGalleryErrors: (state) => {
      state.hasError = false;
      state.error = null;
    },
    increaseLazyLoadCount: (state) => {
      if (state.lazyIsLoaded) return;
      state.lazyLoadCount++;
      if (state.lazyLoadCount === state.imagesCount) {
        state.lazyIsLoaded = true;
      }
    },

    increaseHighQualityLoadCount: (state) => {
      if (state.highQualityIsLoaded) return;
      state.highQualityLoadCount++;
      if (state.highQualityLoadCount === state.imagesCount) {
        state.highQualityIsLoaded = true;
      }
    },
    disableBlur: (state) => {
      state.useBlur = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryImages.pending, managePendingState)
      .addCase(fetchGalleryImages.fulfilled, (state, action) => {
        state.galleryImages = action.payload;
        state.refetchNeeded = false;
        state.fetchComplete = true;
        manageFulfilledState(state);
      })
      .addCase(fetchGalleryImages.rejected, manageRejectedState)

      .addCase(uploadGalleryImage.pending, managePendingState)
      .addCase(uploadGalleryImage.fulfilled, (state) => {
        state.refetchNeeded = true;
        manageFulfilledState(state);
      })
      .addCase(uploadGalleryImage.rejected, manageRejectedState)

      .addCase(updateGalleryImage.pending, managePendingState)
      .addCase(updateGalleryImage.fulfilled, (state, action) => {
        state.refetchNeeded = true;
        state.updatedImageData = action.payload;
        manageFulfilledState(state);
      })
      .addCase(updateGalleryImage.rejected, manageRejectedState)

      .addCase(deleteGalleryImage.pending, managePendingState)
      .addCase(deleteGalleryImage.fulfilled, (state) => {
        state.updatedImageData = null;
        state.imageToEdit = null;
        state.refetchNeeded = true;
        manageFulfilledState(state);
      })
      .addCase(deleteGalleryImage.rejected, manageRejectedState);
  },
});

export const {
  populateColumns,
  setClickedImage,
  resetClickedImage,
  setFillers,
  clearGalleryErrors,
  increaseLazyLoadCount,
  finalizeColumnsReset,
  setColumnsReset,
  increaseHighQualityLoadCount,
  disableBlur,
  setImgToEdit,
  resetImgToEdit,
} = galleryPageSlice.actions;

export const selectGalleryPageImages = (state) =>
  state.galleryPage.galleryImages;
export const selectGalleryPageColumns = (state) => state.galleryPage.columns;
export const selectClickedImage = (state) => state.galleryPage.clickedImage;
export const selectImageToEdit = (state) => state.galleryPage.imageToEdit;
export const selectAllFillers = (state) => state.galleryPage.fillers;
export const selectGalleryPageImagesLoadingStatus = (state) =>
  state.galleryPage.isLoading;
export const selectGalleryPageImagesFetchStatus = (state) =>
  state.galleryPage.fetchComplete;
export const selectGalleryPageImagesErrorStatus = (state) =>
  state.galleryPage.hasError;
export const selectGalleryPageImagesErrorMessage = (state) =>
  state.galleryPage.error;
export const selectGalleryPageImagesRefetchNeeded = (state) =>
  state.galleryPage.refetchNeeded;
export const selectGalleryPageErrrorStatus = (state) =>
  state.galleryPage.hasError;
export const selectGalleryPageErrorMessage = (state) => state.galleryPage.error;
export const selectLazyLoadStatus = (state) => state.galleryPage.lazyIsLoaded;
export const selectGalleryFillers = (state) => state.galleryPage.fillers;
export const selectHighQualityLoadStatus = (state) =>
  state.galleryPage.highQualityIsLoaded;

export const selectUseBlurStatus = (state) => state.galleryPage.useBlur;
export const selectUpdatedImageData = (state) =>
  state.galleryPage.updatedImageData;

export default galleryPageSlice.reducer;
