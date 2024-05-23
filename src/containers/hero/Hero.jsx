import Spinner from "../../components/common/spinner/Spinner";
import styles from "./hero.module.scss";
import { useSelector } from "react-redux";
import {
  selectHeroImage,
  selectLogoImage,
} from "../mainPage/mainPageImagesSlice";
import { selectName } from "../mainPage/mainPageContentSlice";
import { useEffect, useState } from "react";
import HeroHeading from "../../components/MainPage/heroHeading/HeroHeading";
import HeroBackground from "../../components/MainPage/heroBackground/HeroBackground";
import heroScss from "../../components/MainPage/heroHeading/heroHeading.module.scss";

export default function Hero() {
  const heroImage = useSelector(selectHeroImage);
  const logoImage = useSelector(selectLogoImage);
  const name = useSelector(selectName);

  const [imgloaded, setImgLoaded] = useState(false);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    const handleReadyStateChange = () => {
      if (document.readyState === "complete") {
        setDocumentLoaded(true);
      }
    };
    document.onreadystatechange = handleReadyStateChange;
    return () => {
      document.onreadystatechange = null;
    };
  }, []);

  useEffect(() => {
    documentLoaded && setTimeout(() => setShowHeading(true), 500);
  }, [documentLoaded]);

  return (
    <div className={styles.heroSection}>
      <div className={styles.headingContainer}>
        {documentLoaded ? (
          <HeroHeading
            showHeading={showHeading}
            logoImage={logoImage}
            name={name}
          />
        ) : (
          <Spinner />
        )}
      </div>
      {heroImage ? (
        <HeroBackground
          heroImage={heroImage}
          imgLoaded={imgloaded}
          onImgLoaded={setImgLoaded}
        />
      ) : null}
    </div>
  );
}
