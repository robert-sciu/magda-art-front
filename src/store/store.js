import { configureStore } from "@reduxjs/toolkit";

import mainPageContentReducer from "../containers/mainPage/mainPageContentSlice";
import mainPageImagesReducer from "../containers/mainPage/mainPageImagesSlice";
import galleryPageReducer from "../containers/GalleryContainer/galleryPageSlice";
import loadingStateReducer from "./loadingStateSlice";

export default configureStore({
  reducer: {
    mainPageContent: mainPageContentReducer,
    mainPageImages: mainPageImagesReducer,
    galleryPage: galleryPageReducer,
    loadingState: loadingStateReducer,
  },
});
