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
  fetchPageImages,
  selectBioParallaxImage,
  selectGalleryParallaxImage,
} from "./mainPageImagesSlice";
import { setFixedNav, setLocation } from "../../rootNav/rootNavSlice";
import { fetchContent } from "../../../store/mainPageContentSlice";

import styles from "./mainPageUi.module.scss";

import { createArrayFromObject } from "../../../utilities";

export default function MainPageUi() {
  const [bioParallaxImageArray, setBioParallaxImageArray] = useState([]);
  // prettier-ignore
  const [galleryParallaxImageArray, setGalleryParallaxImageArray] = useState([]);

  const triggerRef = useRef(null);

  const bioParallaxImage = useSelector(selectBioParallaxImage);
  const galleryParallaxImage = useSelector(selectGalleryParallaxImage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLocation(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(fetchPageImages());
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
    const triggerRefCurrent = triggerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.y < 0) {
          dispatch(setFixedNav(true));
        } else {
          dispatch(setFixedNav(false));
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px",
      }
    );
    if (triggerRefCurrent) {
      observer.observe(triggerRefCurrent);
    }
    return () => {
      if (triggerRefCurrent) {
        observer.unobserve(triggerRefCurrent);
      }
    };
  }, [triggerRef, dispatch]);

  return (
    <div className={styles.uiContainer}>
      <Hero />
      <div ref={triggerRef} className={styles.refDiv} />
      <Welcome />
      <BioParallax bioParallaxImageArray={bioParallaxImageArray} />
      <Bio />
      <GalleryParallax galleryParallaxImageArray={galleryParallaxImageArray} />
      <Visualizations />
      <Contact />
    </div>
  );
}
