import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import ImageDisplayManager from "../imageDisplayManager.jsx/imageDisplayManager";
import SocialIcons from "../../../components/common/socialIcons/SocialIcons";

import styles from "./pageSection.module.scss";

import {
  capitalizeString,
  classNameFormatter,
  desanitizeString,
} from "../../../utilities/utilities";

export default function PageSection({
  name,
  contentSelector,
  contentKey = false,
  contentFlexWidth = "flex70",
  imageSelector,
  isCardStyle,
  imageDisplayIsGrid,
  imageDisplayGridLayout,
  imageDisplayIsFlex,
  imageDisplayFlexDirection,
  imageDisplayFlexWidth = "flex30",
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
  headerSelector = false,
  contentTextAlign = "left",
  withBorder = false,
  hasCustomContent = false,
  customContent = undefined,
}) {
  const [decodedContent, setDecodedContent] = useState("");
  const emptySelector = () => null;

  const content = useSelector(contentSelector || emptySelector);
  const images = useSelector(imageSelector || emptySelector);
  const header = useSelector(headerSelector || emptySelector);

  useEffect(() => {
    if (content) {
      /////// what the hell is this about
      //TODO: get to the bottom of this
      setDecodedContent(
        desanitizeString(contentKey ? content?.[contentKey] : content)
      );
    }
  }, [content, contentKey]);

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
              imageDisplayFlexWidth,
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
            contentFlexWidth,
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
              showSocialIcons && "gapM",
              sectionFlexDirection === "column" &&
                showSocialIcons &&
                "contentCenter",
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
  contentKey: PropTypes.string,
  contentFlexWidth: PropTypes.string,
  imageSelector: PropTypes.func,
  isCardStyle: PropTypes.bool,
  imageDisplayIsGrid: PropTypes.bool,
  imageDisplayGridLayout: PropTypes.string,
  imageDisplayIsFlex: PropTypes.bool,
  imageDisplayFlexDirection: PropTypes.string,
  imageDisplayFlexWidth: PropTypes.string,
  additionalImagesStripe: PropTypes.bool,
  sectionFlexDirection: PropTypes.string,
  imageDisplayLimitImages: PropTypes.number,
  imageIndex: PropTypes.number,
  imageGap: PropTypes.string,
  margins: PropTypes.string,
  fontSize: PropTypes.string,
  showSocialIcons: PropTypes.bool,
  contentPadding: PropTypes.string,
  imagePadding: PropTypes.string,
  sectionGap: PropTypes.string,
  showHeader: PropTypes.bool,
  headerSelector: PropTypes.func,
  contentTextAlign: PropTypes.string,
  withBorder: PropTypes.bool,
  hasCustomContent: PropTypes.bool,
  customContent: PropTypes.object,
};
