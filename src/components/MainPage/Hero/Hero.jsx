import styles from "./hero.module.scss";
import { useSelector } from "react-redux";
import {
  selectHeroImage,
  selectLogoImage,
} from "../../../containers/mainPage/mainPageImagesSlice";

export default function Hero() {
  const heroImage = useSelector(selectHeroImage);
  const logoImage = useSelector(selectLogoImage);
  return (
    <div className={styles.heroSection}>
      <div className={styles.heading}>
        {logoImage ? (
          <img
            className={styles.logoImage}
            src={logoImage.url}
            alt={logoImage.name}
          />
        ) : (
          "loading"
        )}
        <h1>Magdalena Mędzkiewicz</h1>
        <h2>Porfolio</h2>
      </div>

      {heroImage ? (
        <img
          className={styles.heroImage}
          src={heroImage.url}
          alt={`Painting entitled ${heroImage.name}`}
        />
      ) : (
        "loading"
      )}
    </div>
  );
}
