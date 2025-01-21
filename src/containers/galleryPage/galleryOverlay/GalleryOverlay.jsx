import { useDispatch, useSelector } from "react-redux";

import Button from "../../../components/elements/button/button";

import {
  resetClickedImage,
  selectClickedImage,
  selectHighQualityLoadStatus,
} from "../../../store/galleryPageSlice";

import styles from "./galleryOverlay.module.scss";
// import scss from "../../../../styles/variables.module.scss";
import { useState } from "react";
import LoadingState from "../../../components/loadingState/loadingState";
import ImageDisplay from "../../common/imageDisplay/imageDisplay";
import { IoCloseCircleOutline } from "react-icons/io5";

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
    setImageLoaded(true);
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
          <LoadingState
            isVisible={!imageLoaded}
            fadeOut={imageLoaded}
            inactive={highQualityLoaded}
            background="dark"
          />
        </div>
        <div className={styles.textContainer}>
          <h3>{image.title}</h3>
          <p>{image.description_en}</p>
          <p>
            Width: {image.width_cm} cm / Height: {image.height_cm} cm
          </p>
        </div>
        <div className={styles.closeBtn}>
          <Button
            icon={<IoCloseCircleOutline />}
            fixedHeight={true}
            style={"iconOnly"}
            onClick={closeOverlay}
          />
        </div>
      </div>
    </div>
  );
}
