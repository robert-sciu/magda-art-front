import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  createArrayFromObject,
} from "../../../utilities";

import scss from "../../../../styles/variables.module.scss";

const api_url = import.meta.env.VITE_API_BASE_URL;

export const fetchImages = createAsyncThunk(
  "galleryPage/fetchImages",
  async () => {
    const images = await fetch(`${api_url}/paintings`);
    const data = await images.json();
    return data;
  }
);

export const fetchFullResImg = createAsyncThunk(
  "galleryPage/fetchFullResImg",
  async (imageId) => {
    const fullResImg = await fetch(
      `${api_url}/paintings/fullRes?paintingId=${parseInt(imageId)}`
    );
    const data = await fullResImg.json();
    return data;
  }
);

export const galleryPageSlice = createSlice({
  name: "galleryPage",
  initialState: {
    images: [],
    clickedImage: null,
    fullResImg: null,
    columns: {},
    fillers: null,
    isLoadingContent: false,
    hasError: false,
  },
  reducers: {
    createImageColumns: (state, action) => {
      state.columns = {};
      for (let i = 1; i <= action.payload; i++) {
        state.columns[`column-${i}`] = {
          height: 0,
          isHighest: false,
          paintings: [],
        };
      }
    },
    /**
     * Populates the columns with paintings and fillers.
     *
     * @param {Array} action.payload.paintings - An array of paintings to be added to the columns.
     * @param {Array} action.payload.fillers - An array of fillers to be added to the columns.
     * @return {void} This function does not return anything.
     */
    populateColumns: (state, action) => {
      state.fillers = action.payload.fillers;
      action.payload.paintings.forEach((image) => {
        const colHeights = createArrayFromObject(state.columns).map(
          (col) => col.height
        );
        const lowestColHeight = Math.min(...colHeights);
        const lowestCol = Object.keys(state.columns).find(
          (col) => state.columns[col].height === lowestColHeight
        );
        const gapSize = parseFloat(scss.sizeXxxs);
        state.columns[lowestCol].height += image.height_px + gapSize;
        state.columns[lowestCol].paintings.push(image);
      });
      const colHeights = createArrayFromObject(state.columns).map(
        (col) => col.height
      );
      const highestColHeight = Math.max(...colHeights);
      const highestCol = Object.keys(state.columns).find(
        (col) => state.columns[col].height === highestColHeight
      );
      state.columns[highestCol].isHighest = true;

      Object.values(state.columns).forEach((column) => {
        const columnFreeSpace = highestColHeight - column.height;
        const minimumFreeSpace = 300;
        if (columnFreeSpace > minimumFreeSpace && state.fillers.length > 0) {
          const filler = state.fillers.shift();
          column.filler = filler.type;
        }
      });
    },
    setClickedImage: (state, action) => {
      state.clickedImage = action.payload;
    },
    resetClickedImage: (state) => {
      state.clickedImage = null;
      state.fullResImg = null;
    },
    setFillers: (state, action) => {
      state.fillers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, managePendingState);
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = action.payload;
      manageFulfilledState(state);
    });
    builder.addCase(fetchImages.rejected, manageRejectedState);
    builder.addCase(fetchFullResImg.pending, managePendingState);
    builder.addCase(fetchFullResImg.fulfilled, (state, action) => {
      state.fullResImg = action.payload;
      manageFulfilledState(state);
    });
    builder.addCase(fetchFullResImg.rejected, manageRejectedState);
  },
});

export const selectAllImages = (state) => state.galleryPage.images;
export const selectFullResImg = (state) => state.galleryPage.fullResImg;
export const selectAllColumns = (state) => state.galleryPage.columns;
export const selectClickedImage = (state) => state.galleryPage.clickedImage;
export const selectAllFillers = (state) => state.galleryPage.fillers;

export const {
  createImageColumns,
  populateColumns,
  setClickedImage,
  resetClickedImage,
  setFillers,
} = galleryPageSlice.actions;

export default galleryPageSlice.reducer;
