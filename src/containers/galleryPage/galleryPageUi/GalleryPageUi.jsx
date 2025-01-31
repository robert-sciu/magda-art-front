import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import GalleryOverlay from "../galleryOverlay/GalleryOverlay.jsx";
import GalleryColumn from "../../../components/Gallery/galleryColumn/GalleryColumn.jsx";
import Fillers from "../../../components/Gallery/fillers/fillers.jsx";

import {
  disableBlur,
  fetchGalleryImages,
  populateColumns,
  selectClickedImage,
  selectGalleryFillers,
  selectGalleryPageColumns,
  selectGalleryPageImagesFetchStatus,
  selectGalleryPageImagesLoadingStatus,
  selectHighQualityLoadStatus,
  selectLazyLoadStatus,
  selectUseBlurStatus,
  setFillers,
} from "../../../store/galleryPageSlice.js";

import {
  selectDevice,
  selectMobileNavIsOpen,
  setLocation,
} from "../../../store/rootNavSlice.js";

import scss from "../../../../styles/variables.module.scss";
import styles from "./galleryPageUi.module.scss";
import Logo from "../../../components/common/logo/Logo.jsx";
import { classNameFormatter } from "../../../utilities/utilities.js";
import LoadingState from "../../../components/loadingState/LoadingState.jsx";
import { useScrollLock } from "../../../utilities/customHooks.jsx";

const largeDesktopWidth = parseInt(scss.largeDesktopWidth);
const mediumDesktopWidth = parseInt(scss.mediumDesktopWidth);
const smallDesktopWidth = parseInt(scss.smallDesktopWidth);
const tabletWidth = parseInt(scss.tabletWidth);

/**
 * Renders the Gallery Page UI with dynamically populated columns based on window width.
 */

export default function GalleryPageUi() {
  const [scrollDisabled, setScrollDisabled] = useState(true);
  const [hideLoadingState, setHideLoadingState] = useState(false);
  const [galleryColumns, setGalleryColumns] = useState(null);
  const [numberOfColumns, setNumberOfColumns] = useState(null);
  const [columnsReady, setColumnsReady] = useState(false);
  const dispatch = useDispatch();

  const loadingContent = useSelector(selectGalleryPageImagesLoadingStatus);
  const columns = useSelector(selectGalleryPageColumns);
  const galleryLazyLoaded = useSelector(selectLazyLoadStatus);
  const highQualityLoaded = useSelector(selectHighQualityLoadStatus);
  const fetchComplete = useSelector(selectGalleryPageImagesFetchStatus);
  const blurIsEnabled = useSelector(selectUseBlurStatus);
  const device = useSelector(selectDevice);
  const clickedImage = useSelector(selectClickedImage);
  const fillers = useSelector(selectGalleryFillers);
  const mobileNavIsOpen = useSelector(selectMobileNavIsOpen);

  // disables blur after 2 seconds if high quality images are loaded
  // blur is only needed to transition from lazy to high quality for the first time

  useScrollLock(scrollDisabled);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!galleryLazyLoaded) return;
    const timeoutId = setTimeout(() => {
      setScrollDisabled(false);
      setHideLoadingState(true);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [galleryLazyLoaded]);

  useEffect(() => {
    if (!blurIsEnabled) return;
    if (highQualityLoaded) {
      const timeoutId = setTimeout(() => {
        dispatch(disableBlur());
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, highQualityLoaded, blurIsEnabled]);

  useEffect(() => {
    dispatch(setLocation(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    if (fetchComplete) return;
    dispatch(fetchGalleryImages());
  }, [dispatch, fetchComplete]);

  useEffect(() => {
    setNumberOfColumns(getNumberOfColumns());
  }, [numberOfColumns, columns]);

  useEffect(() => {
    if (Object.keys(columns).length === getNumberOfColumns()) return;
    if (!loadingContent && numberOfColumns && fetchComplete && fillers) {
      dispatch(
        populateColumns({
          numberOfColumns,
        })
      );
    }
  }, [
    dispatch,
    numberOfColumns,
    loadingContent,
    fetchComplete,
    columns,
    fillers,
  ]);

  useEffect(() => {
    if (Object.keys(columns).length === numberOfColumns) {
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
    dispatch(setFillers(fillers));
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
      {columnsReady &&
        Object.entries(galleryColumns).map((column) => {
          const [name, data] = column;
          const { paintings, isHighest, filler } = data;
          return (
            <GalleryColumn
              column={paintings}
              columnName={name}
              isHighest={isHighest}
              key={name}
              Filler={Fillers[filler]}
            />
          );
        })}
      {device === "mobile" && (
        <div
          className={classNameFormatter({
            styles,
            classNames: ["galleryLogo", mobileNavIsOpen && "hideLogo"],
          })}
        >
          <Logo size={"L"} />
        </div>
      )}
      <div
        className={classNameFormatter({
          styles,
          classNames: ["overlay", clickedImage && "showOverlay"],
        })}
      >
        {clickedImage && <GalleryOverlay isMobile={device === "mobile"} />}
      </div>
      <LoadingState fadeOut={hideLoadingState} fullscreen={true} />
    </div>
  );
}
