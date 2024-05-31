import PropTypes from "prop-types";
import styles from "./galleryColumn.module.scss";
import GalleryTile from "../galleryTile/GalleryTile";
export default function GalleryColumn({ column }) {
  return (
    <div className={styles.galleryColumn}>
      {column.map((image) => (
        <GalleryTile image={image} key={image.id} />
      ))}
    </div>
  );
}

GalleryColumn.propTypes = {
  column: PropTypes.array,
};
