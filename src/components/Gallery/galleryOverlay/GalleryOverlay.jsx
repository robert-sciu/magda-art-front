import { useDispatch, useSelector } from "react-redux";
import {
  fetchFullResImg,
  resetClickedImage,
  selectClickedImage,
  selectFullResImg,
} from "../../../containers/galleryPage/galleryPageUi/galleryPageSlice";
import styles from "./galleryOverlay.module.scss";
import { useEffect, useState } from "react";
import ImageTile from "../../common/imageTile/ImageTile";
import scss from "../../../../styles/variables.module.scss";
import closeBtn from "../../../assets/close-circle-outline.svg";

export default function GalleryOverlay() {
  const fullResImage = useSelector(selectFullResImg);
  const clickedImage = useSelector(selectClickedImage);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (clickedImage) {
      dispatch(fetchFullResImg(clickedImage.id));
      setImage(clickedImage);
    }
  }, [dispatch, clickedImage]);

  function closeOverlay() {
    dispatch(resetClickedImage());
    setImage(null);
  }

  function handleStopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div
      className={fullResImage ? styles.overlay : styles.inactive}
      onClick={closeOverlay}
    >
      {fullResImage ? (
        <div
          className={styles.overlayContainer}
          onClick={handleStopPropagation}
        >
          <div className={styles.imageContainer}>
            <ImageTile
              img={fullResImage?.data?.[0] || clickedImage}
              alt={image.name}
              spinnerSize={scss.sizeGiant}
              loadCheck={() => {}}
            />
          </div>
          <div className={styles.textContainer}>
            <h3>{image.title}</h3>
            <p>{image.description}</p>
          </div>
          <div className={styles.closeBtn} onClick={closeOverlay}>
            {/* <img src={closeIcon?.url} alt="close button" /> */}
            <img src={closeBtn} alt="close button" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
