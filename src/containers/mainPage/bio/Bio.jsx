import { forwardRef, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import BioGrid from "../../../components/MainPage/bioGrid/BioGrid";

import { selectBio, selectName } from "../../../store/mainPageContentSlice";
import { selectBioImages } from "../mainPageUi/mainPageImagesSlice";

import styles from "./bio.module.scss";
import scss from "../../../../styles/variables.module.scss";

import { createArrayFromObject } from "../../../utilities";
import { selectWindowWidth } from "../../rootNav/rootNavSlice";

const mediumDesktopWidth = parseInt(scss.mediumDesktopWidth);
const smallDesktopWidth = parseInt(scss.smallDesktopWidth);
const tabletWidth = parseInt(scss.tabletWidth);
// I needed to add another break point only for this component.
const intermediateWidthStep = 1750;
/**
 * Renders the Bio component, which displays the artist's biography and images as a decorative grid.
 *
 * @return {JSX.Element} The rendered Bio component.
 */
function Bio(props, ref) {
  const [sortedImages, setSortedImages] = useState(null);
  const [gridType, setGridType] = useState(null);

  const bioText = useSelector(selectBio);
  const images = useSelector(selectBioImages);
  const name = useSelector(selectName);

  const pageWidth = useSelector(selectWindowWidth);

  useEffect(() => {
    if (pageWidth >= intermediateWidthStep) {
      setGridType("gridLarge");
    } else if (
      pageWidth <= intermediateWidthStep &&
      pageWidth > mediumDesktopWidth
    ) {
      setGridType("gridMedium");
    } else if (
      pageWidth <= mediumDesktopWidth &&
      pageWidth > smallDesktopWidth
    ) {
      setGridType("gridMediumSmall");
    } else if (pageWidth <= smallDesktopWidth && pageWidth > tabletWidth) {
      setGridType("gridSmall");
    } else if (pageWidth <= tabletWidth) {
      setGridType("gridTablet");
    }
  }, [pageWidth]);

  useEffect(() => {
    const imagesArray = createArrayFromObject(images);
    if (imagesArray.length === 0) return;
    const sortedImagesArray = imagesArray.sort(
      (img1, img2) => img1.placement - img2.placement
    );
    setSortedImages(sortedImagesArray);
  }, [images]);

  return (
    <div ref={ref} className={styles.background} name="bio">
      <div className={styles.gridContainer}>
        {sortedImages ? (
          <BioGrid
            sortedImages={
              pageWidth <= smallDesktopWidth
                ? sortedImages.slice(0)
                : sortedImages
            }
            pageWidth={pageWidth}
            gridType={pageWidth <= smallDesktopWidth ? "gridTablet1" : gridType}
          />
        ) : (
          <p className={styles.info}>You need to add some images first</p>
        )}

        <div className={styles.bioContent}>
          <h2>{name}</h2>
          <p>{bioText}</p>
        </div>
        {pageWidth <= smallDesktopWidth && sortedImages && (
          <BioGrid
            sortedImages={sortedImages.slice(6)}
            gridType={pageWidth <= smallDesktopWidth ? "gridTablet2" : gridType}
          />
        )}
      </div>
    </div>
  );
}

const ForwardedBio = forwardRef(Bio);

export default ForwardedBio;
