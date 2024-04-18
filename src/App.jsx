import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Root from "./containers/rootNav/RootNav";
import MainPage from "./containers/mainPage/MainPage";
import GalleryPage from "./containers/gallery/GalleryPage";

function App() {
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
