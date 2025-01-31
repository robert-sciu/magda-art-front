import { createSlice } from "@reduxjs/toolkit";

export const rootNavSlice = createSlice({
  name: "rootNav",
  initialState: {
    common: {
      windowWidth: undefined,
      location: "",
      fixedNav: false,
      device: "desktop",
      widthType: undefined,
      mobileNavOpen: false,
    },
    isLoadingContent: false,
    hasError: false,
    appLoaded: false,
  },

  reducers: {
    setWindowWidth: (state, action) => {
      state.common.windowWidth = action.payload;
    },

    setLocation: (state, action) => {
      state.common.location = action.payload;
    },

    setFixedNav: (state, action) => {
      state.common.fixedNav = action.payload;
    },

    setWidthType: (state, action) => {
      state.common.widthType = action.payload;
    },

    setAppLoaded: (state, action) => {
      state.appLoaded = action.payload;
    },

    setDevice: (state, action) => {
      if (state.common.device === action.payload) return;
      const device = action.payload;
      if (device === "mobile") {
        state.common.device = device;
        return;
      } else if (device === "desktop") {
        state.common.device = device;
        return;
      } else {
        state.common.device = "mobile";
      }
    },
    setMobileNavIsOpen: (state, action) => {
      state.common.mobileNavOpen = action.payload;
    },
  },
});

export const selectWindowWidth = (state) => state.rootNav.common.windowWidth;
export const selectLocation = (state) => state.rootNav.common.location;
export const selectFixedNav = (state) => state.rootNav.common.fixedNav;
export const selectDevice = (state) => state.rootNav.common.device;
export const selectWidthType = (state) => state.rootNav.common.widthType;

export const selectAppLoaded = (state) => state.rootNav.appLoaded;

export const selectMobileNavIsOpen = (state) =>
  state.rootNav.common.mobileNavOpen;

export const {
  setWindowWidth,
  setLocation,
  setFixedNav,
  setDevice,
  setWidthType,
  setWidth,
  setAppLoaded,
  setInitialLoadStateDisabled,
  setMobileNavIsOpen,
} = rootNavSlice.actions;

export default rootNavSlice.reducer;
