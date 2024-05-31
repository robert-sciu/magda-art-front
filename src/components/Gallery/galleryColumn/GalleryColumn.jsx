import PropTypes from "prop-types";
import styles from "./galleryColumn.module.scss";
import GalleryTile from "../galleryTile/GalleryTile";
export default function GalleryColumn({ column, isHighest }) {
  return (
    <div className={styles.galleryColumn}>
      {column.map((image) => (
        <GalleryTile image={image} key={image.id} />
      ))}
      {!isHighest ? <div className={styles.fillDiv}></div> : null}
    </div>
  );
}

GalleryColumn.propTypes = {
  column: PropTypes.array,
  isHighest: PropTypes.bool,
};
