import PropTypes from "prop-types";

import ImageTile from "../../common/imageTile/ImageTile";

import styles from "./visualizationTile.module.scss";
import scss from "../../../../styles/variables.module.scss";
import ImageDisplay from "../../../containers/common/imageDisplay/imageDisplay";

export default function VisualizationTile({ image, text, imgSideReverse }) {
  return (
    <div
      className={`${styles.tileContainer} ${imgSideReverse && styles.reversed}`}
    >
      <div className={styles.textContainer}>
        <p>{text}</p>
      </div>
      <div className={styles.imageContainer}>
        {/* <ImageTile img={image} spinnerColor={scss.mainGray} /> */}
        <ImageDisplay img={image} type={"pageImage"} />
      </div>
    </div>
  );
}

VisualizationTile.propTypes = {
  image: PropTypes.object,
  text: PropTypes.string,
  imgSideReverse: PropTypes.bool,
};
