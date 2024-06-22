import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import styles from "./galleryParallax.module.scss";

export default function GalleryParallax({ galleryParallaxImageArray }) {
  const parallaxImgData = galleryParallaxImageArray[0];

  const imgStyle = { backgroundImage: `url(${parallaxImgData?.url})` };
  return (
    <div className={styles.parallax} style={imgStyle}>
      <div className={styles.galleryLinkBackground}>
        <div className={styles.container}>
          <Link to="/gallery">Visit Gallery</Link>
        </div>
      </div>
    </div>
  );
}

GalleryParallax.propTypes = {
  galleryParallaxImageArray: PropTypes.array,
};
