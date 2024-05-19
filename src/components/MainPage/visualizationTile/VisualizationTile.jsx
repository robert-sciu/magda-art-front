import styles from "./visualizationTile.module.scss";
import PropTypes from "prop-types";
import scss from "../../../../styles/variables.module.scss";

export default function VisualizationTile({ image, text, imgSideReverse }) {
  console.log(imgSideReverse);
  const styleObject = {
    flexDirection: imgSideReverse || "row-reverse",
    backgroundColor: imgSideReverse || scss.mainLightGray,
  };
  return (
    <div className={styles.tileContainer} style={styleObject}>
      <div className={styles.textContainer}>
        <p>{text}</p>
      </div>
      <div className={styles.imageContainer}>
        <img src={image.url} />
      </div>
    </div>
  );
}

VisualizationTile.propTypes = {
  image: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  imgSideReverse: PropTypes.bool.isRequired,
};
