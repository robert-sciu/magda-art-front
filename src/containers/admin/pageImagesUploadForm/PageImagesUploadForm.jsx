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
import InputElement from "../../../components/elements/inputElement/inputElement";
import Button from "../../../components/elements/button/button";

export default function PageImagesUploadForm({
  role,
  selector,
  maxNumberOfImages,
  onSubmit,
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

  const [maxNumOfImagesReached, setMaxNumOfImagesReached] = useState(false);
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
    if (maxNumberOfImages === Infinity) return;
    if (numberOfImages === maxNumberOfImages) {
      setMaxNumOfImagesReached(true);
    } else {
      setMaxNumOfImagesReached(false);
    }
  }, [numberOfImages, maxNumberOfImages]);

  //this tracks the number of images uploaded and changes the header and subheader accordingly
  //leave it there
  useEffect(() => {
    const roleFormatted = splitOnUppercase(role);
    if (maxNumOfImagesReached) {
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
  }, [role, numberOfImages, maxNumberOfImages, maxNumOfImagesReached]);

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

    const data = {
      imageName: imageName,
      role: role,
      placement: freePlacement || undefined,
      externalUrl: filteredUrl,
    };

    await onSubmit({
      data,
      file,
    });
    setImageName("");
    setExternalUrl("");
    setFileInputValue("");
    setFile(null);
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <h3>{header}</h3>
        {maxNumOfImagesReached && <p>{subHeader}</p>}
        {!maxNumOfImagesReached && showImages && (
          <>
            <InputElement
              type="text"
              label="Image name"
              name="imageName"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              inputError={imageNameError}
              width={100}
              alignment="left"
            />
            {urlInput && (
              <InputElement
                type="text"
                label="Url"
                name="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                inputError={urlError}
                width={100}
                alignment="left"
              />
            )}
            <p className={styles.info}>{info}</p>
            <InputElement
              type={"file"}
              label={"File"}
              name={`file-${role}`}
              value={fileInputValue}
              onChange={handleFileChange}
              inputError={fileError || compatibilityError}
              width={100}
              alignment="left"
            />
            <Button
              label={"Upload"}
              onClick={handleSubmit}
              fixedHeight={true}
            />
          </>
        )}
      </form>
      <div className={styles.gridContainer}>
        {showImages
          ? images.map((img) => (
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
