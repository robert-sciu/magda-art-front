import ContactForm from "../../../components/common/contactForm/ContactForm";
import BioParallaxContent from "../../../components/MainPage/bioParallax/bioParallaxContent";
import GalleryParallaxContent from "../../../components/MainPage/galleryParallax/galleryParallaxContent";
import {
  selectBio,
  selectName,
  selectVisualizationsTexts,
  selectWelcome,
} from "../../../store/mainPageContentSlice";
import {
  selectBioImages,
  selectBioParallaxImage,
  selectGalleryParallaxImage,
  selectVisualizationsImages,
  selectWelcomeImages,
} from "../../../store/mainPageImagesSlice";
import PageSection from "../pageSection/pageSection";
import Parallax from "../parallax/parallax";
// import React from "react";

const SectionDefinition = {
  getWelcome: ({ widthType }) => (
    <PageSection
      name="welcome"
      contentSelector={selectWelcome}
      imageSelector={selectWelcomeImages}
      sectionFlexDirection={widthType <= 2 ? "colum" : "row"}
      imageDisplayIsGrid={widthType > 3}
      imageDisplayGridLayout={"22"}
      imageDisplayIsFlex={widthType <= 3}
      imageDisplayFlexDirection={widthType <= 2 ? "row" : "column"}
      imageDisplayLimitImages={widthType <= 3 ? (widthType <= 2 ? 4 : 2) : 4}
      imageGap={"M"}
      isCardStyle={false}
      margins={widthType > 4 ? "L" : "S"}
      fontSize={widthType <= 1 ? "S" : "M"}
      showSocialIcons={true}
      showHeader={true}
      header={"Welcome"}
      contentTextAlign={widthType <= 2 ? "center" : "left"}
    />
  ),
  getBio: ({ widthType }) => (
    <PageSection
      name="bio"
      contentSelector={selectBio}
      imageSelector={selectBioImages}
      sectionFlexDirection={widthType <= 2 ? "columnReversed" : "rowReversed"}
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
      headerSelector={selectName}
      contentTextAlign={widthType <= 2 ? "center" : "left"}
    />
  ),
  getVisualizations: ({ widthType, visualizations, readyToRender }) => {
    if (!readyToRender) {
      return null;
    }
    return Object.keys(visualizations).map((contentKey, index) => (
      <PageSection
        name="visualizations"
        key={`visualizations-${index}`}
        contentSelector={selectVisualizationsTexts}
        contentKey={contentKey}
        contentFlexWidth={widthType <= 3 ? "flex60" : "flex70"}
        imageSelector={selectVisualizationsImages}
        imageIndex={index + 1}
        sectionFlexDirection={
          widthType <= 2
            ? "columnReversed"
            : index % 2 === 0
            ? "rowReversed"
            : "row"
        }
        imageDisplayIsGrid={false}
        imageDisplayIsFlex={true}
        imageDisplayFlexDirection={widthType <= 3 ? "flex40" : "flex30"}
        isCardStyle={widthType > 4 && index % 2 === 0}
        margins={widthType > 4 ? "L" : "S"}
        fontSize={"M"}
        contentPadding={widthType <= 3 ? "L" : "XL"}
        imagePadding={"XS"}
        contentTextAlign={
          widthType <= 2 ? "center" : index % 2 === 0 ? "left" : "right"
        }
        withBorder={true}
      />
    ));
  },
  getContact: ({ widthType }) => (
    <PageSection
      name="contact"
      imageSelector={selectBioImages}
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
      margins={widthType > 4 ? "L" : "S"}
    />
  ),
  getBioParallax: () => (
    <Parallax imageSelector={selectBioParallaxImage} sectionId="bioParallax">
      <BioParallaxContent />
    </Parallax>
  ),
  getGalleryParallax: () => (
    <Parallax
      imageSelector={selectGalleryParallaxImage}
      sectionId="galleryParallax"
    >
      <GalleryParallaxContent />
    </Parallax>
  ),
};

export default SectionDefinition;

// return (
//   <div className={styles.uiContainer} ref={refMeasure}>
//     <Hero />
//     <div ref={triggerRef} className={styles.refDiv} />
//     <div ref={addToRefs} id="welcome">
//       <PageSection
//         name="welcome"
//         contentSelector={selectWelcome}
//         imageSelector={selectWelcomeImages}
//         sectionFlexDirection={widthType <= 2 ? "colum" : "row"}
//         imageDisplayIsGrid={widthType > 3}
//         imageDisplayGridLayout={"22"}
//         imageDisplayIsFlex={widthType <= 3}
//         imageDisplayFlexDirection={widthType <= 2 ? "row" : "column"}
//         imageDisplayLimitImages={widthType <= 3 ? (widthType <= 2 ? 4 : 2) : 4}
//         imageGap={"M"}
//         isCardStyle={false}
//         margins={widthType > 4 ? "L" : "S"}
//         fontSize={widthType <= 1 ? "S" : "M"}
//         showSocialIcons={true}
//         showHeader={true}
//         header={"Welcome"}
//         contentTextAlign={widthType <= 2 ? "center" : "left"}
//       />
//     </div>
//     <div ref={addToRefs} id="bioParallax">
//       <Parallax imageSelector={selectBioParallaxImage} sectionId="bioParallax">
//         <BioParallaxContent />
//       </Parallax>
//     </div>
//     <div ref={addToRefs} id="bio">
//       <PageSection
//         name="bio"
//         contentSelector={selectBio}
//         imageSelector={selectBioImages}
//         sectionFlexDirection={widthType <= 2 ? "columnReversed" : "rowReversed"}
//         imageDisplayIsGrid={widthType <= 2 ? false : true}
//         imageDisplayGridLayout={widthType <= 2 ? undefined : "mozaic"}
//         imageDisplayIsFlex={widthType <= 2 ? true : false}
//         imageDisplayFlexDirection={"row"}
//         additionalImagesStripe={widthType <= 2 ? true : false}
//         imageDisplayLimitImages={
//           widthType <= 2 ? (widthType <= 1 ? 3 : 5) : undefined
//         }
//         imageGap={"S"}
//         isCardStyle={widthType > 4}
//         margins={widthType > 4 ? "L" : "S"}
//         fontSize={widthType <= 2 ? "S" : "L"}
//         contentPadding={widthType <= 3 ? "L" : "XL"}
//         imagePadding={"XS"}
//         sectionGap={widthType <= 2 ? "S" : "L"}
//         showHeader={true}
//         headerSelector={selectName}
//         contentTextAlign={widthType <= 2 ? "center" : "left"}
//       />
//     </div>
//     <div ref={addToRefs} id="galleryParallax">
//       <Parallax
//         imageSelector={selectGalleryParallaxImage}
//         sectionId="galleryParallax"
//       >
//         <GalleryParallaxContent />
//       </Parallax>
//     </div>
//     <div ref={addToRefs} id="visualizations">
//       {contentFetchComplete && (
//         <PageSection
//           name="visualizations"
//           contentSelector={selectVisualizationsTexts}
//           contentKey={"visualization1"}
//           contentFlexWidth={widthType <= 3 ? "flex60" : "flex70"}
//           imageSelector={selectVisualizationsImages}
//           imageIndex={1}
//           sectionFlexDirection={
//             widthType <= 2 ? "columnReversed" : "rowReversed"
//           }
//           imageDisplayIsGrid={false}
//           imageDisplayIsFlex={true}
//           imageDisplayFlexDirection={widthType <= 3 ? "flex40" : "flex30"}
//           isCardStyle={widthType > 4}
//           margins={widthType > 4 ? "L" : "S"}
//           fontSize={"M"}
//           contentPadding={widthType <= 3 ? "L" : "XL"}
//           imagePadding={"XS"}
//           contentTextAlign={widthType <= 2 ? "center" : "left"}
//           withBorder={true}
//         />
//       )}
//       {contentFetchComplete && (
//         <PageSection
//           name="visualizations"
//           contentSelector={selectVisualizationsTexts}
//           contentKey={"visualization2"}
//           contentFlexWidth={widthType <= 3 ? "flex60" : "flex70"}
//           imageSelector={selectVisualizationsImages}
//           imageIndex={2}
//           sectionFlexDirection={widthType <= 2 ? "columnReversed" : "row"}
//           imageDisplayIsGrid={false}
//           imageDisplayIsFlex={true}
//           imageDisplayFlexDirection={widthType <= 3 ? "flex40" : "flex30"}
//           isCardStyle={false}
//           margins={widthType > 4 ? "L" : "S"}
//           fontSize={"M"}
//           contentPadding={widthType <= 3 ? "L" : "XL"}
//           imagePadding={"XS"}
//           contentTextAlign={widthType <= 2 ? "center" : "left"}
//           withBorder={true}
//         />
//       )}
//       {contentFetchComplete && (
//         <PageSection
//           name="visualizations"
//           contentSelector={selectVisualizationsTexts}
//           contentKey={"visualization3"}
//           contentFlexWidth={widthType <= 3 ? "flex60" : "flex70"}
//           imageSelector={selectVisualizationsImages}
//           imageIndex={3}
//           sectionFlexDirection={
//             widthType <= 2 ? "columnReversed" : "rowReversed"
//           }
//           imageDisplayIsGrid={false}
//           imageDisplayIsFlex={true}
//           imageDisplayFlexDirection={widthType <= 3 ? "flex40" : "flex30"}
//           isCardStyle={widthType > 4}
//           margins={widthType > 4 ? "L" : "S"}
//           fontSize={"M"}
//           contentPadding={widthType <= 3 ? "L" : "XL"}
//           imagePadding={"XS"}
//           contentTextAlign={widthType <= 2 ? "center" : "left"}
//           withBorder={true}
//         />
//       )}
//     </div>
//     <div ref={addToRefs} id="contact">
//       <PageSection
//         name="contact"
//         imageSelector={selectBioImages}
//         sectionFlexDirection={widthType <= 2 ? "column" : "row"}
//         imageDisplayIsGrid={widthType <= 2 ? false : true}
//         imageDisplayGridLayout={widthType <= 2 ? undefined : "mozaic"}
//         imageDisplayIsFlex={widthType <= 2 ? true : false}
//         imageDisplayFlexDirection={"row"}
//         imageGap={"S"}
//         imageDisplayLimitImages={widthType <= 2 ? 4 : undefined}
//         additionalImagesStripe={widthType <= 2 ? true : false}
//         hasCustomContent={true}
//         customContent={<ContactForm />}
//         margins={widthType > 4 ? "L" : "S"}
//       />
//     </div>
//   </div>
// );
