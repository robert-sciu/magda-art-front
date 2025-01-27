import React, { useEffect } from "react";
import { Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Spinner from "./components/common/spinner/Spinner.jsx";

const rootNavPromise = import("./containers/rootNav/RootNav.jsx");
//prettier-ignore
const mainPageUiPromise = import("./containers/mainPage/mainPageUi/MainPageUi.jsx");

import "./App.scss";
import LoadingState from "./components/loadingState/loadingState.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectLazyLoadStatus } from "./store/galleryPageSlice.js";
import {
  selectAppLoaded,
  selectLocation,
  setAppLoaded,
} from "./store/rootNavSlice.js";
import { selectSectionInView } from "./store/mainPageImagesSlice.js";
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";
// import GrayBackground from "./components/common/grayBackground/GrayBackground.jsx";

const LazyRootNav = React.lazy(() => rootNavPromise);

const LazyMainPageUi = React.lazy(() => mainPageUiPromise);

const LazyGalleryPageUi = React.lazy(() =>
  import("./containers/galleryPage/galleryPageUi/GalleryPageUi.jsx")
);
const LazyLogin = React.lazy(() =>
  import("./containers/admin/login/Login.jsx")
);
const LazyAdminNav = React.lazy(() =>
  import("./containers/admin/adminNav/AdminNav.jsx")
);
const LazyTextEditor = React.lazy(() =>
  import("./containers/admin/pageTextsManager/PageTextsManager.jsx")
);
const LazyPageImagesUploadManager = React.lazy(() =>
  import(
    "./containers/admin/pageImagesUploadManager/PageImagesUploadManager.jsx"
  )
);

const LazyGalleryImagesUploadManager = React.lazy(() =>
  import(
    "./containers/admin/galleryImagesUploadManager/GalleryImagesUploadManager.jsx"
  )
);

const LazyAdminStart = React.lazy(() =>
  import("./components/Admin/adminStart/AdminStart.jsx")
);

const LazyPotectedRoute = React.lazy(() =>
  import("./containers/admin/protectedRoute/protectedRoute.jsx")
);

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */

function App() {
  const location = useSelector(selectLocation);
  const appLoaded = useSelector(selectAppLoaded);
  const galleryLazyLoaded = useSelector(selectLazyLoadStatus);
  const heroSectionInView = useSelector((state) =>
    selectSectionInView(state, "hero")
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (appLoaded) return;
    if (!location) return;
    dispatch(setAppLoaded(true));
  });

  return (
    <div className="appContainer">
      {location === "/" && <LoadingState fadeOut={heroSectionInView} />}
      {location === "/gallery" && <LoadingState fadeOut={galleryLazyLoaded} />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div className="grayBg"></div>}>
                <LazyRootNav />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense>
                  <LazyMainPageUi />
                </Suspense>
              }
            />
            <Route
              path="/gallery"
              element={
                <Suspense fallback={<div className="grayBg"></div>}>
                  <LazyGalleryPageUi />
                </Suspense>
              }
            />

            <Route
              path="/login"
              element={
                <Suspense>
                  <LazyLogin />
                </Suspense>
              }
            />
            <Route
              path="/admin"
              element={
                <Suspense>
                  <LazyPotectedRoute>
                    <LazyAdminNav />
                  </LazyPotectedRoute>
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense>
                    <LazyAdminStart />
                  </Suspense>
                }
              />
              <Route
                path="texts"
                element={
                  <Suspense>
                    <LazyTextEditor />
                  </Suspense>
                }
              />
              <Route
                path="images/pageImages"
                element={
                  <Suspense>
                    <LazyPageImagesUploadManager />
                  </Suspense>
                }
              />
              <Route
                path="images/galleryImages"
                element={
                  <Suspense>
                    <LazyGalleryImagesUploadManager />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
