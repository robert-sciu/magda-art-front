import PropTypes from "prop-types";

import styles from "./bioParallax.module.scss";

export default function BioParallax({ bioParallaxImageArray }) {
  const paralaxImgData = bioParallaxImageArray[0];

  const imgStyle = {
    backgroundImage: `url(${paralaxImgData?.url})`,
  };

  return (
    <div className={styles.paralax} style={imgStyle}>
      <h2>BIO</h2>
    </div>
  );
}

BioParallax.propTypes = {
  bioParallaxImageArray: PropTypes.array,
};
