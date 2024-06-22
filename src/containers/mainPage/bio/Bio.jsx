import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import BioGrid from "../../../components/MainPage/bioGrid/BioGrid";

import { selectBio, selectName } from "../mainPageUi/mainPageContentSlice";
import { selectBioImages } from "../mainPageUi/mainPageImagesSlice";

import styles from "./bio.module.scss";

import { createArrayFromObject } from "../../../utilities";

/**
 * Renders the Bio component, which displays the artist's biography and images as a decorative grid.
 *
 * @return {JSX.Element} The rendered Bio component.
 */
export default function Bio() {
  const [sortedImages, setSortedImages] = useState(null);

  const bioText = useSelector(selectBio);
  const images = useSelector(selectBioImages);
  const name = useSelector(selectName);

  useEffect(() => {
    const imagesArray = createArrayFromObject(images);
    if (imagesArray.length === 0) return;
    const sortedImagesArray = imagesArray.sort(
      (img1, img2) => img1.placement - img2.placement
    );
    setSortedImages(sortedImagesArray);
  }, [images]);

  return (
    <div className={styles.background} name="bio">
      <div className={styles.gridContainer}>
        {sortedImages ? (
          <BioGrid sortedImages={sortedImages} />
        ) : (
          <p className={styles.info}>You need to add some images first</p>
        )}

        <div className={styles.bioContent}>
          <h2>{name}</h2>
          <p>{bioText}</p>
        </div>
      </div>
    </div>
  );
}
