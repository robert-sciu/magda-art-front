import { useEffect, useRef } from "react";

import PageImagesUploadForm from "../pageImagesUploadForm/PageImagesUploadForm";
import { useDispatch, useSelector } from "react-redux";

import {
  selectHeroImage,
  selectWelcomeImages,
  selectBioParallaxImage,
  selectBioImages,
  selectGalleryParallaxImage,
  selectVisualizationsImages,
  fetchPageImages,
  deletePageImage,
  setRoleToRefetch,
  uploadPageImage,
  selectPageImagesRoleToRefetch,
  selectPageImagesRefetchNeeded,
  fetchPageImagesForRole,
  selectLogoImage,
  selectPageImagesLoadingStatus,
  selectPageImagesFetchStatus,
  selectSocialIcons,
  selectCommonImagesFetchStatus,
  fetchCommonImages,
} from "../../../store/mainPageImagesSlice";

import styles from "./pageImagesUploadManager.module.scss";

import config from "../../../../config/config";

const uploadInfo = {
  bigSquareImages:
    "SQUARE Image with width and height equal or larger than 2000px is HIGHLY recommended",
  bigImages:
    "Image with width equal or larger than 2000px is HIGHLY recommended",
  smallSquareImages:
    "due to tehnological limitations images should be perfectly square with width equal or bigger than 500px",
  visualizationSquareImages:
    "Due to technical limitations images should be perfectly square with width equal or bigger than 1000px",
  socialIcons:
    "Should be square image in svg(!!!) format or unexpected behaviour may occur",
};

export default function PageImagesUploadManager() {
  const dispatch = useDispatch();

  const roleToRefetch = useSelector(selectPageImagesRoleToRefetch);
  const refetchNeeded = useSelector(selectPageImagesRefetchNeeded);
  const isLoading = useSelector(selectPageImagesLoadingStatus);
  const pageImagesFetchComplete = useSelector(selectPageImagesFetchStatus);
  const commonImagesFetchComplete = useSelector(selectCommonImagesFetchStatus);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (isLoading || (pageImagesFetchComplete && commonImagesFetchComplete))
      return;
    if (!hasFetched.current) {
      hasFetched.current = true;
      pageImagesFetchComplete || dispatch(fetchPageImages());
      commonImagesFetchComplete || dispatch(fetchCommonImages());
    }
  }, [dispatch, isLoading, pageImagesFetchComplete, commonImagesFetchComplete]);

  useEffect(() => {
    if (!refetchNeeded) return;
    if (isLoading) return;
    dispatch(fetchPageImagesForRole(roleToRefetch));
  });

  async function handleSubmit({ data, file }) {
    dispatch(setRoleToRefetch(data.role));
    dispatch(uploadPageImage({ data, file }));
  }

  async function handleDelete({ id, role }) {
    dispatch(setRoleToRefetch(role));
    dispatch(deletePageImage({ id }));
  }
  const pageImagesQuantityLimits = config.pageImagesQuantityLimits;
  return (
    <div className={styles.container}>
      <PageImagesUploadForm
        role="logo"
        selector={selectLogoImage}
        maxNumberOfImages={pageImagesQuantityLimits.logo}
        onSubmit={handleSubmit}
        info={uploadInfo.smallSquareImages}
        onDelete={handleDelete}
      />
      <PageImagesUploadForm
        role="socials"
        selector={selectSocialIcons}
        maxNumberOfImages={pageImagesQuantityLimits.socials}
        onSubmit={handleSubmit}
        info={uploadInfo.socialIcons}
        onDelete={handleDelete}
        urlInput={true}
      />
      <PageImagesUploadForm
        role={"hero"}
        selector={selectHeroImage}
        maxNumberOfImages={pageImagesQuantityLimits.hero}
        onSubmit={handleSubmit}
        info={uploadInfo.bigImages}
        onDelete={handleDelete}
      />
      <PageImagesUploadForm
        role="welcome"
        selector={selectWelcomeImages}
        maxNumberOfImages={pageImagesQuantityLimits.welcome}
        onSubmit={handleSubmit}
        info={uploadInfo.smallSquareImages}
        onDelete={handleDelete}
      />
      <PageImagesUploadForm
        role="bioParallax"
        selector={selectBioParallaxImage}
        maxNumberOfImages={pageImagesQuantityLimits.bioParallax}
        onSubmit={handleSubmit}
        info={uploadInfo.bigImages}
        onDelete={handleDelete}
      />
      <PageImagesUploadForm
        role="bio"
        selector={selectBioImages}
        maxNumberOfImages={pageImagesQuantityLimits.bio}
        onSubmit={handleSubmit}
        info={uploadInfo.smallSquareImages}
        // placementsNeeded={true}
        onDelete={handleDelete}
      />
      <PageImagesUploadForm
        role="galleryParallax"
        selector={selectGalleryParallaxImage}
        maxNumberOfImages={pageImagesQuantityLimits.galleryParallax}
        onSubmit={handleSubmit}
        info={uploadInfo.bigSquareImages}
        onDelete={handleDelete}
      />
      <PageImagesUploadForm
        role="visualizations"
        selector={selectVisualizationsImages}
        maxNumberOfImages={pageImagesQuantityLimits.visualizations}
        onSubmit={handleSubmit}
        info={uploadInfo.visualizationSquareImages}
        // placementsNeeded={true}
        onDelete={handleDelete}
      />
    </div>
  );
}
