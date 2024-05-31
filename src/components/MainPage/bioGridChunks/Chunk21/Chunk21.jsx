import styles from "./chunk21.module.scss";
import universalStyles from "../universalChunkStyle.module.scss";
import PropTypes from "prop-types";
import ImageTile from "../../../common/imageTile/ImageTile";

export default function Chunk21({ images }) {
  const [img1, img2, img3] = Object.values(images);
  return (
    <div className={styles.grid21}>
      <figure className={`${universalStyles.bioGalleryItem} ${styles.imgXlR}`}>
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

Chunk21.propTypes = {
  images: PropTypes.array.isRequired,
};
