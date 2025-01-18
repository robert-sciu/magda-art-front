import { useSelector } from "react-redux";
import styles from "./pageSection.module.scss";
import { useEffect, useState } from "react";
import {
  capitalizeString,
  classNameFormatter,
} from "../../../utilities/utilities";
import he from "he";
import PropTypes from "prop-types";
import ImageDisplayManager from "../imageDisplayManager.jsx/imageDisplayManager";
import SocialIcons from "../../common/socialIcons/SocialIcons";

// import polyfill from "@juggle/resize-observer";

export default function PageSection({
  name,
  contentSelector,
  imageSelector,
  isCardStyle,
  imageDisplayIsGrid,
  imageDisplayGridLayout,
  imageDisplayIsFlex,
  imageDisplayFlexDirection,
  additionalImagesStripe,
  sectionFlexDirection,
  imageDisplayLimitImages,
  imageIndex,
  imageGap,
  margins,
  fontSize,
  showSocialIcons = false,
  contentPadding = "L",
  imagePadding = "L",
  sectionGap = "L",
  showHeader = false,
  header = "",
  contentTextAlign = "left",
  withBorder = false,
  hasCustomContent = false,
  customContent = undefined,
}) {
  const [decodedContent, setDecodedContent] = useState("");

  const emptySelector = () => null;

  const content = useSelector(contentSelector || emptySelector);
  const images = useSelector(imageSelector || emptySelector);

  useEffect(() => {
    if (content) {
      /////// what the hell is this about
      //TODO: get to the bottom of this
      setDecodedContent(he.decode(he.decode(content)));
    }
  }, [content]);

  return (
    <div
      name={name}
      className={classNameFormatter({
        styles,
        classNames: [
          "pageSectionContainer",
          sectionFlexDirection &&
            `flex${capitalizeString(sectionFlexDirection)}`,
          `gap${capitalizeString(sectionGap)}`,
          isCardStyle && "cardStyle",
          margins && `margin${capitalizeString(margins)}`,
        ],
      })}
    >
      {additionalImagesStripe && (
        <div
          className={classNameFormatter({
            styles,
            classNames: [
              "imageContainer",
              "flex30",
              imageDisplayGridLayout === "mozaic" && "mozaicOverflow",
              `padding${capitalizeString(imagePadding)}`,
            ],
          })}
        >
          <ImageDisplayManager
            sectionName={name}
            images={images}
            isGrid={imageDisplayIsGrid}
            gridLayout={imageDisplayGridLayout}
            isFlex={imageDisplayIsFlex}
            flexDirection={imageDisplayFlexDirection}
            imageGap={imageGap}
            limitImages={imageDisplayLimitImages}
            isAdditional={true}
            withBorder={withBorder}
          />
        </div>
      )}
      <div
        className={classNameFormatter({
          styles,
          classNames: [
            "contentContainer",
            "flexColumn",
            `font${fontSize}`,
            "flex70",
            `padding${capitalizeString(contentPadding)}`,
            `textAlign${capitalizeString(contentTextAlign)}`,
          ],
        })}
      >
        {showHeader && <h3 className={styles.header}>{header}</h3>}
        <div
          className={classNameFormatter({
            styles,
            classNames: [
              "content",
              `textAlign${capitalizeString(contentTextAlign)}`,
            ],
          })}
        >
          {hasCustomContent && customContent}
          {!hasCustomContent && decodedContent}
          {showSocialIcons && <SocialIcons size={"L"} />}
        </div>
      </div>
      <div
        className={classNameFormatter({
          styles,
          classNames: [
            "imageContainer",
            "flex30",
            imageDisplayGridLayout === "mozaic" && "mozaicOverflow",
            `padding${capitalizeString(imagePadding)}`,
          ],
        })}
      >
        <ImageDisplayManager
          sectionName={name}
          images={
            imageIndex ? images.slice(imageIndex - 1, imageIndex) : images
          }
          isGrid={imageDisplayIsGrid}
          gridLayout={imageDisplayGridLayout}
          isFlex={imageDisplayIsFlex}
          flexDirection={imageDisplayFlexDirection}
          imageGap={imageGap}
          limitImages={imageDisplayLimitImages}
          withBorder={withBorder}
        />
      </div>
    </div>
  );
}

PageSection.propTypes = {
  name: PropTypes.string,
  contentSelector: PropTypes.func,
  imageSelector: PropTypes.func,
  imageDisplayIsGrid: PropTypes.bool,
  imageDisplayIsFlex: PropTypes.bool,
  imageDisplayFlexDirection: PropTypes.string,
  imageDisplayLimitImages: PropTypes.number,
  isCardStyle: PropTypes.bool,
  margins: PropTypes.string,
  fontSize: PropTypes.string,
  sectionFlexDirection: PropTypes.string,
  showSocialIcons: PropTypes.bool,
  imageDisplayGridLayout: PropTypes.string,
  imageGap: PropTypes.string,
  contentPadding: PropTypes.string,
  imagePadding: PropTypes.string,
  sectionGap: PropTypes.string,
  showHeader: PropTypes.bool,
  header: PropTypes.string,
  additionalImagesStripe: PropTypes.bool,
  imageIndex: PropTypes.number,
  contentTextAlign: PropTypes.string,
  withBorder: PropTypes.bool,
  hasCustomContent: PropTypes.bool,
  customContent: PropTypes.object,
};
