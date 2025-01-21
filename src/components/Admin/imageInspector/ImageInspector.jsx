import PropTypes from "prop-types";

import styles from "./imageInspector.module.scss";
import Button from "../../elements/button/button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectImageToEdit,
  setImgToEdit,
} from "../../../store/galleryPageSlice";

export default function ImageInspector({ img, onDelete, type }) {
  const dispatch = useDispatch();
  function handleDelete(e) {
    e.preventDefault();
    onDelete({ id: img.id, role: img.role || null });
  }
  const imageToEdit = useSelector(selectImageToEdit);
  function handleClick() {
    if (!imageToEdit) {
      dispatch(setImgToEdit(img));
    } else {
      dispatch(setImgToEdit(null));
    }
  }
  return (
    <div className={styles.inspectorContainer}>
      <img src={img.url_desktop} alt={img.imageName} />
      {type === "pageImg" && (
        <Button
          label="Delete"
          onClick={(e) => handleDelete(e)}
          style={"redBtn"}
        />
      )}
      {type === "gallery" && (
        <Button
          label={"Edit"}
          style={imageToEdit && imageToEdit.id === img.id ? `redBtn` : ""}
          // secondaryStyle={"smallBtn"}
          onClick={handleClick}
          isActive={imageToEdit && imageToEdit.id === img.id ? true : false}
          activeLabel={"Close"}
        />
      )}
    </div>
  );
}

ImageInspector.propTypes = {
  img: PropTypes.object,
  onDelete: PropTypes.func,
  // endpoint: PropTypes.string,
  type: PropTypes.string,
};
