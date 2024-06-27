import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  managePendingState,
  manageFulfilledState,
  manageRejectedState,
  createImageObject,
} from "../../utilities";

const api_url = import.meta.env.VITE_API_BASE_URL;

export const fetchCommonImages = createAsyncThunk(
  "rootNav/fetchCommonImages",
  async () => {
    const commonImages = await fetch(`${api_url}/pageImages/common`);
    const data = await commonImages.json();
    return data;
  }
);

export const rootNavSlice = createSlice({
  name: "rootNav",
  initialState: {
    common: { socials: {}, logo: {}, windowWidth: undefined },
    isLoadingContent: false,
    hasError: false,
  },

  reducers: {
    setWindowWidth: (state, action) => {
      state.common.windowWidth = action.payload;
    },
  },

  extraReducers: (builder) => {
    // fetch content cases ////////////////////////////////////////////////////////////
    builder.addCase(fetchCommonImages.pending, managePendingState);
    builder.addCase(fetchCommonImages.fulfilled, (state, action) => {
      const rolesToClear = ["logo", "socials"];
      rolesToClear.forEach((role) => {
        state.common[role] = {};
      });
      action.payload.data.forEach((imageObject) => {
        if (imageObject.role === "socials") {
          state.common.socials[imageObject.name] =
            createImageObject(imageObject);
          return;
        }
        state.common[imageObject.role][imageObject.name] =
          createImageObject(imageObject);
      });
      manageFulfilledState(state);
    });

    builder.addCase(fetchCommonImages.rejected, manageRejectedState);
  },
});

export const selectLogoImage = (state) => state.rootNav.common.logo;
export const selectSocialsIcons = (state) => state.rootNav.common.socials;
export const selectWindowWidth = (state) => state.rootNav.common.windowWidth;

export const { setWindowWidth } = rootNavSlice.actions;

export default rootNavSlice.reducer;
