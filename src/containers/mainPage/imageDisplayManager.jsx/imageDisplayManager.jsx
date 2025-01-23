import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import ImageDisplay from "../../../components/elements/imageDisplay/ImageDisplay";

import { selectSectionInView } from "../../../store/mainPageImagesSlice";

import styles from "./imageDisplayManager.module.scss";

import {
  capitalizeString,
  classNameFormatter,
} from "../../../utilities/utilities";
import { mozaicSequences } from "./mozaicSequences";

export default function ImageDisplayManager({
  sectionName,
  images,
  isGrid,
  gridLayout,
  isFlex,
  flexDirection = "row",
  limitImages = images.length,
  imageGap = "M",
  isAdditional = false,
  withBorder = false,
}) {
  const sectionInView = useSelector((state) =>
    selectSectionInView(state, sectionName)
  );

  const mozaicSequenceTypes = mozaicSequences;

  return (
    <>
      {gridLayout !== "mozaic" && (
        <div
          className={classNameFormatter({
            styles,
            classNames: [
              isFlex && "flexContainer",
              isFlex && `flex${capitalizeString(flexDirection)}`,
              isGrid && "gridContainer",
              gridLayout === "22" && "grid22",
              `gap${capitalizeString(imageGap)}`,
            ],
          })}
        >
          {images
            .slice(
              isAdditional ? images.length - limitImages - 1 : 0,
              isAdditional ? -1 : limitImages
            )
            .map((img) => (
              <div key={img.id} className={styles.imageContainer}>
                <ImageDisplay
                  img={img}
                  alt={img.name}
                  isVisible={sectionInView}
                  type="pageImage"
                  border={withBorder}
                  roundEdges={withBorder}
                />
              </div>
            ))}
        </div>
      )}
      {isGrid && gridLayout === "mozaic" && mozaicSequenceTypes && (
        <div className={styles.mozaic}>
          {mozaicSequenceTypes.map((sequence, sequenceIndex) => {
            const sliceStart = sequence.slice[0];
            const sliceEnd = sequence.slice[1];
            const classSequence = sequence.sequence;
            {
              return (
                <div
                  key={sequenceIndex}
                  className={classNameFormatter({
                    styles,
                    classNames: [
                      "gridContainer",
                      "gridMozaic",
                      sequence.gridType,
                      `gap${capitalizeString(imageGap)}`,
                    ],
                  })}
                >
                  {images.slice(sliceStart, sliceEnd).map((img, i) => (
                    <div
                      key={img.id}
                      className={classNameFormatter({
                        styles,
                        classNames: [classSequence[i]],
                      })}
                    >
                      <ImageDisplay
                        img={img}
                        alt={img.name}
                        isVisible={sectionInView}
                        type="pageImage"
                      />
                    </div>
                  ))}
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
}

ImageDisplayManager.propTypes = {
  sectionName: PropTypes.string,
  images: PropTypes.array,
  isGrid: PropTypes.bool,
  gridLayout: PropTypes.string,
  isFlex: PropTypes.bool,
  flexDirection: PropTypes.string,
  limitImages: PropTypes.number,
  imageGap: PropTypes.string,
  isAdditional: PropTypes.bool,
  withBorder: PropTypes.bool,
};
