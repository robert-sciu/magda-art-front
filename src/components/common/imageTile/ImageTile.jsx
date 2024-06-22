import { useState } from "react";

import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";

import styles from "./imageTile.module.scss";
import scss from "../../../../styles/variables.module.scss";

export default function ImageTile({
  img,
  alt = "",
  spinnerSize,
  spinnerColor,
  loadCheck = () => {},
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  function handleLoad() {
    setImgLoaded(true);
    loadCheck(true);
  }

  return (
    <div className={styles.tileContainer}>
      {imgLoaded ? null : (
        <div className={styles.spinner}>
          <Spinner
            size={spinnerSize || scss.sizeXl}
            color={spinnerColor || undefined}
          />
        </div>
      )}
      <img
        src={img?.url}
        alt={alt}
        onLoad={handleLoad}
        style={imgLoaded ? { opacity: "1" } : null}
      />
    </div>
  );
}

ImageTile.propTypes = {
  img: PropTypes.object,
  alt: PropTypes.string,
  spinnerSize: PropTypes.string,
  spinnerColor: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  loadCheck: PropTypes.func,
};
