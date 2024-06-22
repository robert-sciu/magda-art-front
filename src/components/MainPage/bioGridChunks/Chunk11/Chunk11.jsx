import PropTypes from "prop-types";

import ImageTile from "../../../common/imageTile/ImageTile";

import universalStyles from "../universalChunkStyle.module.scss";
import styles from "./chunk11.module.scss";

export default function Chunk11({ images }) {
  return (
    <div className={styles.grid11}>
      {images.map((img) => {
        return (
          <figure className={universalStyles.bioGalleryItem} key={img?.id}>
            <ImageTile img={img} />
          </figure>
        );
      })}
    </div>
  );
}

Chunk11.propTypes = {
  images: PropTypes.array.isRequired,
};
