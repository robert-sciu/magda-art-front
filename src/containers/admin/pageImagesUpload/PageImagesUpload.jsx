import { useDispatch } from "react-redux";
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
} from "../../../containers/mainPage/mainPageUi/mainPageImagesSlice";
import {
  selectAllImages,
  fetchImages,
} from "../../../containers/galleryPage/galleryPageUi/galleryPageSlice";

import {
  fetchCommonImages,
  selectLogoImage,
  selectSocialsIcons,
} from "../../../containers/rootNav/rootNavSlice";

import styles from "./pageImagesUpload.module.scss";

import api from "../../../api/api";
const api_url = import.meta.env.VITE_API_BASE_URL;

export default function PageImagesUpload() {
  const { uploadSection } = useParams();

  const dispatch = useDispatch();

  async function handleSubmit(
    endpoint,
    file,
    imageName,
    role,
    freePlacement,
    width_cm,
    height_cm,
    description,
    externalUrl
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "JSON",
      JSON.stringify({
        imageName: imageName,
        title: imageName,
        role: role || undefined,
        placement: freePlacement || undefined,
        width_cm: Number(width_cm) || undefined,
        height_cm: Number(height_cm) || undefined,
        description: description || undefined,
        externalUrl: externalUrl || undefined,
      })
    );

    try {
      await api.post(`${api_url}/${endpoint}`, formData);
    } catch (error) {
      console.log(error);
    }
    reloadImages();
  }

  async function handleDelete(endpoint, imgId) {
    try {
      await api.delete(`${api_url}/${endpoint}?id=${imgId}`);
    } catch (error) {
      console.log(error);
    }
    reloadImages();
  }

  function reloadImages() {
    dispatch(fetchCommonImages());
    dispatch(fetchPageImages());
    dispatch(fetchImages());
  }

  return (
    <div className={styles.container}>
      {uploadSection === "pageImages" && (
        <>
          <PageImagesUploadForm
            role={"hero"}
            selector={selectHeroImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="welcome"
            selector={selectWelcomeImages}
            maxNumberOfImages={4}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="bioParallax"
            selector={selectBioParallaxImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="bio"
            selector={selectBioImages}
            maxNumberOfImages={11}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={true}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="galleryParallax"
            selector={selectGalleryParallaxImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="visualizations"
            selector={selectVisualizationsImages}
            maxNumberOfImages={3}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={true}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="contactBig"
            selector={selectBigContactImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
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
            placementsNeeded={true}
            hardPlacement={2}
            onDelete={handleDelete}
          />
          <PageImagesUploadForm
            role="socials"
            selector={selectSocialsIcons}
            maxNumberOfImages={2}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            onDelete={handleDelete}
            urlInput={true}
          />
          <PageImagesUploadForm
            role="logo"
            selector={selectLogoImage}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
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
