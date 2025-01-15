import PropTypes from "prop-types";

import styles from "./imageInspector.module.scss";
import Button from "../../elements/button/button";

export default function ImageInspector({ img, onDelete }) {
  function handleDelete(e) {
    e.preventDefault();
    onDelete({ id: img.id, role: img.role || null });
  }
  return (
    <div className={styles.inspectorContainer}>
      <img src={img.url_desktop} alt={img.imageName} />
      <Button
        label="Delete"
        onClick={(e) => handleDelete(e)}
        style={"redBtn"}
      />
    </div>
  );
}

ImageInspector.propTypes = {
  img: PropTypes.object,
  onDelete: PropTypes.func,
  endpoint: PropTypes.string,
};
