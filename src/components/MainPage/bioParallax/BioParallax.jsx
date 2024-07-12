import PropTypes from "prop-types";

import styles from "./bioParallax.module.scss";

export default function BioParallax({ bioParallaxImageArray }) {
  const paralaxImgData =
    bioParallaxImageArray.length > 0 ? bioParallaxImageArray[0] : null;

  const imgStyle = {
    backgroundImage: paralaxImgData ? `url(${paralaxImgData.url})` : null,
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
