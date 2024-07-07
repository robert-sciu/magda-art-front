import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Hero from "../hero/Hero";
import Welcome from "../welcome/Welcome";
import BioParallax from "../../../components/MainPage/bioParallax/BioParallax";
import Bio from "../bio/Bio";
import GalleryParallax from "../../../components/MainPage/galleryParallax/GalleryParallax";
import Visualizations from "../visualizations/Visualizations";
import Contact from "../../common/contact/Contact";

import {
  selectBioParallaxImage,
  selectGalleryParallaxImage,
} from "./mainPageImagesSlice";

import styles from "./mainPageUi.module.scss";

import { createArrayFromObject } from "../../../utilities";
import { setLocation } from "../../rootNav/rootNavSlice";

export default function MainPageUi() {
  const [bioParallaxImageArray, setBioParallaxImageArray] = useState([]);
  // prettier-ignore
  const [galleryParallaxImageArray, setGalleryParallaxImageArray] = useState([]);
  const [navIsFixed, setNavIsFixed] = useState(false);

  const bioRef = useRef(null);

  const bioParallaxImage = useSelector(selectBioParallaxImage);
  const galleryParallaxImage = useSelector(selectGalleryParallaxImage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLocation(window.location.pathname));
  }, [dispatch]);

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

  useEffect(() => {
    const bioRefCurrent = bioRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.y < 0) {
          setNavIsFixed(true);
        } else {
          setNavIsFixed(false);
        }
      },
      {
        root: null,

        threshold: 0,
        rootMargin: "0px",
      }
    );
    if (bioRefCurrent) {
      observer.observe(bioRefCurrent);
    }
    return () => {
      if (bioRefCurrent) {
        observer.unobserve(bioRefCurrent);
      }
    };
  }, []);

  console.log(navIsFixed);

  return (
    <div className={styles.uiContainer}>
      <Hero />
      <Welcome />
      <BioParallax bioParallaxImageArray={bioParallaxImageArray} />
      <Bio ref={bioRef} />
      <GalleryParallax galleryParallaxImageArray={galleryParallaxImageArray} />
      <Visualizations />
      <Contact />
    </div>
  );
}
