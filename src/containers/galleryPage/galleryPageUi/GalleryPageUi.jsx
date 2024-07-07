import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import GalleryOverlay from "../galleryOverlay/GalleryOverlay.jsx";
import GalleryColumn from "../../../components/Gallery/galleryColumn/GalleryColumn.jsx";
import Fillers from "../../../components/Gallery/fillers/fillers.jsx";
import Spinner from "../../../components/common/spinner/Spinner.jsx";

import {
  populateColumns,
  selectAllImages,
  createImageColumns,
  selectAllColumns,
  isLoadingContent,
} from "./galleryPageSlice.js";
import { setLocation } from "../../rootNav/rootNavSlice.js";

import styles from "./galleryPageUi.module.scss";
import scss from "../../../../styles/variables.module.scss";

const largeDesktopWidth = parseInt(scss.largeDesktopWidth);
const mediumDesktopWidth = parseInt(scss.mediumDesktopWidth);
const smallDesktopWidth = parseInt(scss.smallDesktopWidth);
const tabletWidth = parseInt(scss.tabletWidth);

/**
 * Renders the Gallery Page UI with dynamically populated columns based on window width.
 */

export default function GalleryPageUi() {
  const [galleryColumns, setGalleryColumns] = useState(null);
  const [numberOfColumns, setNumberOfColumns] = useState(null);
  const [columnsReady, setColumnsReady] = useState(false);
  const [allFillers, setAllFillers] = useState([]);

  const dispatch = useDispatch();

  const { data: paintings } = useSelector(selectAllImages);
  const loadingContent = useSelector(isLoadingContent);
  const columns = useSelector(selectAllColumns);

  useEffect(() => {
    dispatch(setLocation(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    setNumberOfColumns(getNumberOfColumns());
  }, []);

  useEffect(() => {
    if (!numberOfColumns) return;
    if (!paintings) return;
    if (loadingContent) return;
    dispatch(createImageColumns(numberOfColumns));
  }, [dispatch, numberOfColumns, paintings, loadingContent]);

  useEffect(() => {
    if (paintings && numberOfColumns && allFillers && !loadingContent) {
      dispatch(populateColumns({ paintings, fillers: [...allFillers] }));
    }
  }, [paintings, dispatch, numberOfColumns, allFillers, loadingContent]);

  useEffect(() => {
    if (Array.from(Object.keys(columns)).length === numberOfColumns) {
      setGalleryColumns(columns);
      setColumnsReady(true);
    }
  }, [columns, numberOfColumns]);

  useEffect(() => {
    function handleResize() {
      setNumberOfColumns(getNumberOfColumns());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    const fillers = Object.keys(Fillers).map((key) => {
      return { type: key };
    });
    setAllFillers(fillers);
  }, [dispatch]);

  function getNumberOfColumns() {
    const width = window.innerWidth;
    if (width > 3000) return 6;
    if (width > largeDesktopWidth) return 5;
    if (width > mediumDesktopWidth) return 4;
    if (width > smallDesktopWidth) return 3;
    if (width > tabletWidth) return 2;
    return 1;
  }

  return (
    <div className={styles.galleryPage}>
      {columnsReady && allFillers && galleryColumns ? (
        Object.entries(galleryColumns).map((column) => {
          return (
            <GalleryColumn
              // column[1].paintings contains paintings data
              column={column[1].paintings}
              // column[1].isHighest is a boolean that indicates if the column is the highest
              // highest column in the grid doesn't get a filler
              isHighest={column[1].isHighest}
              key={column[0]}
              // column[1].filler is the type of filler
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
