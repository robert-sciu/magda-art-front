import React from "react";
import { Suspense, useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RootNav from "./containers/rootNav/RootNav";
import MainPageUi from "./containers/mainPage/mainPageUi/MainPageUi.jsx";
import Spinner from "./components/common/spinner/Spinner.jsx";
// import Login from "./containers/admin/login/Login.jsx";
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
const LazyImagesUploadManager = React.lazy(() =>
  import("./containers/admin/pageImagesUpload/ImagesUploadManager.jsx")
);
const LazyAdminStart = React.lazy(() =>
  import("./containers/admin/adminStart/AdminStart.jsx")
);

import { setFilesLoaded, filesLoaded } from "./store/loadingStateSlice.js";
import { fetchContent } from "./containers/mainPage/mainPageUi/mainPageContentSlice.js";
import { fetchPageImages } from "./containers/mainPage/mainPageUi/mainPageImagesSlice.js";

import "./App.scss";
import { fetchImages } from "./containers/galleryPage/galleryPageUi/galleryPageSlice.js";

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */

function App() {
  const dispatch = useDispatch();
  const loadState = useSelector(filesLoaded);
  useEffect(() => {
    window.addEventListener("load", function () {
      dispatch(setFilesLoaded(true));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!loadState) return;
    dispatch(fetchContent());
    dispatch(fetchPageImages());
    dispatch(fetchImages());
  }, [dispatch, loadState]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootNav />}>
          <Route index element={<MainPageUi />} />
          <Route
            path="/gallery"
            element={
              <Suspense fallback={<Spinner />}>
                <LazyGalleryPageUi />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Spinner />}>
                <LazyLogin />{" "}
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<Spinner />}>
                <LazyAdminNav />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Spinner />}>
                  <LazyAdminStart />
                </Suspense>
              }
            />
            <Route
              path="texts"
              element={
                <Suspense fallback={<Spinner />}>
                  <LazyTextEditor />
                </Suspense>
              }
            />
            <Route
              path="images/:uploadSection"
              element={
                <Suspense fallback={<Spinner />}>
                  <LazyImagesUploadManager />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
