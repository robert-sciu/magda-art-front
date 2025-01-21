import React from "react";
import { Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Spinner from "./components/common/spinner/Spinner.jsx";

const rootNavPromise = import("./containers/rootNav/RootNav.jsx");
//prettier-ignore
const mainPageUiPromise = import("./containers/mainPage/mainPageUi/MainPageUi.jsx");

import "./App.scss";
import LoadingState from "./components/loadingState/loadingState.jsx";
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
  import("./containers/admin/textEditor/TextEditor.jsx")
);
const LazyPageImagesUploadManager = React.lazy(() =>
  import(
    "./containers/admin/pageImagesUploadManager/pageImagesUploadManager.jsx"
  )
);

const LazyGalleryImagesUploadManager = React.lazy(() =>
  import(
    "./containers/admin/galleryImagesUploadManager/galleryImagesUploadManager.jsx"
  )
);

const LazyAdminStart = React.lazy(() =>
  import("./containers/admin/adminStart/AdminStart.jsx")
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
  return (
    <div className="appContainer">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingState />}>
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
                <Suspense>
                  <LazyGalleryPageUi />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingState />}>
                  <LazyLogin />
                </Suspense>
              }
            />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<LoadingState />}>
                  <LazyPotectedRoute>
                    <LazyAdminNav />
                  </LazyPotectedRoute>
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<LoadingState />}>
                    <LazyAdminStart />
                  </Suspense>
                }
              />
              <Route
                path="texts"
                element={
                  <Suspense fallback={<LoadingState />}>
                    <LazyTextEditor />
                  </Suspense>
                }
              />
              <Route
                path="images/pageImages"
                element={
                  <Suspense fallback={<LoadingState />}>
                    <LazyPageImagesUploadManager />
                  </Suspense>
                }
              />
              <Route
                path="images/galleryImages"
                element={
                  <Suspense fallback={<LoadingState />}>
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
