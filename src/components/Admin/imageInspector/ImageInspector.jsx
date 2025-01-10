import PropTypes from "prop-types";

import styles from "./imageInspector.module.scss";

export default function ImageInspector({ img, onDelete }) {
  function handleDelete(e) {
    e.preventDefault();
    onDelete({ id: img.id, role: img.role });
  }
  return (
    <div className={styles.inspectorContainer}>
      <img src={img.url_desktop} alt={img.imageName} />
      <button onClick={(e) => handleDelete(e)}>Delete</button>
    </div>
  );
}

ImageInspector.propTypes = {
  img: PropTypes.object,
  onDelete: PropTypes.func,
  endpoint: PropTypes.string,
};
