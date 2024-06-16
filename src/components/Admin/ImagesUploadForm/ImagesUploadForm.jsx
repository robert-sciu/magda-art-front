import { useState } from "react";
import ImageInspector from "../imageInspector/ImageInspector";
import styles from "./imagesUploadForm.module.scss";
import PropTypes from "prop-types";

export default function ImagesUploadForm({
  role,
  images,
  maxNumberOfImages,
  onSubmit,
  endpoint,
  placementsNeeded,
  hardPlacement = undefined,
  onDelete,
}) {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");

  const numberOfImages = Object.values(images).length;

  const placementsList = placementsNeeded
    ? Object.values(images).map((img) => img.placement)
    : undefined;

  let freePlacement = hardPlacement || undefined;
  for (let i = 1; i <= maxNumberOfImages; i++) {
    if (!placementsNeeded) break;
    if (!placementsList.includes(i)) {
      freePlacement = i;
      break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "JSON",
      JSON.stringify({
        imageName: imageName,
        role: role,
        placement: freePlacement,
      })
    );
    onSubmit(formData, endpoint);
    setImageName("");
    setFile(null);
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h3>
          Upload {maxNumberOfImages}{" "}
          {maxNumberOfImages === 1 ? "image" : "images"} for {role} section
        </h3>
        {numberOfImages === maxNumberOfImages ? (
          <p>To add new images you need to delete the old ones</p>
        ) : (
          <>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
            <label htmlFor="file">File:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </>
        )}
      </form>
      <div className={styles.gridContainer}>
        {Object.values(images).map((img) => (
          <ImageInspector img={img} key={img.id} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

ImagesUploadForm.propTypes = {
  role: PropTypes.string,
  images: PropTypes.object,
  maxNumberOfImages: PropTypes.number,
  onSubmit: PropTypes.func,
  endpoint: PropTypes.string,
  placementsNeeded: PropTypes.bool,
  hardPlacement: PropTypes.number,
  onDelete: PropTypes.func,
};
