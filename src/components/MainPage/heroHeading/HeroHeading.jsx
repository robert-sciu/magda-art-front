import PropTypes from "prop-types";

import styles from "./heroHeading.module.scss";

export default function HeroHeading({ showHeading, logoImageArray, name }) {
  return (
    <div className={`${styles.heading} ${showHeading && styles.show}`}>
      <img
        className={styles.logoImage}
        src={logoImageArray[0]?.url}
        alt={logoImageArray[0]?.name}
      />
      <h1>{name}</h1>
      <h2>Porfolio</h2>
    </div>
  );
}

HeroHeading.propTypes = {
  showHeading: PropTypes.bool,
  logoImageArray: PropTypes.array,
  name: PropTypes.string,
};
