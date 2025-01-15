import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import HeroHeading from "../../../components/MainPage/heroHeading/HeroHeading";
import HeroBackground from "../../../components/MainPage/heroBackground/HeroBackground";
// import LoadingState from "../../../components/loadingState/loadingState";

import {
  selectHeroImage,
  selectSectionInView,
  setSectionInView,
  // selectPageImagesFetchStatus,
} from "../../../store/mainPageImagesSlice";
import {
  selectContentFetchComplete,
  selectName,
} from "../../../store/mainPageContentSlice";

import styles from "./hero.module.scss";

// import { createArrayFromObject } from "../../../utilities";
import { selectDevice } from "../../../store/rootNavSlice";
import LoadingState from "../../../components/loadingState/loadingState";

/**
 * Renders the Hero component with dynamic content based on the loaded hero image and user data.
 *
 * @return {JSX.Element} The rendered Hero component.
 */

export default function Hero() {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [showHeading, setShowHeading] = useState(false);

  const heroImage = useSelector(selectHeroImage);
  // const pageImagesFetchComplete = useSelector(selectPageImagesFetchStatus);
  const contentFetchComplete = useSelector(selectContentFetchComplete);
  const name = useSelector(selectName);
  const device = useSelector(selectDevice);
  const heroVisible = useSelector((state) =>
    selectSectionInView(state, "hero")
  );
  const dispatch = useDispatch();

  // Set the showHeading state to true after 600ms if the heroImageLoaded state is true
  // This is to prevent the HeroHeading component from being rendered before the background image is loaded
  // and visible on the screen
  useEffect(() => {
    if (heroImageLoaded) {
      setTimeout(() => {
        setShowHeading(true);
      }, 300);
      setTimeout(() => {
        dispatch(setSectionInView("hero"));
      }, 600);
    }
  }, [heroImageLoaded, dispatch]);

  return (
    <div className={styles.heroSection} name="hero">
      <div className={styles.headingContainer}>
        <HeroHeading
          showHeading={contentFetchComplete && showHeading}
          name={name}
          disableFadeIn={heroVisible}
        />
      </div>
      <HeroBackground
        heroImage={heroImage[0]}
        imgQuality={device}
        onHeroImageLoaded={setHeroImageLoaded}
      />
      <LoadingState fadeOut={heroImageLoaded} inactive={heroVisible} />
    </div>
  );
}
