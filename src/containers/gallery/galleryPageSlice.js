import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
} from "../../utilities";
import scss from "../../../styles/variables.module.scss";

export const fetchImages = createAsyncThunk(
  "galleryPage/fetchImages",
  async () => {
    const images = await fetch(`http://localhost:4000/api/v1/paintings`);
    const data = await images.json();
    return data;
  }
);

export const fetchFullResImg = createAsyncThunk(
  "galleryPage/fetchFullResImg",
  async (imageId) => {
    const fullResImg = await fetch(
      `http://localhost:4000/api/v1/paintings/fullRes?imageId=${parseInt(
        imageId
      )}`
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
    populateColumns: (state, action) => {
      action.payload.forEach((image) => {
        const colHeights = Object.values(state.columns).map(
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
      const colHeights = Object.values(state.columns).map((col) => col.height);
      const highestColHeight = Math.max(...colHeights);
      const highestCol = Object.keys(state.columns).find(
        (col) => state.columns[col].height === highestColHeight
      );
      state.columns[highestCol].isHighest = true;
    },
    setClickedImage: (state, action) => {
      state.clickedImage = action.payload;
    },
    resetClickedImage: (state) => {
      state.clickedImage = null;
      state.fullResImg = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, managePendingState);
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      manageFulfilledState(state);
      state.images = action.payload;
    });
    builder.addCase(fetchImages.rejected, manageRejectedState);

    builder.addCase(fetchFullResImg.pending, managePendingState);
    builder.addCase(fetchFullResImg.fulfilled, (state, action) => {
      manageFulfilledState(state);
      state.fullResImg = action.payload;
    });
    builder.addCase(fetchFullResImg.rejected, manageRejectedState);
  },
});

export const selectAllImages = (state) => state.galleryPage.images;
export const selectFullResImg = (state) => state.galleryPage.fullResImg;
export const selectAllColumns = (state) => state.galleryPage.columns;
export const selectClickedImage = (state) => state.galleryPage.clickedImage;

export const {
  createImageColumns,
  populateColumns,
  setClickedImage,
  resetClickedImage,
} = galleryPageSlice.actions;

export default galleryPageSlice.reducer;
