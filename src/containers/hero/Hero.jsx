import Spinner from "../../components/common/spinner/Spinner";
import styles from "./hero.module.scss";
import { useSelector } from "react-redux";
import { selectHeroImage } from "../mainPage/mainPageImagesSlice";
import { selectLogoImage } from "../rootNav/rootNavSlice";
import { selectName } from "../mainPage/mainPageContentSlice";
import { useEffect, useState } from "react";
import HeroHeading from "../../components/MainPage/heroHeading/HeroHeading";
import HeroBackground from "../../components/MainPage/heroBackground/HeroBackground";
import { heroImageReady } from "../../store/loadingStateSlice";

export default function Hero() {
  const heroImage = useSelector(selectHeroImage);
  const logoImage = useSelector(selectLogoImage);
  const name = useSelector(selectName);
  // const pageFilesLoaded = useSelector(filesLoaded);
  const heroImageLoaded = useSelector(heroImageReady);
  const [showHeading, setShowHeading] = useState(false);

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
            logoImage={logoImage}
            name={name}
          />
        ) : (
          <Spinner />
        )}
      </div>
      {heroImage ? <HeroBackground heroImage={heroImage} /> : null}
    </div>
  );
}
