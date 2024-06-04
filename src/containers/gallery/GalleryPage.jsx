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
import Fillers from "../../components/Gallery/fillers/fillers.jsx";

export default function GalleryPage() {
  const dispatch = useDispatch();

  const [galleryColumns, setGalleryColumns] = useState(null);
  const [numberOfColumns, setNumberOfColumns] = useState(null);
  const [columnsReady, setColumnsReady] = useState(false);
  const [allFillers, setAllFillers] = useState([]);

  const { data: paintings } = useSelector(selectAllImages);
  const columns = useSelector(selectAllColumns);
  // const highestColHeight = useSelector(selectHighestColHeight);

  function getNumberOfColumns() {
    const width = window.innerWidth;
    if (width >= 3000) return 6;
    if (width >= 2500) return 5;
    if (width >= 2000) return 4;
    if (width >= 1268) return 3;
    if (width >= 1000) return 2;
    return 1;
  }

  useEffect(() => {
    setNumberOfColumns(getNumberOfColumns());
  }, []);

  useEffect(() => {
    const fillers = Object.keys(Fillers).map((key) => {
      return { type: key };
    });
    setAllFillers(fillers);
  }, [dispatch]);

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
    if (paintings && numberOfColumns && allFillers) {
      dispatch(populateColumns({ paintings, fillers: [...allFillers] }));
    }
  }, [paintings, dispatch, numberOfColumns, allFillers]);

  useEffect(() => {
    if (Array.from(Object.keys(columns)).length === numberOfColumns) {
      setGalleryColumns(columns);
      setColumnsReady(true);
    }
  }, [columns, numberOfColumns]);

  return (
    <div className={styles.galleryPage}>
      {columnsReady && allFillers ? (
        Object.entries(galleryColumns).map((column) => {
          return (
            <GalleryColumn
              column={column[1].paintings}
              isHighest={column[1].isHighest}
              key={column[0]}
              Filler={Fillers[column[1].filler]}
            />
          );
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
