import { forwardRef, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import styles from "./galleryTile.module.scss";
import {
  increaseHighQualityLoadCount,
  increaseLazyLoadCount,
  selectHighQualityLoadStatus,
  selectLazyLoadStatus,
  selectUseBlurStatus,
  setClickedImage,
} from "../../../store/galleryPageSlice";
import { selectDevice } from "../../../store/rootNavSlice";
// import LoadingState from "../../loadingState/loadingState";
import { classNameFormatter } from "../../../utilities/utilities";

const GalleryTile = forwardRef(({ img, isVisible }, ref) => {
  const [hover, setHover] = useState(false);
  const [imgQuality, setImgQuality] = useState("lazy");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);

  const device = useSelector(selectDevice);
  const lazyIsLoaded = useSelector(selectLazyLoadStatus);
  const blurEnabled = useSelector(selectUseBlurStatus);
  const allHighQualityIsLoaded = useSelector(selectHighQualityLoadStatus);

  // console.log(allHighQualityLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lazyIsLoaded && !isVisible) setImgQuality("lazy");
    if (lazyIsLoaded && isVisible) setImgQuality(device);
  }, [device, lazyIsLoaded, isVisible, imgQuality]);

  function handleLoad(e) {
    setImgLoaded(true);
    if (allHighQualityIsLoaded) return;
    if (e.target.src.includes(device)) {
      setHighQualityLoaded(true);
      dispatch(increaseHighQualityLoadCount());
    }
    if (lazyIsLoaded) return;
    if (e.target.src.includes("lazy")) {
      dispatch(increaseLazyLoadCount());
    }
  }
  function handleClick() {
    dispatch(setClickedImage(img));
  }

  return (
    <div
      className={styles.galleryTile}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div className={styles.standardResImage}>
        <div className={styles.tileContainer}>
          <div
            className={classNameFormatter({
              styles,
              classNames: [
                blurEnabled && "blur",
                blurEnabled && highQualityLoaded && "noBlur",
              ],
            })}
          ></div>
          <img
            className={classNameFormatter({
              styles,
              classNames: ["galleryImg", imgLoaded && "imgLoaded"],
            })}
            src={img[`url_${imgQuality}`]}
            alt={img.title}
            ref={ref}
            onLoad={handleLoad}
            data-id={img.id}
          />
          {/* <LoadingState fadeOut={imgLoaded} inactive={lazyIsLoaded} /> */}
        </div>
      </div>

      <div className={styles.overlay} style={hover ? { opacity: 1 } : null}>
        <h3>{img.title}</h3>
        <div className={styles.description}>
          <p className={styles.descriptionText}>{img.description}</p>
        </div>
        <button onClick={handleClick}>See More</button>
      </div>
    </div>
  );
});

GalleryTile.displayName = "GalleryTile";

export default GalleryTile;

GalleryTile.propTypes = {
  img: PropTypes.object,
  onLoad: PropTypes.func,
  lazyLoaded: PropTypes.bool,
  isVisible: PropTypes.bool,
};
