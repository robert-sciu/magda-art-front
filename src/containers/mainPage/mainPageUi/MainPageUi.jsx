import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Hero from "../hero/Hero";

import {
  fetchPageImages,
  selectHeroImgLoadedHQ,
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
  selectContentFetchComplete,
  selectVisualizationsTexts,
} from "../../../store/mainPageContentSlice";

import scss from "../../../../styles/variables.module.scss";
import styles from "./mainPageUi.module.scss";

import useMeasure from "react-use-measure";
import SectionDefinition from "../sectionDefinition/sectionDefinition";
import LoadingState from "../../../components/loadingState/LoadingState";
import { useScrollLock } from "../../../utilities/customHooks";

const largeDesktopWidth = parseInt(scss.largeDesktopWidth);
const mediumDesktopWidth = parseInt(scss.mediumDesktopWidth);
const smallDesktopWidth = parseInt(scss.smallDesktopWidth);
const tabletWidth = parseInt(scss.tabletWidth);
const mobileWidth = parseInt(scss.mobileWidth);
export default function MainPageUi() {
  const [scrollDisabled, setScrollDisabled] = useState(true);
  const [hideLoadingState, setHideLoadingState] = useState(false);
  const triggerRef = useRef(null);
  const sectionRefs = useRef([]);

  const widthType = useSelector(selectWidthType);
  const visualizations = useSelector(selectVisualizationsTexts);
  const contentFetchComplete = useSelector(selectContentFetchComplete);
  const heroImageHQLoaded = useSelector(selectHeroImgLoadedHQ);

  const [refMeasure, bounds] = useMeasure();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useScrollLock(scrollDisabled);

  useEffect(() => {
    if (!heroImageHQLoaded) return;
    const timeoutId = setTimeout(() => {
      setScrollDisabled(false);
      setHideLoadingState(true);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [heroImageHQLoaded]);

  useEffect(() => {
    dispatch(setLocation(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(fetchPageImages());
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
    if (!contentFetchComplete) return;
    const curentRefs = sectionRefs.current;
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
        root: null,
        threshold: 0.5,
      }
    );
    curentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      curentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [contentFetchComplete, sectionRefs, dispatch]);

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
      <LoadingState fadeOut={hideLoadingState} fullscreen={true} />
    </div>
  );
}
