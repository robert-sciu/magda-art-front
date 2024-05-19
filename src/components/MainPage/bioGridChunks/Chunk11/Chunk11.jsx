import styles from "./chunk11.module.scss";
import universalStyles from "../universalChunkStyle.module.scss";
import PropTypes from "prop-types";

export default function Chunk11({ images }) {
  const [img1, img2] = Object.values(images);
  return (
    <div className={styles.grid11}>
      <figure className={universalStyles.bioGalleryItem}>
        <img src={img1?.url} alt="" />
      </figure>
      <figure className={universalStyles.bioGalleryItem}>
        <img src={img2?.url} alt="" />
      </figure>
    </div>
  );
}

Chunk11.propTypes = {
  images: PropTypes.array.isRequired,
};
