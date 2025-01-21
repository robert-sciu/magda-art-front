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

import { desanitizeString } from "../../../utilities/utilities";

export default function GalleryImagesUploadForm({
  selector,
  // endpoint,
  onSubmit,
  onDelete,
  imageToEdit = null,
}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [file, setFile] = useState(null);
  const [fileInputValue, setFileInputValue] = useState("");
  const [imageName, setImageName] = useState("");
  const [width_cm, setWidth_cm] = useState("");
  const [height_cm, setHeight_cm] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [description_de, setDescription_de] = useState("");
  const [description_es, setDescription_es] = useState("");
  const [description_pl, setDescription_pl] = useState("");

  const [price, setPrice] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const [showImages, setShowImages] = useState(false);
  const [imageNameError, setImageNameError] = useState("");
  const [fileError, setFileError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [widthError, setWidthError] = useState("");
  const [descriptionEnError, setDescriptionEnError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [selectedInput, setSelectedInput] = useState("");

  const images = useSelector(selector);

  // const imagesArray = createArrayFromObject(images)[1];

  useEffect(() => {
    if (!images) return;
    setShowImages(true);
  }, [images]);

  useEffect(() => {
    if (imageToEdit) {
      setFile(null);
      setFileInputValue("");
      setImageName(desanitizeString(imageToEdit.title));
      setDescription_en(desanitizeString(imageToEdit.description_en));
      setDescription_de(desanitizeString(imageToEdit.description_de));
      setDescription_es(desanitizeString(imageToEdit.description_es));
      setDescription_pl(desanitizeString(imageToEdit.description_pl));
      setWidth_cm(imageToEdit.width_cm);
      setHeight_cm(imageToEdit.height_cm);
      setPrice(imageToEdit.price_eur);
      setIsAvailable(imageToEdit.is_available);
      setDescriptionEnError("");
      setFileError("");
      setHeightError("");
      setWidthError("");
      setPriceError("");
      setImageNameError("");
      setIsUpdate(true);
    } else {
      setImageName("");
      setDescription_en("");
      setDescription_de("");
      setDescription_es("");
      setDescription_pl("");
      setWidth_cm("");
      setHeight_cm("");
      setPrice("");
      setIsAvailable(true);
      setIsUpdate(false);
      setShowDelete(false);
    }
  }, [imageToEdit]);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setFileInputValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    resetErrors([
      setImageNameError,
      setFileError,
      setDescriptionEnError,
      setHeightError,
      setWidthError,
      setPriceError,
    ]);

    const isValid = await checkUploadInfo({
      isUpdate,
      imageName,
      file,
      width_cm,
      height_cm,
      description_en,
      price,
      onImageNameError: setImageNameError,
      onFileError: setFileError,
      onDescriptionEnError: setDescriptionEnError,
      onHeightError: setHeightError,
      onWidthError: setWidthError,
      onPriceError: setPriceError,
    });

    if (!isValid) return;

    const data = {
      title: imageName,
      description_en,
      description_de,
      description_es,
      description_pl,
      width_cm,
      height_cm,
      price_eur: price,
      is_available: isAvailable,
    };

    await onSubmit({
      data,
      file: file || null,
    });

    setImageName("");
    setWidth_cm("");
    setHeight_cm("");
    setDescription_en("");
    setDescription_de("");
    setDescription_es("");
    setDescription_pl("");
    setFileInputValue("");
    setFile(null);
    setPrice("");
    setIsAvailable(true);
    setSelectedInput("");
  }

  function handleShowDelete(e) {
    e.preventDefault();
    setShowDelete((prev) => !prev);
  }

  function handleDelete(e) {
    e.preventDefault();
    onDelete({ id: imageToEdit.id });
  }

  function handleFocus(e) {
    e.target.select();
    setSelectedInput(e.target.name);
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <h3>{isUpdate ? "Update Image" : "Upload Image to Gallery"}</h3>
        <InputElement
          type={"text"}
          label={"Title"}
          name={"title"}
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          inputError={imageNameError}
          width={100}
          alignment="left"
          onFocus={handleFocus}
        />
        <InputElement
          type={selectedInput === "descriptionEn" ? "textArea" : "text"}
          label={"Description (en)"}
          name={"descriptionEn"}
          value={description_en}
          onChange={(e) => setDescription_en(e.target.value)}
          inputError={descriptionEnError}
          width={100}
          alignment="left"
          onFocus={handleFocus}
        />
        <InputElement
          type={selectedInput === "descriptionDe" ? "textArea" : "text"}
          label={"Description (de)"}
          name={"descriptionDe"}
          value={description_de}
          onChange={(e) => setDescription_de(e.target.value)}
          // inputError={descriptionError}
          width={100}
          alignment="left"
          onFocus={handleFocus}
        />
        <InputElement
          type={selectedInput === "descriptionEs" ? "textArea" : "text"}
          label={"Description (es)"}
          name={"descriptionEs"}
          value={description_es}
          onChange={(e) => setDescription_es(e.target.value)}
          // inputError={descriptionEsError}
          width={100}
          alignment="left"
          onFocus={handleFocus}
        />
        <InputElement
          type={selectedInput === "descriptionPl" ? "textArea" : "text"}
          label={"Description (pl)"}
          name={"descriptionPl"}
          value={description_pl}
          onChange={(e) => setDescription_pl(e.target.value)}
          // inputError={descriptionError}
          width={100}
          alignment="left"
          onFocus={handleFocus}
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
          onFocus={handleFocus}
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
          onFocus={handleFocus}
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
          onFocus={handleFocus}
        />
        <InputElement
          type={"checkbox"}
          label={"isAvailable"}
          value={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
          name={"sold"}
          width={100}
          alignment="left"
          onFocus={handleFocus}
        />
        {!isUpdate && (
          <InputElement
            type={"file"}
            label={"File"}
            name={"file-gallery"}
            value={fileInputValue}
            onChange={handleFileChange}
            inputError={fileError}
            width={100}
            alignment="left"
            onFocus={handleFocus}
          />
        )}

        <Button label={isUpdate ? "Update" : "Upload"} onClick={handleSubmit} />
        {isUpdate && (
          <Button
            label={showDelete ? "Cancel" : "Show Delete"}
            onClick={handleShowDelete}
          />
        )}
        {showDelete && (
          <Button label={"Delete"} style={"redBtn"} onClick={handleDelete} />
        )}
      </form>
      <div className={styles.gridContainer}>
        {showImages
          ? images.map((img) => (
              <ImageInspector
                img={img}
                key={img.id}
                onDelete={handleDelete}
                type="gallery"
              />
            ))
          : null}
      </div>
    </div>
  );
}

GalleryImagesUploadForm.propTypes = {
  selector: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  imageToEdit: PropTypes.object,
};
