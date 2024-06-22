import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RootNav from "./containers/rootNav/RootNav";
import MainPageUi from "./containers/mainPage/mainPageUi/MainPageUi.jsx";
import GalleryPage from "./containers/galleryPage/galleryPageUi/GalleryPageUi.jsx";
import Login from "./containers/admin/Login";
import Admin from "./containers/admin/Admin";

import { setFilesLoaded, filesLoaded } from "./store/loadingStateSlice.js";
import { fetchContent } from "./containers/mainPage/mainPageUi/mainPageContentSlice.js";
import { fetchPageImages } from "./containers/mainPage/mainPageUi/mainPageImagesSlice.js";
import { fetchImages } from "./containers/galleryPage/galleryPageUi/galleryPageSlice.js";

import "./App.scss";

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
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
