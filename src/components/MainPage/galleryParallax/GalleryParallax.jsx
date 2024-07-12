import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import styles from "./galleryParallax.module.scss";

export default function GalleryParallax({ galleryParallaxImageArray }) {
  const paralaxImgData =
    galleryParallaxImageArray.length > 0 ? galleryParallaxImageArray[0] : null;

  const imgStyle = {
    backgroundImage: paralaxImgData ? `url(${paralaxImgData.url})` : null,
  };
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
