import { useState } from "react";
import styles from "./imageTile.module.scss";
import Spinner from "../../common/spinner/Spinner";
import PropTypes from "prop-types";
import scss from "../../../../styles/variables.module.scss";

export default function ImageTile({
  img,
  alt = "",
  spinnerSize,
  spinnerColor,
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

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
        onLoad={() => setImgLoaded(true)}
        style={imgLoaded ? { opacity: "1" } : null}
      />
    </div>
  );
}

ImageTile.propTypes = {
  img: PropTypes.object,
  alt: PropTypes.string,
  spinnerSize: PropTypes.number,
  spinnerColor: PropTypes.string,
};
