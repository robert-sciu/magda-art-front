import PropTypes from "prop-types";
import styles from "./galleryColumn.module.scss";

export default function GalleryColumn({ column }) {
  return (
    <div className={styles.galleryColumn}>
      {column.map((image) => (
        <img src={image.url} key={image.id} />
      ))}
    </div>
  );
}

GalleryColumn.propTypes = {
  column: PropTypes.array,
};
