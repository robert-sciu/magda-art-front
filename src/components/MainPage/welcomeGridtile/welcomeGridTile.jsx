import { useState } from "react";
import styles from "./welcomeGridTile.module.scss";
import Spinner from "../../common/spinner/Spinner";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { heroImageReady } from "../../../store/loadingStateSlice";

export default function WelcomeGridTile({ img }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const heroImgLoaded = useSelector(heroImageReady);
  return (
    <div className={styles.tileContainer}>
      {imgLoaded ? null : (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      <img
        src={img.url}
        alt={img.name}
        key={img.id}
        onLoad={() => setImgLoaded(true)}
        style={imgLoaded ? { opacity: "1" } : null}
      />
    </div>
  );
}

WelcomeGridTile.propTypes = {
  img: PropTypes.object,
};
