import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../../components/common/spinner/Spinner.jsx";

import styles from "./galleryUi.module.scss";
import {
  fetchImages,
  populateColumns,
  selectAllImages,
} from "../GalleryContainer/galleryPageSlice.js";
import store from "../../store/store.js";

import { createImageColumns } from "../GalleryContainer/galleryPageSlice.js";
import GalleryColumn from "../../components/Gallery/galleryColumn/GalleryColumn.jsx";

export default function GalleryPage() {
  const dispatch = useDispatch();

  const [galleryColumns, setGalleryColumns] = useState(null);
  const [numberOfColumns, setNumberOfColumns] = useState(4);

  const { data: paintings } = useSelector(selectAllImages);

  useEffect(() => {
    dispatch(fetchImages());
    dispatch(createImageColumns(numberOfColumns));
  }, [dispatch, numberOfColumns]);

  useEffect(() => {
    if (paintings) {
      dispatch(populateColumns(paintings));
    }
  }, [paintings, dispatch]);

  const populatedColumns = store.getState().galleryPage.columns;

  useEffect(() => {
    if (Array.from(Object.keys(populatedColumns)).length > 0) {
      setGalleryColumns(populatedColumns);
    }
  }, [populatedColumns]);

  return (
    <div className={styles.galleryPage}>
      {galleryColumns ? (
        Object.entries(galleryColumns).map((column) => (
          <GalleryColumn column={column[1].paintings} key={column[0]} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}
