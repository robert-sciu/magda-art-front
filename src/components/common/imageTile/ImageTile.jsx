import { useEffect, useState } from "react";

import PropTypes from "prop-types";

// import Spinner from "../spinner/Spinner";

import styles from "./imageTile.module.scss";
import { selectDevice } from "../../../store/rootNavSlice";
import { useSelector } from "react-redux";
// import scss from "../../../../styles/variables.module.scss";

export default function ImageTile({
  img,
  alt = "",
  // spinnerSize,
  // spinnerColor,
  isVisible,
  qualityOverride = null,
  onLoad = () => {},
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgQuality, setImgQuality] = useState(qualityOverride || "lazy");
  const device = useSelector(selectDevice);

  useEffect(() => {
    if (isVisible) {
      setImgQuality(device);
    }
  }, [isVisible, device]);

  function handleLoad() {
    setImgLoaded(true);
    onLoad();
  }

  return (
    <div
      className={`${styles.tileContainer} ${
        imgLoaded ? styles.imgLoaded : null
      }`}
    >
      <img src={img?.[`url_${imgQuality}`]} alt={alt} onLoad={handleLoad} />
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
  qualityOverride: PropTypes.string,
  onLoad: PropTypes.func,
  isVisible: PropTypes.bool,
};
