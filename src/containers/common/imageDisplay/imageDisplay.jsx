import { forwardRef, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import styles from "./imageDisplay.module.scss";
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

const ImageDisplay = forwardRef(
  (
    {
      img,
      isVisible,
      type,
      withBorder = false,
      roundEdges = false,
      onLoad = () => {},
    },
    ref
  ) => {
    const [hover, setHover] = useState(false);
    const [imgQuality, setImgQuality] = useState("lazy");
    const [imgLoaded, setImgLoaded] = useState(false);
    const [highQualityLoaded, setHighQualityLoaded] = useState(false);

    const device = useSelector(selectDevice);
    const lazyIsLoaded = useSelector(selectLazyLoadStatus);
    const blurEnabled = useSelector(selectUseBlurStatus);
    const allHighQualityIsLoaded = useSelector(selectHighQualityLoadStatus);

    const isGallery = type === "gallery";
    const isGalleryOverlay = type === "galleryOverlay";
    const isPageImage = type === "pageImage";
    const isAdminImage = type === "adminImage";

    const dispatch = useDispatch();

    useEffect(() => {
      if (!isGallery) return;
      if (imgQuality === "desktop") return;
      if (lazyIsLoaded && !isVisible) setImgQuality("lazy");
      if (lazyIsLoaded && isVisible) setImgQuality(device);
    }, [device, lazyIsLoaded, isVisible, imgQuality, isGallery]);

    useEffect(() => {
      if (!isPageImage) return;
      if (imgQuality === "desktop") return;
      if (isVisible) setImgQuality(device);
    }, [device, isVisible, imgQuality, isPageImage]);

    useEffect(() => {
      if (!isAdminImage) return;
      if (imgQuality === "desktop") return;
      if (isVisible) setImgQuality(device);
    }, [device, isVisible, imgQuality, isAdminImage]);

    useEffect(() => {
      if (!isGalleryOverlay) return;
      if (imgQuality === "desktop") return;
      if (isVisible) setImgQuality("desktop");
    }, [device, isVisible, imgQuality, isGalleryOverlay]);

    function handleLoad(e) {
      setImgLoaded(true);
      if (isGallery && allHighQualityIsLoaded) return;
      if (e.target.src.includes(device)) {
        setHighQualityLoaded(true);
        isGallery && dispatch(increaseHighQualityLoadCount());
      }
      if (isGallery && lazyIsLoaded) return;
      if (isGallery && e.target.src.includes("lazy")) {
        dispatch(increaseLazyLoadCount());
      }
      onLoad();
    }
    function handleClick() {
      dispatch(setClickedImage(img));
    }

    return (
      <>
        {isGalleryOverlay && (
          <div className={styles.overlayTileContainer}>
            <img
              src={img?.[`url_${imgQuality}`]}
              alt={img.alt}
              onLoad={handleLoad}
            />
          </div>
        )}
        {!isGalleryOverlay && (
          <div
            className={classNameFormatter({
              styles,
              classNames: ["galleryTile"],
            })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
          >
            {/* <div className={styles.standardResImage}> */}
            <div className={styles.tileContainer}>
              <div
                className={classNameFormatter({
                  styles,
                  classNames: [
                    blurEnabled && "blur",
                    blurEnabled && highQualityLoaded && "noBlur",
                    !blurEnabled && "noBlur",
                  ],
                })}
              ></div>

              <img
                className={classNameFormatter({
                  styles,
                  classNames: [
                    "galleryImg",
                    withBorder && "border",
                    roundEdges && "roundBorder",
                    imgLoaded && "imgLoaded",
                  ],
                })}
                src={img[`url_${imgQuality}`]}
                alt={img.title}
                ref={ref}
                onLoad={handleLoad}
                data-id={img.id}
              />

              {/* <LoadingState fadeOut={imgLoaded} inactive={lazyIsLoaded} /> */}
            </div>
            {/* </div> */}

            {isGallery && (
              <div
                className={styles.overlay}
                style={hover ? { opacity: 1 } : null}
              >
                <h3>{img.title}</h3>
                <div className={styles.description}>
                  <p className={styles.descriptionText}>{img.description_en}</p>
                </div>
                <button onClick={handleClick}>See More</button>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
);

ImageDisplay.displayName = "GalleryTile";

export default ImageDisplay;

ImageDisplay.propTypes = {
  img: PropTypes.object,
  isVisible: PropTypes.bool,
  type: PropTypes.string,
  withBorder: PropTypes.bool,
  roundEdges: PropTypes.bool,
  onLoad: PropTypes.func,
};
