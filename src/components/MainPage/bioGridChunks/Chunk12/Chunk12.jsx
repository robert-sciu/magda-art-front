import styles from "./chunk12.module.scss";
import universalStyles from "../universalChunkStyle.module.scss";
import PropTypes from "prop-types";

export default function Chunk12({ images }) {
  const [img1, img2, img3] = Object.values(images);
  return (
    <div className={styles.grid12}>
      <figure className={`${universalStyles.bioGalleryItem} ${styles.imgXlL}`}>
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

Chunk12.propTypes = {
  images: PropTypes.array.isRequired,
};
