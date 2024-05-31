import { configureStore } from "@reduxjs/toolkit";

import mainPageContentReducer from "../containers/mainPage/mainPageContentSlice";
import mainPageImagesReducer from "../containers/mainPage/mainPageImagesSlice";
import galleryPageReducer from "../containers/gallery/galleryPageSlice";
import loadingStateReducer from "./loadingStateSlice";
import RootNavReducer from "../containers/rootNav/rootNavSlice";

export default configureStore({
  reducer: {
    mainPageContent: mainPageContentReducer,
    mainPageImages: mainPageImagesReducer,
    galleryPage: galleryPageReducer,
    loadingState: loadingStateReducer,
    rootNav: RootNavReducer,
  },
});
