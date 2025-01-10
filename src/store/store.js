import { configureStore } from "@reduxjs/toolkit";

import mainPageContentReducer from "./mainPageContentSlice";
import mainPageImagesReducer from "./mainPageImagesSlice";
import galleryPageReducer from "../containers/galleryPage/galleryPageUi/galleryPageSlice";
import rootNavReducer from "../containers/rootNav/rootNavSlice";
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
