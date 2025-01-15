import { useEffect } from "react";
import {
  clearGalleryErrors,
  deleteGalleryImage,
  fetchGalleryImages,
  selectGalleryPageImages,
  selectGalleryPageImagesErrorMessage,
  selectGalleryPageImagesErrorStatus,
  selectGalleryPageImagesRefetchNeeded,
  uploadGalleryImage,
} from "../../../store/galleryPageSlice";
import GalleryImagesUploadForm from "../galleryImagesUploadForm/galleryImagesUploadForm";

import styles from "./galleryImagesUploadManager.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ModalWindowMain from "../../modalWindow/modalWindowMain";

export default function GalleryImagesUploadManager() {
  const dispatch = useDispatch();

  const refetchNeeded = useSelector(selectGalleryPageImagesRefetchNeeded);
  const hasError = useSelector(selectGalleryPageImagesErrorStatus);
  const error = useSelector(selectGalleryPageImagesErrorMessage);

  useEffect(() => {
    dispatch(fetchGalleryImages());
  }, [dispatch]);

  useEffect(() => {
    if (!refetchNeeded) return;
    dispatch(fetchGalleryImages());
  });

  function handleSubmit({ data, file }) {
    dispatch(uploadGalleryImage({ data, file }));
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
      />
      {hasError && (
        <ModalWindowMain
          modalType={"error"}
          data={error}
          onCancel={clearGalleryErrors}
        />
      )}
    </div>
  );
}
