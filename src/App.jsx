import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RootNav from "./containers/rootNav/RootNav";
import MainPageUi from "./containers/mainPage/mainPageUi/MainPageUi.jsx";
import GalleryPage from "./containers/galleryPage/galleryPageUi/GalleryPageUi.jsx";
import Login from "./containers/admin/login/Login.jsx";

import { setFilesLoaded, filesLoaded } from "./store/loadingStateSlice.js";
import { fetchContent } from "./containers/mainPage/mainPageUi/mainPageContentSlice.js";
import { fetchPageImages } from "./containers/mainPage/mainPageUi/mainPageImagesSlice.js";
import { fetchImages } from "./containers/galleryPage/galleryPageUi/galleryPageSlice.js";

import "./App.scss";
import AdminNav from "./containers/admin/adminNav/AdminNav.jsx";
import TextEditor from "./containers/admin/textEditor/TextEditor.jsx";
import PageImagesUpload from "./containers/admin/pageImagesUpload/PageImagesUpload.jsx";
import AdminStart from "./containers/admin/adminStart/AdminStart.jsx";
// import GalleryImagesUpload from "./components/Admin/galleryImagesUploadForm/GalleryImagesUpload.jsx";

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
  });

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
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminNav />}>
            <Route index element={<AdminStart />} />
            <Route path="texts" element={<TextEditor />} />
            <Route
              path="images/:uploadSection"
              element={<PageImagesUpload />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
