import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import ImageInspector from "../../../components/Admin/imageInspector/ImageInspector";

import styles from "./galleryImagesUploadForm.module.scss";

import {
  checkUploadInfo,
  createArrayFromObject,
  resetErrors,
} from "../../../utilities";

export default function GalleryImagesUploadForm({
  selector,
  endpoint,
  onSubmit,
  onDelete,
}) {
  const [file, setFile] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");
  const [imageName, setImageName] = useState("");
  const [width_cm, setWidth_cm] = useState("");
  const [height_cm, setHeight_cm] = useState("");
  const [description, setDescription] = useState("");
  const [showImages, setShowImages] = useState(false);
  const [imageNameError, setImageNameError] = useState("");
  const [fileError, setFileError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [widthError, setWidthError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const images = useSelector(selector);
  const imagesArray = createArrayFromObject(images)[1];

  useEffect(() => {
    if (!imagesArray) return;
    setShowImages(true);
  }, [imagesArray]);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setFileInputValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    resetErrors([
      setImageNameError,
      setFileError,
      setDescriptionError,
      setHeightError,
      setWidthError,
    ]);

    const isValid = await checkUploadInfo({
      imageName,
      file,
      width_cm,
      height_cm,
      description,
      onImageNameError: setImageNameError,
      onFileError: setFileError,
      onDescriptionError: setDescriptionError,
      onHeightError: setHeightError,
      onWidthError: setWidthError,
    });

    if (!isValid) return;

    await onSubmit({
      endpoint,
      file,
      imageName,
      width_cm,
      height_cm,
      description,
    });

    setImageName("");
    setWidth_cm("");
    setHeight_cm("");
    setDescription("");
    setFileInputValue("");
    setFile(null);
  }

  function handleDelete(imgId) {
    setShowImages(false);
    onDelete(endpoint, imgId);
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h3>Upload Image to Gallery</h3>
        <label htmlFor="name">Title</label>
        {imageNameError && <p className={styles.error}>{imageNameError}</p>}
        <input
          type="text"
          id="name"
          name="name"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
        />
        <label htmlFor="width_cm">Width (cm):</label>
        {widthError && <p className={styles.error}>{widthError}</p>}
        <input
          type="text"
          id="width_cm"
          name="width_cm"
          value={width_cm}
          onChange={(e) => setWidth_cm(e.target.value)}
        />
        <label htmlFor="height_cm">Height (cm):</label>
        {heightError && <p className={styles.error}>{heightError}</p>}
        <input
          type="text"
          id="height_cm"
          name="height_cm"
          value={height_cm}
          onChange={(e) => setHeight_cm(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        {descriptionError && <p className={styles.error}>{descriptionError}</p>}
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="file">File:</label>
        {fileError && <p className={styles.error}>{fileError}</p>}
        <input
          type="file"
          id="file"
          name="file"
          value={fileInputValue}
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      <div className={styles.gridContainer}>
        {showImages
          ? imagesArray.map((img) => (
              <ImageInspector img={img} key={img.id} onDelete={handleDelete} />
            ))
          : null}
      </div>
    </div>
  );
}

GalleryImagesUploadForm.propTypes = {
  selector: PropTypes.func,
  endpoint: PropTypes.string,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};
