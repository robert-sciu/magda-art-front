import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PageImagesUploadForm from "../pageImagesUploadForm/PageImagesUploadForm";
import GalleryImagesUploadForm from "../galleryImagesUploadForm/GalleryImagesUploadForm";

import {
  selectHeroImage,
  selectWelcomeImages,
  selectBioParallaxImage,
  selectBioImages,
  selectGalleryParallaxImage,
  selectVisualizationsImages,
  fetchPageImages,
  selectBigContactImage,
  selectSmallContactImages,
  deletePageImage,
  setRoleToRefetch,
  uploadPageImage,
  selectPageImagesRoleToRefetch,
  selectPageImagesRefetchNeeded,
  fetchPageImagesForRole,
  selectLogoImage,
  fetchCommonImages,
} from "../../../store/mainPageImagesSlice";

import { selectAllImages } from "../../galleryPage/galleryPageUi/galleryPageSlice";

import { selectSocialsIcons } from "../../rootNav/rootNavSlice";

import styles from "./imagesUploadManager.module.scss";

import { useEffect } from "react";

const uploadInfo = {
  bigImages:
    "SQUARE Image with width and height equal or larger than 2500px is HIGHLY recommended",
  smallImages:
    "due to tehnological limitations images should be perfectly square with width equal or bigger than 500px",
  visualizationImages:
    "Due to technical limitations images should be perfectly square with width equal or bigger than 1000px",
  bigContactImage:
    "An image with witdth equal or larger than 500 and height equal or larger than 1500px is recommended. REMEMBER TO UPLOAD IMAGE WITH 3:1 ASPECT RATIO",
  socialIcons:
    "Should be square image in svg(!!!) format or unexpected behaviour may occur",
};

export default function ImagesUploadManager() {
  const { uploadSection } = useParams();

  const dispatch = useDispatch();

  const roleToRefetch = useSelector(selectPageImagesRoleToRefetch);
  const refetchNeeded = useSelector(selectPageImagesRefetchNeeded);

  useEffect(() => {
    dispatch(fetchPageImages());
    dispatch(fetchCommonImages());
  }, [dispatch]);

  useEffect(() => {
    if (!refetchNeeded) return;
    dispatch(fetchPageImagesForRole(roleToRefetch));
  });

  async function handleSubmit({
    // endpoint,
    file,
    imageName,
    role,
    freePlacement,
    externalUrl,
  }) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "JSON",
      JSON.stringify({
        imageName: imageName,
        title: imageName,
        role: role || undefined,
        placement: freePlacement || undefined,
        externalUrl: externalUrl || undefined,
      })
    );
    dispatch(setRoleToRefetch(role));
    dispatch(uploadPageImage({ data: formData }));
  }

  async function handleDelete({ id, role }) {
    dispatch(setRoleToRefetch(role));
    dispatch(deletePageImage({ id }));
  }

  return (
    <div className={styles.container}>
      {uploadSection === "pageImages" && (
        <>
          <PageImagesUploadForm
            role="logo"
            selector={selectLogoImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.smallImages}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="socials"
            selector={selectSocialsIcons}
            maxNumberOfImages={Infinity}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.socialIcons}
            onDelete={handleDelete}
            urlInput={true}
          />
          <PageImagesUploadForm
            role={"hero"}
            selector={selectHeroImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.bigImages}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="welcome"
            selector={selectWelcomeImages}
            maxNumberOfImages={4}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.smallImages}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="bioParallax"
            selector={selectBioParallaxImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.bigImages}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="bio"
            selector={selectBioImages}
            maxNumberOfImages={12}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.smallImages}
            placementsNeeded={true}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="galleryParallax"
            selector={selectGalleryParallaxImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.bigImages}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="visualizations"
            selector={selectVisualizationsImages}
            maxNumberOfImages={3}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.visualizationImages}
            placementsNeeded={true}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="contactBig"
            selector={selectBigContactImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.bigContactImage}
            placementsNeeded={true}
            hardPlacement={1}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="contactSmall"
            selector={selectSmallContactImages}
            maxNumberOfImages={3}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            info={uploadInfo.smallImages}
            placementsNeeded={true}
            hardPlacement={2}
            onDelete={handleDelete}
          />
        </>
      )}
      {uploadSection === "galleryImages" && (
        <GalleryImagesUploadForm
          selector={selectAllImages}
          endpoint={"paintings"}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
