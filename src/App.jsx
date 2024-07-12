import React, { useEffect } from "react";
import { Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Spinner from "./components/common/spinner/Spinner.jsx";

const rootNavPromise = import("./containers/rootNav/RootNav.jsx");
//prettier-ignore
const mainPageUiPromise = import("./containers/mainPage/mainPageUi/MainPageUi.jsx");

import "./App.scss";
import GrayBackground from "./components/common/grayBackground/GrayBackground.jsx";

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
const LazyImagesUploadManager = React.lazy(() =>
  import("./containers/admin/pageImagesUpload/ImagesUploadManager.jsx")
);
const LazyAdminStart = React.lazy(() =>
  import("./containers/admin/adminStart/AdminStart.jsx")
);

const api_url = import.meta.env.VITE_API_BASE_URL;

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */

function App() {
  useEffect(() => {
    fetch(`${api_url}/nonce`)
      .then((response) => response.json())
      .then((data) => {
        const nonce = data.nonce;
        const script = document.createElement("script");
        script.setAttribute("nonce", nonce);
        script.textContent = `console.log('Nonce script running')`;
        document.head.appendChild(script);
      })
      .catch((error) => console.error("Error fetching nonce:", error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<GrayBackground />}>
              <LazyRootNav />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<GrayBackground />}>
                <LazyMainPageUi />
              </Suspense>
            }
          />
          <Route
            path="/gallery"
            element={
              <Suspense fallback={<GrayBackground />}>
                <LazyGalleryPageUi />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Spinner />}>
                <LazyLogin />
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
