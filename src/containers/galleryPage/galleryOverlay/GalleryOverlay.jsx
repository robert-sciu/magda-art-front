import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";

import Button from "../../../components/elements/button/Button";
import LoadingState from "../../../components/loadingState/loadingState";
import ImageDisplay from "../../../components/elements/imageDisplay/ImageDisplay";

import {
  resetClickedImage,
  selectClickedImage,
  selectHighQualityLoadStatus,
} from "../../../store/galleryPageSlice";

import styles from "./galleryOverlay.module.scss";

export default function GalleryOverlay() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const highQualityLoaded = useSelector(selectHighQualityLoadStatus);
  const image = useSelector(selectClickedImage);

  const dispatch = useDispatch();

  function closeOverlay() {
    dispatch(resetClickedImage());
  }

  function handleStopPropagation(e) {
    e.stopPropagation();
  }

  function handleLoad() {
    //it may be redundant but if the user has a fast connection it all happens too fast and looks bad
    setTimeout(() => {
      setImageLoaded(true);
    }, 500);
  }

  return (
    <div className={styles.overlay} onClick={closeOverlay}>
      <div className={styles.overlayContainer} onClick={handleStopPropagation}>
        <div className={styles.imageContainer}>
          <ImageDisplay
            img={image}
            type={"galleryOverlay"}
            isVisible={true}
            onLoad={handleLoad}
          />
        </div>
        <div className={styles.textContainer}>
          <h3>{image.title}</h3>
          <p>{image.description_en}</p>
          <p>
            Width: {image.width_cm} cm / Height: {image.height_cm} cm
          </p>
        </div>
        <LoadingState
          isVisible={!imageLoaded}
          fadeOut={imageLoaded}
          inactive={highQualityLoaded}
          background={"dark"}
        />
        <div className={styles.closeBtn}>
          <Button
            icon={<IoCloseCircleOutline />}
            fixedHeight={true}
            style={"iconOnly"}
            color={"basicLightIcon"}
            onClick={closeOverlay}
          />
        </div>
      </div>
    </div>
  );
}
