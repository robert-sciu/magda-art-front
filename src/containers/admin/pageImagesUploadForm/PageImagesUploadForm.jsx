import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import ImageInspector from "../../../components/Admin/imageInspector/ImageInspector";

import styles from "./pageImagesUploadForm.module.scss";

import {
  checkImageDimensions,
  checkUploadInfo,
  createArrayFromObject,
  resetErrors,
  splitOnUppercase,
} from "../../../utilities";

export default function PageImagesUploadForm({
  role,
  selector,
  maxNumberOfImages,
  onSubmit,
  endpoint,
  info,
  placementsNeeded = false,
  hardPlacement = undefined,
  onDelete,
  urlInput = false,
}) {
  const [file, setFile] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");
  const [imageName, setImageName] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [showImages, setShowImages] = useState(false);
  const [freePlacement, setFreePlacement] = useState(undefined);
  const [numberOfImages, setNumberOfImages] = useState(0);
  const [imageNameError, setImageNameError] = useState("");
  const [fileError, setFileError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [compatibilityError, setCompatibilityError] = useState("");
  const [header, setHeader] = useState("");
  const [subHeader, setSubHeader] = useState("");

  const images = useSelector(selector);

  useEffect(() => {
    if (!placementsNeeded) return;
    let freePlacement;
    if (hardPlacement) {
      freePlacement = hardPlacement;
    } else {
      const placementsList = createArrayFromObject(images).map(
        (img) => img.placement
      );
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

  useEffect(() => {
    const roleFormatted = splitOnUppercase(role);
    if (numberOfImages === maxNumberOfImages) {
      setHeader(
        `${roleFormatted} section ${
          maxNumberOfImages === 1 ? "image" : "images"
        } already uploaded`
      );
      setSubHeader(`To add new Images you need to delete the old ones first`);
    } else {
      setHeader(
        `Upload ${maxNumberOfImages === Infinity ? "" : maxNumberOfImages} ${
          maxNumberOfImages === 1 ? "image" : "images"
        } for ${roleFormatted} section`
      );
      setSubHeader(null);
    }
  }, [role, numberOfImages, maxNumberOfImages]);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setFileInputValue(e.target.value);
    resetErrors([setCompatibilityError]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    resetErrors([setImageNameError, setFileError, setUrlError]);

    const isValid = await checkUploadInfo({
      imageName,
      file,
      externalUrl,
      urlInput,
      onImageNameError: setImageNameError,
      onFileError: setFileError,
      onUrlError: setUrlError,
    });

    if (!isValid) return;

    try {
      const imageCompatibilityCheck = await checkImageDimensions(file, role);
      if (imageCompatibilityCheck) {
        setCompatibilityError(imageCompatibilityCheck);
        return;
      }
    } catch (error) {
      setCompatibilityError(error.message);
      return;
    }

    const filteredUrl = externalUrl
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "");

    await onSubmit({
      endpoint,
      file,
      imageName,
      role,
      freePlacement,
      externalUrl: externalUrl ? filteredUrl : null,
    });
    setImageName("");
    setExternalUrl("");
    setFileInputValue("");
    setFile(null);
  }

  // function handleDelete({ id, role }) {
  //   setShowImages(false);
  //   onDelete({ id, role });
  // }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h3>{header}</h3>
        {numberOfImages === maxNumberOfImages ? (
          <p>{subHeader}</p>
        ) : (
          <>
            <label htmlFor="name">Name</label>
            {imageNameError && <p className={styles.error}>{imageNameError}</p>}
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
                {urlError && <p className={styles.error}>{urlError}</p>}
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
            {numberOfImages === maxNumberOfImages || (
              <p className={styles.info}>{info}</p>
            )}
            {fileError && <p className={styles.error}>{fileError}</p>}
            {compatibilityError && (
              <p className={styles.error}>{compatibilityError}</p>
            )}
            <input
              type="file"
              id="file"
              name="file"
              value={fileInputValue}
              onChange={handleFileChange}
            />
            <button type="submit">Upload</button>
          </>
        )}
      </form>
      <div className={styles.gridContainer}>
        {showImages
          ? createArrayFromObject(images).map((img) => (
              <ImageInspector img={img} key={img.id} onDelete={onDelete} />
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
  info: PropTypes.string,
};
