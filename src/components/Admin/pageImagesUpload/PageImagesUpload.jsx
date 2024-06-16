import { useEffect, useState } from "react";
import api from "../../../api/api";
import styles from "./pageImagesUpload.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHeroImage,
  selectWelcomeImages,
  selectBioParallaxImage,
  selectBioImages,
  selectGalleryParallaxImage,
  selectVisualizationsImages,
  selectContactImages,
  fetchPageImages,
} from "../../../containers/mainPage/mainPageImagesSlice";
import {
  fetchCommonImages,
  selectLogoImage,
  selectSocialsIcons,
} from "../../../containers/rootNav/rootNavSlice";
import ImagesUploadForm from "../ImagesUploadForm/ImagesUploadForm";
const api_url = import.meta.env.VITE_API_BASE_URL;

export default function PageImagesUpload() {
  const [imagesReady, setImagesReady] = useState(false);
  const [uploadNum, setUploadNum] = useState(0);

  const dispatch = useDispatch();

  const heroImage = useSelector(selectHeroImage);
  const heroImageObject = { HeroImg: heroImage };

  const welcomeImages = useSelector(selectWelcomeImages);

  const bioParallaxImage = useSelector(selectBioParallaxImage);
  const bioParallaxImageObject = { BioParallaxImg: bioParallaxImage };

  const bioImages = useSelector(selectBioImages);

  const galleryParallaxImage = useSelector(selectGalleryParallaxImage);
  const galleryParallaxImageObject = {
    GalleryParallaxImg: galleryParallaxImage,
  };

  const visualizationsImages = useSelector(selectVisualizationsImages);

  const contactImages = useSelector(selectContactImages);

  const contactBig = Object.values(contactImages).filter(
    (image) => image.placement === 1
  );
  const contactBigImageObject = { ContactImg: contactBig[0] };

  const contactSmall = Object.values(contactImages).filter(
    (image) => image.placement === 2
  );
  const contactSmallImageObject = {
    ContactImg1: contactSmall[0] || null,
    ContactImg2: contactSmall[1] || null,
    ContactImg3: contactSmall[2] || null,
  };

  const logoImage = useSelector(selectLogoImage);
  const logoImageObject = { LogoImg: logoImage };

  const socialsIcons = useSelector(selectSocialsIcons);

  useEffect(() => {
    if (
      heroImage &&
      welcomeImages &&
      bioImages &&
      bioParallaxImage &&
      galleryParallaxImage &&
      visualizationsImages &&
      contactBig &&
      contactSmall &&
      logoImage &&
      socialsIcons
    ) {
      setImagesReady(true);
    }
  }, [
    heroImage,
    welcomeImages,
    bioImages,
    bioParallaxImage,
    galleryParallaxImage,
    visualizationsImages,
    contactBig,
    contactSmall,
    logoImage,
    socialsIcons,
  ]);

  async function handleSubmit(formData, endpoint) {
    await api
      .post(`${api_url}/${endpoint}`, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(fetchCommonImages());
    dispatch(fetchPageImages());
    // setUploadNum((prev) => prev + 1);
  }

  async function handleDelete(imgId) {
    await api
      .delete(`${api_url}/pageImages?id=${imgId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(fetchCommonImages());
    dispatch(fetchPageImages());
    // setUploadNum((prev) => prev + 1);
  }

  return (
    <div className={styles.container}>
      {imagesReady ? (
        <>
          <ImagesUploadForm
            role={"hero"}
            images={heroImageObject}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={false}
            onDelete={handleDelete}
          />

          <ImagesUploadForm
            role="welcome"
            images={welcomeImages}
            maxNumberOfImages={4}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={false}
            onDelete={handleDelete}
          />
          <ImagesUploadForm
            role="bioParallax"
            images={bioParallaxImageObject}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={false}
            onDelete={handleDelete}
          />
          <ImagesUploadForm
            role="bio"
            images={bioImages}
            maxNumberOfImages={11}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={true}
            onDelete={handleDelete}
          />

          <ImagesUploadForm
            role="galleryParallax"
            images={galleryParallaxImageObject}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={false}
            onDelete={handleDelete}
          />

          <ImagesUploadForm
            role="visualizations"
            images={visualizationsImages}
            maxNumberOfImages={3}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={true}
            onDelete={handleDelete}
          />

          <ImagesUploadForm
            role="contact"
            images={contactBigImageObject}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={true}
            hardPlacement={1}
            onDelete={handleDelete}
          />

          <ImagesUploadForm
            role="contact"
            images={contactSmallImageObject}
            maxNumberOfImages={3}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={true}
            hardPlacement={2}
            onDelete={handleDelete}
          />

          <ImagesUploadForm
            role="socials"
            images={socialsIcons}
            maxNumberOfImages={2}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={false}
            onDelete={handleDelete}
          />

          <ImagesUploadForm
            role="logo"
            images={logoImageObject}
            maxNumberOfImages={1}
            onSubmit={handleSubmit}
            endpoint="pageImages"
            placementsNeeded={false}
            onDelete={handleDelete}
          />
        </>
      ) : null}
    </div>
  );
}
