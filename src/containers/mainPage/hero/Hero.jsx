import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import HeroHeading from "../../../components/MainPage/heroHeading/HeroHeading";
import HeroBackground from "../../../components/MainPage/heroBackground/HeroBackground";
import Spinner from "../../../components/common/spinner/Spinner";

import { selectHeroImage } from "../mainPageUi/mainPageImagesSlice";
import { selectLogoImage } from "../../rootNav/rootNavSlice";
import { selectName } from "../mainPageUi/mainPageContentSlice";

import styles from "./hero.module.scss";

import { createArrayFromObject } from "../../../utilities";

/**
 * Renders the Hero component with dynamic content based on the loaded hero image and user data.
 *
 * @return {JSX.Element} The rendered Hero component.
 */

export default function Hero() {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [showHeading, setShowHeading] = useState(false);

  const heroImage = useSelector(selectHeroImage);
  const logoImage = useSelector(selectLogoImage);
  const name = useSelector(selectName);

  const logoImageArray = createArrayFromObject(logoImage);
  const heroImageArray = createArrayFromObject(heroImage);

  // Set the showHeading state to true after 600ms if the heroImageLoaded state is true
  // This is to prevent the HeroHeading component from being rendered before the background image is loaded
  // and visible on the screen
  useEffect(() => {
    if (heroImageLoaded) {
      setTimeout(() => {
        setShowHeading(true);
      }, 600);
    }
  }, [heroImageLoaded]);

  return (
    <div className={styles.heroSection}>
      <div className={styles.headingContainer}>
        {heroImageLoaded ? (
          <HeroHeading
            showHeading={showHeading}
            logoImageArray={logoImageArray}
            name={name}
          />
        ) : (
          <Spinner />
        )}
      </div>
      {heroImage && (
        <HeroBackground
          heroImageArray={heroImageArray}
          onHeroImageLoaded={setHeroImageLoaded}
          heroImageLoaded={heroImageLoaded}
        />
      )}
    </div>
  );
}
