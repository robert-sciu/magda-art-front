import PropTypes from "prop-types";

import styles from "./heroBackground.module.scss";

export default function HeroBackground({
  heroImageArray,
  onHeroImageLoaded,
  heroImageLoaded,
}) {
  function handleHeroImageLoaded() {
    onHeroImageLoaded(true);
  }

  return (
    <div
      style={{
        opacity: heroImageLoaded ? 1 : 0,
      }}
      className={`${styles.heroContainer} ${heroImageLoaded && styles.show}`}
    >
      <img
        className={styles.heroImage}
        src={heroImageArray[0]?.url}
        alt={`Painting entitled ${heroImageArray[0]?.name}`}
        onLoad={() => handleHeroImageLoaded()}
      />
    </div>
  );
}

HeroBackground.propTypes = {
  heroImageArray: PropTypes.array,
  imgLoaded: PropTypes.bool,
  onImgLoaded: PropTypes.func,
  onHeroImageLoaded: PropTypes.func,
  heroImageLoaded: PropTypes.bool,
};
