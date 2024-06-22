import { configureStore } from "@reduxjs/toolkit";

import mainPageContentReducer from "../containers/mainPage/mainPageUi/mainPageContentSlice";
import mainPageImagesReducer from "../containers/mainPage/mainPageUi/mainPageImagesSlice";
import galleryPageReducer from "../containers/galleryPage/galleryPageUi/galleryPageSlice";
import loadingStateReducer from "./loadingStateSlice";
import RootNavReducer from "../containers/rootNav/rootNavSlice";
import authReducer from "../containers/admin/loginSlice";

export default configureStore({
  reducer: {
    mainPageContent: mainPageContentReducer,
    mainPageImages: mainPageImagesReducer,
    galleryPage: galleryPageReducer,
    loadingState: loadingStateReducer,
    rootNav: RootNavReducer,
    auth: authReducer,
  },
});
