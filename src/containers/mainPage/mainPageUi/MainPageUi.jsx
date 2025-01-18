import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import Hero from "../hero/Hero";
// import Welcome from "../welcome/Welcome";
// import Bio from "../bio/Bio";
// import Visualizations from "../visualizations/Visualizations";
// import Contact from "../../common/contact/Contact";

import {
  fetchCommonImages,
  fetchPageImages,
  selectBioImages,
  selectBioParallaxImage,
  // selectContactImages,
  selectGalleryParallaxImage,
  selectVisualizationsImages,
  selectWelcomeImages,
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
  selectName,
  selectVisualization1Text,
  // selectVisualizationsTexts,
  selectWelcome,
} from "../../../store/mainPageContentSlice";

import scss from "../../../../styles/variables.module.scss";
import styles from "./mainPageUi.module.scss";

// import { createArrayFromObject } from "../../../utilities";
import Parallax from "../parallax/parallax";
import BioParallaxContent from "../../../components/MainPage/bioParallax/bioParallaxContent";
import GalleryParallaxContent from "../../../components/MainPage/galleryParallax/galleryParallaxContent";
import PageSection from "../pageSection/pageSection";

import useMeasure from "react-use-measure";
import ContactForm from "../../../components/common/contactForm/ContactForm";

const largeDesktopWidth = parseInt(scss.largeDesktopWidth);
const mediumDesktopWidth = parseInt(scss.mediumDesktopWidth);
const smallDesktopWidth = parseInt(scss.smallDesktopWidth);
const tabletWidth = parseInt(scss.tabletWidth);
const mobileWidth = parseInt(scss.mobileWidth);

export default function MainPageUi() {
  const triggerRef = useRef(null);
  const sectionRefs = useRef([]); // Array of refs for sections

  const widthType = useSelector(selectWidthType);

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
      <div ref={addToRefs} id="welcome">
        <PageSection
          name="welcome"
          contentSelector={selectWelcome}
          imageSelector={selectWelcomeImages}
          sectionFlexDirection={widthType <= 2 ? "colum" : "row"}
          imageDisplayIsGrid={widthType > 3}
          imageDisplayGridLayout={"22"}
          imageDisplayIsFlex={widthType <= 3}
          imageDisplayFlexDirection={widthType <= 2 ? "row" : "column"}
          imageDisplayLimitImages={
            widthType <= 3 ? (widthType <= 2 ? 4 : 2) : 4
          }
          imageGap={"M"}
          isCardStyle={false}
          margins={widthType > 4 ? "L" : "S"}
          fontSize={widthType <= 1 ? "S" : "M"}
          showSocialIcons={true}
          showHeader={true}
          header={"Welcome"}
          // contentPadding={widthType <= 2 ? "L" : "M"}
          contentTextAlign={widthType <= 2 ? "center" : "left"}
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
      <div ref={addToRefs} id="bio">
        <PageSection
          name="bio"
          contentSelector={selectBio}
          imageSelector={selectBioImages}
          sectionFlexDirection={
            widthType <= 2 ? "columnReversed" : "rowReversed"
          }
          imageDisplayIsGrid={widthType <= 2 ? false : true}
          imageDisplayGridLayout={widthType <= 2 ? undefined : "mozaic"}
          imageDisplayIsFlex={widthType <= 2 ? true : false}
          imageDisplayFlexDirection={"row"}
          additionalImagesStripe={widthType <= 2 ? true : false}
          imageDisplayLimitImages={
            widthType <= 2 ? (widthType <= 1 ? 3 : 5) : undefined
          }
          imageGap={"S"}
          isCardStyle={widthType > 4}
          margins={widthType > 4 ? "L" : "S"}
          fontSize={widthType <= 2 ? "S" : "L"}
          contentPadding={widthType <= 3 ? "L" : "XL"}
          imagePadding={"XS"}
          sectionGap={widthType <= 2 ? "S" : "L"}
          showHeader={true}
          header={useSelector(selectName)}
          contentTextAlign={widthType <= 2 ? "center" : "left"}
        />
      </div>
      <div ref={addToRefs} id="galleryParallax">
        <Parallax
          imageSelector={selectGalleryParallaxImage}
          sectionId="galleryParallax"
        >
          <GalleryParallaxContent />
        </Parallax>
      </div>
      <div ref={addToRefs} id="visualizations">
        <PageSection
          name="visualizations"
          contentSelector={selectVisualization1Text}
          imageSelector={selectVisualizationsImages}
          sectionFlexDirection={
            widthType <= 2 ? "columnReversed" : "rowReversed"
          }
          imageDisplayIsGrid={false}
          imageDisplayIsFlex={true}
          imageIndex={1}
          isCardStyle={widthType > 4}
          margins={widthType > 4 ? "L" : "S"}
          fontSize={"M"}
          contentPadding={widthType <= 3 ? "L" : "XL"}
          imagePadding={"XS"}
          contentTextAlign={widthType <= 2 ? "center" : "left"}
          withBorder={true}
        />
        <PageSection
          name="visualizations"
          contentSelector={selectVisualization1Text}
          imageSelector={selectVisualizationsImages}
          sectionFlexDirection={widthType <= 2 ? "columnReversed" : "row"}
          imageDisplayIsGrid={false}
          imageDisplayIsFlex={true}
          imageIndex={2}
          // isCardStyle={widthType > 4}
          margins={"S"}
          fontSize={"M"}
          contentPadding={widthType <= 3 ? "L" : "XL"}
          imagePadding={"XS"}
          contentTextAlign={widthType <= 2 ? "center" : "right"}
          withBorder={true}
        />
        <PageSection
          name="visualizations"
          contentSelector={selectVisualization1Text}
          imageSelector={selectVisualizationsImages}
          sectionFlexDirection={
            widthType <= 2 ? "columnReversed" : "rowReversed"
          }
          imageDisplayIsGrid={false}
          imageDisplayIsFlex={true}
          imageIndex={3}
          isCardStyle={widthType > 4}
          margins={widthType > 4 ? "L" : "S"}
          fontSize={"M"}
          contentPadding={widthType <= 3 ? "L" : "XL"}
          imagePadding={"XS"}
          contentTextAlign={widthType <= 2 ? "center" : "left"}
          withBorder={true}
        />
      </div>
      <div ref={addToRefs} id="contact">
        <PageSection
          name="contact"
          imageSelector={selectBioImages}
          // contentSelector={selectVisualization1Text}
          sectionFlexDirection={widthType <= 2 ? "column" : "row"}
          imageDisplayIsGrid={widthType <= 2 ? false : true}
          imageDisplayGridLayout={widthType <= 2 ? undefined : "mozaic"}
          imageDisplayIsFlex={widthType <= 2 ? true : false}
          imageDisplayFlexDirection={"row"}
          imageGap={"S"}
          imageDisplayLimitImages={widthType <= 2 ? 4 : undefined}
          additionalImagesStripe={widthType <= 2 ? true : false}
          hasCustomContent={true}
          customContent={<ContactForm />}
          // isCardStyle={widthType > 4}
          margins={widthType > 4 ? "L" : "S"}
        />
      </div>

      {/* <Contact /> */}
    </div>
  );
}
