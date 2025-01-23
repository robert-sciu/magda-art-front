import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import Button from "../../elements/button/Button";
import ImageDisplay from "../../elements/imageDisplay/ImageDisplay";

import {
  selectImageToEdit,
  setImgToEdit,
} from "../../../store/galleryPageSlice";

import styles from "./imageInspector.module.scss";

/**
 * Component that displays an image with options to edit or delete it,
 * depending on the provided type. Utilizes Redux to manage the image
 * editing state.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.img - The image object to be displayed.
 * @param {Function} props.onDelete - Callback function to handle image deletion.
 * @param {string} props.type - The type of image, determining available actions ("pageImg" or "gallery").
 *
 * @returns {JSX.Element} The rendered ImageInspector component.
 */

export default function ImageInspector({ img, onDelete, type }) {
  const imageToEdit = useSelector(selectImageToEdit);

  const dispatch = useDispatch();

  function handleClick() {
    if (!imageToEdit) {
      dispatch(setImgToEdit(img));
    } else {
      dispatch(setImgToEdit(null));
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    onDelete({ id: img.id, role: img.role || null });
  }

  return (
    <div className={styles.inspectorContainer}>
      <ImageDisplay isVisible={true} img={img} type={"adminImage"} />
      {type === "pageImg" && (
        <div className={styles.actionBtn}>
          <Button
            label="Delete"
            onClick={(e) => handleDelete(e)}
            style={"redBtn"}
          />
        </div>
      )}
      {type === "gallery" && (
        <div className={styles.actionBtn}>
          <Button
            label={"Edit"}
            style={imageToEdit && imageToEdit.id === img.id ? `redBtn` : ""}
            onClick={handleClick}
            isActive={imageToEdit && imageToEdit.id === img.id ? true : false}
            activeLabel={"Close"}
          />
        </div>
      )}
    </div>
  );
}

ImageInspector.propTypes = {
  img: PropTypes.object,
  onDelete: PropTypes.func,
  type: PropTypes.string,
};
