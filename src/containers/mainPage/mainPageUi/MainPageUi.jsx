import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import Hero from "../hero/Hero";

import {
  // fetchCommonImages,
  fetchPageImages,
  selectBioImages,
  selectBioParallaxImage,
  selectGalleryParallaxImage,
  selectVisualizationsImages,
  selectWelcomeImages,
  // selectPageImagesFetchStatus,
  setSectionInView,
} from "../../../store/mainPageImagesSlice";
import {
  selectWidthType,
  setFixedNav,
  setLocation,
  setWidthType,
} from "../../../store/rootNavSlice";
import {
  fetchContent,
  selectBio,
  selectContentFetchComplete,
  selectName,
  selectVisualizationsTexts,
  selectWelcome,
} from "../../../store/mainPageContentSlice";

import scss from "../../../../styles/variables.module.scss";
import styles from "./mainPageUi.module.scss";

// import { createArrayFromObject } from "../../../utilities";
import Parallax from "../parallax/parallax";
import BioParallaxContent from "../../../components/MainPage/bioParallax/bioParallaxContent";
import GalleryParallaxContent from "../../../components/MainPage/galleryParallax/galleryParallaxContent";

import useMeasure from "react-use-measure";
import SectionDefinition from "../sectionDefinition/sectionDefinition";
import PageSection from "../pageSection/pageSection";
import ContactForm from "../../../components/common/contactForm/ContactForm";
// import LoadingState from "../../../components/loadingState/loadingState";

const largeDesktopWidth = parseInt(scss.largeDesktopWidth);
const mediumDesktopWidth = parseInt(scss.mediumDesktopWidth);
const smallDesktopWidth = parseInt(scss.smallDesktopWidth);
const tabletWidth = parseInt(scss.tabletWidth);
const mobileWidth = parseInt(scss.mobileWidth);

export default function MainPageUi() {
  const triggerRef = useRef(null);
  const sectionRefs = useRef([]); // Array of refs for sections

  const widthType = useSelector(selectWidthType);
  const visualizations = useSelector(selectVisualizationsTexts);
  const contentFetchComplete = useSelector(selectContentFetchComplete);
  // const imagesFetchComplete = useSelector(selectPageImagesFetchStatus);

  const [refMeasure, bounds] = useMeasure();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!bounds) return;
    if (bounds.width < mobileWidth) {
      if (widthType === 1) return;
      dispatch(setWidthType(1));
    } else if (bounds.width < tabletWidth) {
      if (widthType === 2) return;
      dispatch(setWidthType(2));
    } else if (bounds.width < smallDesktopWidth) {
      if (widthType === 3) return;
      dispatch(setWidthType(3));
    } else if (bounds.width < mediumDesktopWidth) {
      if (widthType === 4) return;
      dispatch(setWidthType(4));
    } else if (bounds.width < largeDesktopWidth) {
      if (widthType === 5) return;
      dispatch(setWidthType(5));
    } else {
      if (widthType === 6) return;
      dispatch(setWidthType(6));
    }
  }, [bounds, widthType, dispatch]);

  console.log(widthType);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    dispatch(setLocation(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(fetchPageImages());
    // dispatch(fetchCommonImages());
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
        });
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
    <div className={styles.uiContainer} ref={refMeasure}>
      <Hero />
      <div ref={triggerRef} className={styles.refDiv} />
      <div ref={addToRefs} id="welcome" />
      <div>{SectionDefinition.getWelcome({ widthType })}</div>
      <div ref={addToRefs} id="bioParallax" />
      <div>{SectionDefinition.getBioParallax()}</div>
      <div ref={addToRefs} id="bio" />
      <div>{SectionDefinition.getBio({ widthType })}</div>
      <div ref={addToRefs} id="galleryParallax" />
      <div>{SectionDefinition.getGalleryParallax()}</div>
      <div ref={addToRefs} id="visualizations" />
      <div>
        {SectionDefinition.getVisualizations({
          widthType,
          visualizations,
          readyToRender: contentFetchComplete,
        })}
      </div>
      <div ref={addToRefs} id="contact" />
      <div>{SectionDefinition.getContact({ widthType })}</div>
    </div>
  );
}
