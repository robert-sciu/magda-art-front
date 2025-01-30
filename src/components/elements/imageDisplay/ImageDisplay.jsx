import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import Button from "../button/Button";

import {
  increaseHighQualityLoadCount,
  increaseLazyLoadCount,
  selectHighQualityLoadStatus,
  selectLazyLoadStatus,
  selectUseBlurStatus,
  setClickedImage,
} from "../../../store/galleryPageSlice";
import { selectDevice } from "../../../store/rootNavSlice";

import styles from "./imageDisplay.module.scss";

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
      qualityOverride = false,
    },
    ref
  ) => {
    const [imgQuality, setImgQuality] = useState(
      qualityOverride ? qualityOverride : "lazy"
    );
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
    const isHeroImage = type === "heroImage";
    const isParallaxImage = type === "parallaxImage";

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

    // useEffect(() => {
    //   if (!isHeroImage) return;
    //   if (imgQuality === "desktop") return;
    //   if (isVisible) setImgQuality(device);
    // }, [device, isVisible, imgQuality, isHeroImage]);

    useEffect(() => {
      if (!isParallaxImage) return;
      if (imgQuality === "desktop") return;
      if (isVisible) setImgQuality(device);
    }, [device, isVisible, imgQuality, isParallaxImage]);

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
      onLoad(imgQuality);
    }
    function handleClick() {
      dispatch(setClickedImage(img));
    }

    return (
      <>
        {isHeroImage && (
          <div className={styles.heroContainer}>
            <div
              className={classNameFormatter({
                styles,
                classNames: ["blur", highQualityLoaded && "noBlur"],
              })}
            ></div>
            <img
              className={styles.heroImage}
              src={img?.[`url_${device}`]}
              alt={`Painting entitled ${img?.title}`}
              onLoad={handleLoad}
            />
          </div>
        )}
        {isParallaxImage && (
          <div className={styles.parallaxContainer}>
            <div
              className={classNameFormatter({
                styles,
                classNames: ["blur", highQualityLoaded && "noBlur"],
              })}
            ></div>
            <img
              className={styles.parallaxImage}
              src={img?.[`url_${imgQuality}`]}
              alt={`Painting entitled ${img?.title}`}
              onLoad={handleLoad}
            />
          </div>
        )}
        {isGalleryOverlay && (
          <div className={styles.overlayTileContainer}>
            <img
              src={img?.[`url_${imgQuality}`]}
              alt={img.alt}
              onLoad={handleLoad}
            />
          </div>
        )}
        {(isGallery || isPageImage || isAdminImage) && (
          <div
            className={classNameFormatter({
              styles,
              classNames: ["galleryTile"],
            })}
            onClick={handleClick}
          >
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
                src={img?.[`url_${imgQuality}`]}
                alt={img?.title}
                ref={ref}
                onLoad={handleLoad}
                data-id={img?.id}
              />
            </div>
            {device !== "mobile" && isGallery && (
              <div className={styles.infoOverlay}>
                <h3>{img.title}</h3>
                <div className={styles.description}>
                  <p className={styles.descriptionText}>{img.description_en}</p>
                </div>
                <Button onClick={handleClick} label={"See More"} />
              </div>
            )}
            {device === "mobile" && isGallery && (
              <div className={styles.infoOverlayMobile}>
                <Button onClick={handleClick} label={"See More"} />
              </div>
            )}
          </div>
        )}
      </>
    );
  }
);

ImageDisplay.displayName = "ImageDisplay";

export default ImageDisplay;

ImageDisplay.propTypes = {
  img: PropTypes.object,
  isVisible: PropTypes.bool,
  type: PropTypes.string,
  withBorder: PropTypes.bool,
  roundEdges: PropTypes.bool,
  onLoad: PropTypes.func,
  qualityOverride: PropTypes.string,
};
