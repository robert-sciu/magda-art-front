import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Logo from "../../../components/common/logo/Logo";
import ImageDisplay from "../../../components/elements/imageDisplay/ImageDisplay";
import {
  selectHeroImage,
  selectHeroImgLoadedHQ,
  setHeroImgLoadedHQ,
  setSectionInView,
} from "../../../store/mainPageImagesSlice";
import {
  selectContentFetchComplete,
  selectName,
} from "../../../store/mainPageContentSlice";
import { selectDevice } from "../../../store/rootNavSlice";

import styles from "./hero.module.scss";

import { classNameFormatter } from "../../../utilities/utilities";
/**
 * Renders the Hero component with dynamic content based on the loaded hero image and user data.
 *
 * @return {JSX.Element} The rendered Hero component.
 */

export default function Hero() {
  const [showHeading, setShowHeading] = useState(false);

  const contentFetchComplete = useSelector(selectContentFetchComplete);

  const dispatch = useDispatch();

  const heroImage = useSelector(selectHeroImage)[0];
  const name = useSelector(selectName);
  const device = useSelector(selectDevice);
  const heroImageHQLoaded = useSelector(selectHeroImgLoadedHQ);

  // Set the showHeading state to true after 600ms if the heroImageLoaded state is true
  // This is to prevent the HeroHeading component from being rendered before the background image is loaded
  // and visible on the screen
  useEffect(() => {
    if (showHeading) return;
    dispatch(setSectionInView("hero"));
    if (heroImageHQLoaded) {
      setShowHeading(true);
    }
  }, [heroImageHQLoaded, dispatch, showHeading]);

  function handleHeroLoad() {
    dispatch(setHeroImgLoadedHQ());
  }

  return (
    <div className={styles.heroSection} name="hero">
      <div
        className={classNameFormatter({
          styles,
          classNames: [
            "headingContainer",
            device === "desktop" && "desktopHeadingContainer",
          ],
        })}
      >
        <div
          className={classNameFormatter({
            styles,
            classNames: [
              "heading",
              !heroImageHQLoaded && !showHeading && "hideHeading",
            ],
          })}
        >
          <Logo isMainLogo={true} />
          <h1>{contentFetchComplete && name}</h1>
          <h2>Porfolio</h2>
        </div>
      </div>
      {heroImage && (
        <ImageDisplay
          img={heroImage}
          isVisible={true}
          type={"heroImage"}
          onLoad={handleHeroLoad}
          qualityOverride={device}
        />
      )}
      {/* <LoadingState fadeOut={heroImgLoaded} inactive={heroImageHQLoaded} /> */}
    </div>
  );
}
