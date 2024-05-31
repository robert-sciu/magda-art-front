import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../../components/common/spinner/Spinner.jsx";

import styles from "./galleryPage.module.scss";
import {
  populateColumns,
  selectAllImages,
  createImageColumns,
  selectAllColumns,
} from "../gallery/galleryPageSlice.js";
import GalleryOverlay from "../../components/Gallery/galleryOverlay/GalleryOverlay.jsx";
import GalleryColumn from "../../components/Gallery/galleryColumn/GalleryColumn.jsx";

export default function GalleryPage() {
  const dispatch = useDispatch();

  const [galleryColumns, setGalleryColumns] = useState(null);
  const [numberOfColumns, setNumberOfColumns] = useState(null);
  const [columnsReady, setColumnsReady] = useState(false);

  const { data: paintings } = useSelector(selectAllImages);
  const columns = useSelector(selectAllColumns);

  function getNumberOfColumns() {
    const width = window.innerWidth;
    if (width >= 2800) return 6;
    if (width >= 2000) return 5;
    if (width >= 1702) return 4;
    if (width >= 1268) return 3;
    if (width >= 1000) return 2;
    return 1;
  }

  useEffect(() => {
    setNumberOfColumns(getNumberOfColumns());
  }, []);

  useEffect(() => {
    function handleResize() {
      setNumberOfColumns(getNumberOfColumns());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [numberOfColumns]);

  useEffect(() => {
    dispatch(createImageColumns(numberOfColumns));
  }, [dispatch, numberOfColumns]);

  useEffect(() => {
    if (paintings && numberOfColumns) {
      dispatch(populateColumns(paintings));
    }
  }, [paintings, dispatch, numberOfColumns]);

  useEffect(() => {
    if (columns) {
      setGalleryColumns(columns);
      setColumnsReady(true);
    }
  }, [columns]);

  return (
    <div className={styles.galleryPage}>
      {columnsReady ? (
        Object.entries(galleryColumns).map((column) => {
          return <GalleryColumn column={column[1].paintings} key={column[0]} />;
        })
      ) : (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
      <GalleryOverlay />
    </div>
  );
}
