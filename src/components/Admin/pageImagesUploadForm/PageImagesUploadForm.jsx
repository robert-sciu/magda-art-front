import { useEffect, useState } from "react";
import ImageInspector from "../imageInspector/ImageInspector";
import styles from "./pageImagesUploadForm.module.scss";
import PropTypes from "prop-types";
import { createArrayFromObject } from "../../../utilities";
import { useSelector } from "react-redux";
export default function PageImagesUploadForm({
  role,
  selector,
  maxNumberOfImages,
  onSubmit,
  endpoint,
  placementsNeeded = false,
  hardPlacement = undefined,
  onDelete,
  urlInput = false,
}) {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [externalUrl, setExternalUrl] = useState("");

  const [showImages, setShowImages] = useState(false);
  const [freePlacement, setFreePlacement] = useState(undefined);
  const [numberOfImages, setNumberOfImages] = useState(0);

  const images = useSelector(selector);

  useEffect(() => {
    if (!placementsNeeded) return;
    const placementsList = createArrayFromObject(images).map(
      (img) => img.placement
    );

    let freePlacement;

    if (hardPlacement) {
      freePlacement = hardPlacement;
    } else {
      for (let i = 1; i <= maxNumberOfImages; i++) {
        if (!placementsList.includes(i)) {
          freePlacement = i;
          break;
        }
      }
    }
    setFreePlacement(freePlacement);
  }, [images, maxNumberOfImages, placementsNeeded, hardPlacement]);

  useEffect(() => {
    setNumberOfImages(createArrayFromObject(images).length);
  }, [images]);

  useEffect(() => {
    if (!images) return;
    setShowImages(true);
  }, [images]);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit(
      endpoint,
      file,
      imageName,
      role,
      freePlacement,
      null,
      null,
      null,
      externalUrl
    );
    setImageName("");
    setExternalUrl("");
    setFile(null);
  }

  function handleDelete(imgId) {
    setShowImages(false);
    onDelete(endpoint, imgId);
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
            {urlInput ? (
              <>
                <label htmlFor="url">Url</label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                />
              </>
            ) : null}
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
        {showImages
          ? createArrayFromObject(images).map((img) => (
              <ImageInspector img={img} key={img.id} onDelete={handleDelete} />
            ))
          : null}
      </div>
    </div>
  );
}

PageImagesUploadForm.propTypes = {
  role: PropTypes.string,
  maxNumberOfImages: PropTypes.number,
  onSubmit: PropTypes.func,
  endpoint: PropTypes.string,
  placementsNeeded: PropTypes.bool,
  hardPlacement: PropTypes.number,
  onDelete: PropTypes.func,
  selector: PropTypes.func,
  urlInput: PropTypes.bool,
};
