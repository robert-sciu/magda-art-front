import { createSlice } from "@reduxjs/toolkit";

export const loadingStateSlice = createSlice({
  name: "loadingState",
  initialState: { filesLoaded: false, heroImageReady: false },
  reducers: {
    setFilesLoaded: (state, action) => {
      state.filesLoaded = action.payload;
    },
    // setHeroImageReady: (state, action) => {
    //   state.heroImageReady = action.payload;
    // },
  },
});

export const filesLoaded = (state) => state.loadingState.filesLoaded;
// export const heroImageReady = (state) => state.loadingState.heroImageReady;

export const { setFilesLoaded } = loadingStateSlice.actions;

export default loadingStateSlice.reducer;
