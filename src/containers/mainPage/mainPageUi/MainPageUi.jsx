import { useEffect, useRef } from "react";

import { useDispatch } from "react-redux";

import Hero from "../hero/Hero";
// import Welcome from "../welcome/Welcome";
import Bio from "../bio/Bio";
import Visualizations from "../visualizations/Visualizations";
import Contact from "../../common/contact/Contact";

import {
  fetchCommonImages,
  fetchPageImages,
  selectBioParallaxImage,
  selectGalleryParallaxImage,
  selectWelcomeImages,
  setSectionInView,
} from "../../../store/mainPageImagesSlice";
import { setFixedNav, setLocation } from "../../../store/rootNavSlice";
import {
  fetchContent,
  selectWelcome,
} from "../../../store/mainPageContentSlice";

import styles from "./mainPageUi.module.scss";

// import { createArrayFromObject } from "../../../utilities";
import Parallax from "../parallax/parallax";
import BioParallaxContent from "../../../components/MainPage/bioParallax/bioParallaxContent";
import GalleryParallaxContent from "../../../components/MainPage/galleryParallax/galleryParallaxContent";
import PageSection from "../pageSection/pageSection";

export default function MainPageUi() {
  const triggerRef = useRef(null);
  const sectionRefs = useRef([]); // Array of refs for sections

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLocation(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(fetchPageImages());
    dispatch(fetchCommonImages());
  }, [dispatch]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updatedSections = {};

        entries.forEach((entry) => {
          updatedSections[entry.target.id] = entry.isIntersecting;
          // updatedSections[entry.target.id] = true;
        });

        // setVisibleSections((prev) => ({ ...prev, ...updatedSections }));

        // Dispatch action for the first visible section
        const inViewSection = Object.keys(updatedSections).find(
          (id) => updatedSections[id]
        );

        if (inViewSection) {
          dispatch(setSectionInView(inViewSection));
        }
      },
      {
        root: null, // Viewport as the root
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [dispatch]);

  return (
    <div className={styles.uiContainer}>
      <Hero />
      <div ref={triggerRef} className={styles.refDiv} />
      <div ref={addToRefs} id="welcome">
        {/* <Welcome /> */}
        <PageSection
          contentSelector={selectWelcome}
          imageSelector={selectWelcomeImages}
        />
      </div>
      <div ref={addToRefs} id="bioParallax">
        <Parallax
          imageSelector={selectBioParallaxImage}
          sectionId="bioParallax"
        >
          <BioParallaxContent />
        </Parallax>
      </div>
      <Bio />
      <div ref={addToRefs} id="galleryParallax">
        <Parallax
          imageSelector={selectGalleryParallaxImage}
          sectionId="galleryParallax"
        >
          <GalleryParallaxContent />
        </Parallax>
      </div>
      <Visualizations />
      <Contact />
    </div>
  );
}
