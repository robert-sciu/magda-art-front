import PropTypes from "prop-types";

import ImageTile from "../../common/imageTile/ImageTile";

import styles from "./welcomeGrid.module.scss";

export default function WelcomeGrid({ welcomeImagesArray }) {
  return (
    <div className={styles.gridContainer}>
      {welcomeImagesArray.map((img) => (
        <ImageTile img={img} alt={img.name} key={img.id} />
      ))}
    </div>
  );
}

WelcomeGrid.propTypes = {
  welcomeImagesArray: PropTypes.array,
};
