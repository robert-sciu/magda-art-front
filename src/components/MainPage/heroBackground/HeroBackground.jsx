import styles from "./heroBackground.module.scss";
import PropTypes from "prop-types";
export default function HeroBackground({ heroImage, imgLoaded, onImgLoaded }) {
  return (
    <div
      style={{
        opacity: imgLoaded ? 1 : 0,
        transition: "opacity 2s",
      }}
      className={styles.heroContainer}
    >
      <img
        className={styles.heroImage}
        src={heroImage.url}
        alt={`Painting entitled ${heroImage.name}`}
        onLoad={() => onImgLoaded(true)}
      />
    </div>
  );
}

HeroBackground.propTypes = {
  heroImage: PropTypes.object,
  imgLoaded: PropTypes.bool,
  onImgLoaded: PropTypes.func,
};
