import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import ImageInspector from "../../../components/Admin/imageInspector/ImageInspector";

import styles from "./galleryImagesUploadForm.module.scss";

import {
  checkUploadInfo,
  // createArrayFromObject,
  resetErrors,
} from "../../../utilities";
import InputElement from "../../../components/elements/inputElement/inputElement";
import Button from "../../../components/elements/button/button";

export default function GalleryImagesUploadForm({
  selector,
  // endpoint,
  onSubmit,
  onDelete,
}) {
  const [file, setFile] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");
  const [imageName, setImageName] = useState("");
  const [width_cm, setWidth_cm] = useState("");
  const [height_cm, setHeight_cm] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isSold, setIsSold] = useState(false);

  const [showImages, setShowImages] = useState(false);
  const [imageNameError, setImageNameError] = useState("");
  const [fileError, setFileError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [widthError, setWidthError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");

  const images = useSelector(selector);

  // const imagesArray = createArrayFromObject(images)[1];

  useEffect(() => {
    if (!images) return;
    setShowImages(true);
  }, [images]);

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
      setPriceError,
    ]);

    const isValid = await checkUploadInfo({
      imageName,
      file,
      width_cm,
      height_cm,
      description,
      price,
      onImageNameError: setImageNameError,
      onFileError: setFileError,
      onDescriptionError: setDescriptionError,
      onHeightError: setHeightError,
      onWidthError: setWidthError,
      onPriceError: setPriceError,
    });

    if (!isValid) return;

    const data = {
      title: imageName,
      description,
      width_cm,
      height_cm,
      price_eur: price,
      is_sold: isSold,
    };

    await onSubmit({
      data,
      file,
    });

    setImageName("");
    setWidth_cm("");
    setHeight_cm("");
    setDescription("");
    setFileInputValue("");
    setFile(null);
    setPrice("");
    setIsSold(false);
  }

  function handleDelete({ id }) {
    onDelete({ id });
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <h3>Upload Image to Gallery</h3>
        <InputElement
          type={"text"}
          label={"Title"}
          name={"title"}
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          inputError={imageNameError}
          width={100}
          alignment="left"
        />
        <InputElement
          type={"text"}
          label={"Description"}
          name={"description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputError={descriptionError}
          width={100}
          alignment="left"
        />
        <InputElement
          type={"text"}
          label={"Width (cm)"}
          name={"width_cm"}
          value={width_cm}
          onChange={(e) => setWidth_cm(e.target.value)}
          inputError={widthError}
          width={100}
          alignment="left"
        />
        <InputElement
          type={"text"}
          label={"Height (cm)"}
          name={"height_cm"}
          value={height_cm}
          onChange={(e) => setHeight_cm(e.target.value)}
          inputError={heightError}
          width={100}
          alignment="left"
        />
        <InputElement
          type={"text"}
          label={"Price (€)"}
          name={"price"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          inputError={priceError}
          width={100}
          alignment="left"
        />
        <InputElement
          type={"checkbox"}
          label={"Sold"}
          value={isSold}
          onChange={(e) => setIsSold(e.target.checked)}
          name={"sold"}
          width={100}
          alignment="left"
        />
        <InputElement
          type={"file"}
          label={"File"}
          name={"file-gallery"}
          value={fileInputValue}
          onChange={handleFileChange}
          inputError={fileError}
          width={100}
          alignment="left"
        />

        <Button label="Upload" onClick={handleSubmit} />
      </form>
      <div className={styles.gridContainer}>
        {showImages
          ? images.map((img) => (
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
