import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import GalleryImagesUploadForm from "../galleryImagesUploadForm/GalleryImagesUploadForm";
import ModalWindowMain from "../../modalWindow/ModalWindowMain";

import {
  clearGalleryErrors,
  deleteGalleryImage,
  fetchGalleryImages,
  resetImgToEdit,
  selectGalleryPageImages,
  selectGalleryPageImagesErrorMessage,
  selectGalleryPageImagesErrorStatus,
  selectGalleryPageImagesRefetchNeeded,
  selectImageToEdit,
  selectUpdatedImageData,
  setImgToEdit,
  updateGalleryImage,
  uploadGalleryImage,
} from "../../../store/galleryPageSlice";

import styles from "./galleryImagesUploadManager.module.scss";

export default function GalleryImagesUploadManager() {
  const dispatch = useDispatch();

  const refetchNeeded = useSelector(selectGalleryPageImagesRefetchNeeded);
  const hasError = useSelector(selectGalleryPageImagesErrorStatus);
  const error = useSelector(selectGalleryPageImagesErrorMessage);
  const imageToEdit = useSelector(selectImageToEdit);
  const updatedImageData = useSelector(selectUpdatedImageData);

  useEffect(() => {
    dispatch(fetchGalleryImages());
  }, [dispatch]);

  useEffect(() => {
    if (!refetchNeeded) return;
    dispatch(fetchGalleryImages());
  });

  function handleSubmit({ data, file }) {
    if (imageToEdit) {
      dispatch(updateGalleryImage({ data, id: imageToEdit.id }));
      dispatch(setImgToEdit(null));
    } else if (!imageToEdit) {
      dispatch(uploadGalleryImage({ data, file }));
    }
  }
  function handleDelete({ id }) {
    dispatch(deleteGalleryImage({ id }));
  }
  return (
    <div className={styles.container}>
      <GalleryImagesUploadForm
        selector={selectGalleryPageImages}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        imageToEdit={imageToEdit}
      />
      {hasError && (
        <ModalWindowMain
          modalType={"error"}
          data={error}
          onCancel={clearGalleryErrors}
        />
      )}
      {updatedImageData && (
        <ModalWindowMain
          modalType={"info"}
          data={updatedImageData}
          onCancel={resetImgToEdit}
          width="L"
        />
      )}
    </div>
  );
}
