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
    const images = await fetch("http://localhost:4000/api/v1/paintings");
    const data = await images.json();
    return data;
  }
);

export const galleryPageSlice = createSlice({
  name: "galleryPage",
  initialState: {
    images: [],
    columns: {},
    isLoadingContent: false,
    hasError: false,
  },
  reducers: {
    createImageColumns: (state, action) => {
      for (let i = 1; i <= action.payload; i++) {
        state.columns[`column-${i}`] = { height: 0, paintings: [] };
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
        const gapSize = parseFloat(scss.sizeXxxs) * 16;
        state.columns[lowestCol].height += image.height_px + gapSize;
        state.columns[lowestCol].paintings.push(image);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, managePendingState);
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      manageFulfilledState(state);
      state.images = action.payload;
    });
    builder.addCase(fetchImages.rejected, manageRejectedState);
  },
});

export const selectAllImages = (state) => state.galleryPage.images;

export const { createImageColumns, populateColumns } = galleryPageSlice.actions;

export default galleryPageSlice.reducer;
