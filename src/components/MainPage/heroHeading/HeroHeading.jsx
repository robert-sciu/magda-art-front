import styles from "./heroHeading.module.scss";
import PropTypes from "prop-types";

export default function HeroHeading({ showHeading, logoImage, name }) {
  return (
    <div
      className={styles.heading}
      style={{
        opacity: showHeading ? 1 : 0,
        transition: "opacity 3s",
      }}
    >
      <img
        className={styles.logoImage}
        src={logoImage?.url}
        alt={logoImage?.name}
      />
      <h1>{name}</h1>
      <h2>Porfolio</h2>
    </div>
  );
}

HeroHeading.propTypes = {
  showHeading: PropTypes.bool,
  logoImage: PropTypes.object,
  name: PropTypes.string,
};
