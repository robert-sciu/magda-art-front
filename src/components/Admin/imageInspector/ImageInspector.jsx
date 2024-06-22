import PropTypes from "prop-types";
import styles from "./imageInspector.module.scss";

export default function ImageInspector({ img, onDelete }) {
  const imgId = img.id;
  function handleDelete(e) {
    e.preventDefault();
    onDelete(imgId);
  }
  return (
    <div className={styles.inspectorContainer}>
      <img src={img.url} alt={img.name} />
      <button onClick={(e) => handleDelete(e)}>Delete</button>
    </div>
  );
}

ImageInspector.propTypes = {
  img: PropTypes.object,
  onDelete: PropTypes.func,
  endpoint: PropTypes.string,
};
