import styles from "./chunk11.module.scss";
import universalStyles from "../universalChunkStyle.module.scss";
import PropTypes from "prop-types";
import ImageTile from "../../../common/imageTile/ImageTile";

export default function Chunk11({ images }) {
  const [img1, img2] = Object.values(images);
  return (
    <div className={styles.grid11}>
      <figure className={universalStyles.bioGalleryItem}>
        <ImageTile img={img1} />
      </figure>
      <figure className={universalStyles.bioGalleryItem}>
        <ImageTile img={img2} />
      </figure>
    </div>
  );
}

Chunk11.propTypes = {
  images: PropTypes.array.isRequired,
};
