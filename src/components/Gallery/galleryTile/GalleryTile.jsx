import { useState } from "react";

import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import ImageTile from "../../common/imageTile/ImageTile";

import { setClickedImage } from "../../../containers/galleryPage/galleryPageUi/galleryPageSlice";

import styles from "./galleryTile.module.scss";

export default function GalleryTile({ image }) {
  const [hover, setHover] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setClickedImage(image));
  }

  return (
    <div
      className={styles.galleryTile}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div className={styles.standardResImage}>
        <ImageTile
          img={image}
          alt={image.title}
          key={image.id}
          loadCheck={setImgLoaded}
        />
      </div>

      <div
        className={styles.overlay}
        style={hover && imgLoaded ? { opacity: 1 } : null}
      >
        <h3>{image.title}</h3>
        <p>{image.description}</p>
        <button onClick={handleClick}>See More</button>
      </div>
    </div>
  );
}

GalleryTile.propTypes = {
  image: PropTypes.object,
};
