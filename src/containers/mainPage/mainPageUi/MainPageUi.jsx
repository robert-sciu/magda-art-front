import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Hero from "../hero/Hero";
import Welcome from "../welcome/Welcome";
import BioParallax from "../../../components/MainPage/bioParallax/BioParallax";
import Bio from "../bio/Bio";
import GalleryParallax from "../../../components/MainPage/galleryParallax/GalleryParallax";
import Visualizations from "../visualizations/Visualizations";
import Contact from "../contact/Contact";

import {
  selectBioParallaxImage,
  selectGalleryParallaxImage,
} from "./mainPageImagesSlice";

import styles from "./mainPageUi.module.scss";

import { createArrayFromObject } from "../../../utilities";

export default function MainPageUi() {
  const [bioParallaxImageArray, setBioParallaxImageArray] = useState([]);
  // prettier-ignore
  const [galleryParallaxImageArray, setGalleryParallaxImageArray] = useState([]);

  const bioParallaxImage = useSelector(selectBioParallaxImage);
  const galleryParallaxImage = useSelector(selectGalleryParallaxImage);

  useEffect(() => {
    const bioParallaxImageArray = createArrayFromObject(bioParallaxImage);
    if (bioParallaxImageArray.length > 0)
      setBioParallaxImageArray(bioParallaxImageArray);
  }, [bioParallaxImage]);

  useEffect(() => {
    const galleryParallaxImageArray =
      createArrayFromObject(galleryParallaxImage);
    if (galleryParallaxImageArray.length > 0)
      setGalleryParallaxImageArray(galleryParallaxImageArray);
  }, [galleryParallaxImage]);

  return (
    <div className={styles.uiContainer}>
      <Hero />
      <Welcome />
      <BioParallax bioParallaxImageArray={bioParallaxImageArray} />
      <Bio />
      <GalleryParallax galleryParallaxImageArray={galleryParallaxImageArray} />
      <Visualizations />
      <Contact />
    </div>
  );
}
