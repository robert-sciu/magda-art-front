import styles from "./chunk111.module.scss";
import universalStyles from "../universalChunkStyle.module.scss";
import PropTypes from "prop-types";

export default function Chunk111({ images }) {
  const [img1, img2, img3] = Object.values(images);
  return (
    <div className={styles.grid111}>
      <figure className={universalStyles.bioGalleryItem}>
        <img src={img1?.url} alt="" />
      </figure>
      <figure className={universalStyles.bioGalleryItem}>
        <img src={img2?.url} alt="" />
      </figure>
      <figure className={universalStyles.bioGalleryItem}>
        <img src={img3?.url} alt="" />
      </figure>
    </div>
  );
}

Chunk111.propTypes = {
  images: PropTypes.array.isRequired,
};
