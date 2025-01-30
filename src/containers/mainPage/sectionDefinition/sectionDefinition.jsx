import BioParallaxContent from "../../../components/MainPage/bioParallax/bioParallaxContent";
import GalleryParallaxContent from "../../../components/MainPage/galleryParallax/galleryParallaxContent";
import ContactForm from "../../common/contactForm/ContactForm";
import PageSection from "../pageSection/pageSection";
import Parallax from "../parallax/parallax";

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

const SectionDefinition = {
  getWelcome: ({ widthType }) => (
    <PageSection
      name="welcome"
      contentSelector={selectWelcome}
      imageSelector={selectWelcomeImages}
      sectionFlexDirection={widthType <= 2 ? "column" : "row"}
      imageDisplayIsGrid={widthType > 3}
      imageDisplayGridLayout={"22"}
      imageDisplayIsFlex={widthType <= 3}
      imageDisplayFlexDirection={widthType <= 2 ? "row" : "column"}
      imageDisplayLimitImages={widthType <= 3 ? (widthType <= 2 ? 4 : 2) : 4}
      imageGap={"M"}
      sectionGap={widthType <= 2 ? "XS" : "L"}
      isCardStyle={false}
      margins={widthType > 4 ? "L" : "XS"}
      fontSize={widthType <= 1 ? "S" : "M"}
      showSocialIcons={true}
      showHeader={true}
      header={"Welcome"}
      contentTextAlign={widthType <= 2 ? "center" : "left"}
      sectionPadding={widthType <= 3 ? "S" : "M"}
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
      sectionPadding={widthType <= 3 ? "S" : "M"}
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
        sectionPadding={widthType <= 3 ? "S" : "M"}
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
      contentPadding={widthType <= 3 ? "S" : "L"}
      imagePadding={"XS"}
      sectionGap={widthType <= 2 ? "S" : "L"}
      additionalImagesStripe={widthType <= 2 ? true : false}
      hasCustomContent={true}
      customContent={<ContactForm padding={"XS"} />}
      margins={widthType > 4 ? "L" : "S"}
      sectionPadding={widthType <= 3 ? "XS" : "M"}
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
