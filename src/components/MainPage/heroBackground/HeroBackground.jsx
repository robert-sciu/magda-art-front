import PropTypes from "prop-types";

import styles from "./heroBackground.module.scss";

export default function HeroBackground({
  heroImage,
  onHeroImageLoaded,
  imgQuality,
}) {
  function handleHeroImageLoaded() {
    onHeroImageLoaded(true);
  }

  return (
    <div className={styles.heroContainer}>
      {heroImage && (
        <img
          className={styles.heroImage}
          src={heroImage[`url_${imgQuality}`]}
          alt={`Painting entitled ${heroImage.title}`}
          onLoad={() => handleHeroImageLoaded()}
        />
      )}
    </div>
  );
}

HeroBackground.propTypes = {
  heroImage: PropTypes.object,
  onHeroImageLoaded: PropTypes.func,
  imgQuality: PropTypes.string,
  heroImageLoaded: PropTypes.bool,
  disableFadeIn: PropTypes.bool,
};
