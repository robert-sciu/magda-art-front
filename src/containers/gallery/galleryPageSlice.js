import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
} from "../../utilities";

export const fetchImages = createAsyncThunk(
  "galleryPage/fetchImages",
  async () => {
    const images = await fetch("http://localhost:4000/api/v1/paintings");
    const data = await images.json();
    console.log(data);
    return data;
  }
);

export const galleryPageSlice = createSlice({
  name: "galleryPage",
  initialState: { images: [], isLoadingContent: false, hasError: false },
  reducers: {},
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

export default galleryPageSlice.reducer;
