import { useDispatch } from "react-redux";
import styles from "./heroBackground.module.scss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { setHeroImageReady } from "../../../store/loadingStateSlice";
export default function HeroBackground({ heroImage }) {
  const dispatch = useDispatch();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (imgLoaded) {
      dispatch(setHeroImageReady(true));
    }
  }, [imgLoaded, dispatch]);

  return (
    <div
      style={{
        opacity: imgLoaded ? 1 : 0,
        transition: "opacity 2s",
      }}
      className={styles.heroContainer}
    >
      <img
        className={styles.heroImage}
        src={heroImage.url}
        alt={`Painting entitled ${heroImage.name}`}
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  );
}

HeroBackground.propTypes = {
  heroImage: PropTypes.object,
  imgLoaded: PropTypes.bool,
  onImgLoaded: PropTypes.func,
};
