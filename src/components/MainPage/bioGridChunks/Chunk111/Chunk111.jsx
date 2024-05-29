import styles from "./chunk111.module.scss";
import universalStyles from "../universalChunkStyle.module.scss";
import PropTypes from "prop-types";
import ImageTile from "../../../common/image/ImageTile";

export default function Chunk111({ images }) {
  const [img1, img2, img3] = Object.values(images);
  return (
    <div className={styles.grid111}>
      <figure className={universalStyles.bioGalleryItem}>
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

Chunk111.propTypes = {
  images: PropTypes.array.isRequired,
};
