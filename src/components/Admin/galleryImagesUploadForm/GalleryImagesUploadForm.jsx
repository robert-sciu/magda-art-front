import { useSelector } from "react-redux";
import styles from "./galleryImagesUploadForm.module.scss";
import { createArrayFromObject } from "../../../utilities";
import ImageInspector from "../imageInspector/ImageInspector";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function GalleryImagesUploadForm({
  selector,
  endpoint,
  onSubmit,
  onDelete,
}) {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [width_cm, setWidth_cm] = useState(null);
  const [height_cm, setHeight_cm] = useState(null);
  const [description, setDescription] = useState("");
  const [showImages, setShowImages] = useState(false);

  const images = useSelector(selector);
  const imagesArray = createArrayFromObject(images)[1];

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(
      endpoint,
      file,
      imageName,
      null,
      null,
      width_cm,
      height_cm,
      description
    );
  }

  function handleDelete(imgId) {
    setShowImages(false);
    onDelete(endpoint, imgId);
  }

  useEffect(() => {
    if (!imagesArray) return;
    setShowImages(true);
  }, [imagesArray]);

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="name">Title</label>
        <input
          type="text"
          id="name"
          name="name"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
        />
        <label htmlFor="width_cm">Width (cm):</label>
        <input
          type="text"
          id="width_cm"
          name="width_cm"
          onChange={(e) => setWidth_cm(e.target.value)}
        />
        <label htmlFor="height_cm">Height (cm):</label>
        <input
          type="text"
          id="height_cm"
          name="height_cm"
          onChange={(e) => setHeight_cm(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="file">File:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
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
