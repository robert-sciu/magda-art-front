import styles from "./chunk12.module.scss";
import universalStyles from "../universalChunkStyle.module.scss";
import PropTypes from "prop-types";
import ImageTile from "../../../common/imageTile/ImageTile";

export default function Chunk12({ images }) {
  const [img1, img2, img3] = Object.values(images);
  return (
    <div className={styles.grid12}>
      <figure className={`${universalStyles.bioGalleryItem} ${styles.imgXlL}`}>
        <ImageTile img={img1} />
      </figure>
      <figure className={universalStyles.bioGalleryItem}>
        <ImageTile img={img2} />
      </figure>
      <figure className={universalStyles.bioGalleryItem}>
        <ImageTile img={img3} />
      </figure>
    </div>
  );
}

Chunk12.propTypes = {
  images: PropTypes.array.isRequired,
};
