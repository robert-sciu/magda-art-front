import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Root from "./containers/rootNav/RootNav";
import MainPage from "./containers/mainPage/MainPage";
import GalleryPage from "./containers/gallery/GalleryPage.jsx";

import { setFilesLoaded } from "./store/loadingStateSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useSelector } from "react-redux";

import { filesLoaded } from "./store/loadingStateSlice.js";

import { fetchContent } from "./containers/mainPage/mainPageContentSlice.js";
import { fetchPageImages } from "./containers/mainPage/mainPageImagesSlice.js";
import { fetchImages } from "./containers/gallery/galleryPageSlice.js";

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
        <Route path="/" element={<Root />}>
          <Route index element={<MainPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
