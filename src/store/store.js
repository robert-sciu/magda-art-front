import { configureStore } from "@reduxjs/toolkit";

import mainPageContentReducer from "./mainPageContentSlice";
import mainPageImagesReducer from "./mainPageImagesSlice";
import galleryPageReducer from "./galleryPageSlice";
import rootNavReducer from "./rootNavSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    mainPageContent: mainPageContentReducer,
    mainPageImages: mainPageImagesReducer,
    galleryPage: galleryPageReducer,
    rootNav: rootNavReducer,
    auth: authReducer,
  },
});
