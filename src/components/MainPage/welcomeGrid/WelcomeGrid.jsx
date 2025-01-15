import PropTypes from "prop-types";

import ImageTile from "../../common/imageTile/ImageTile";

import styles from "./welcomeGrid.module.scss";
import { useSelector } from "react-redux";
import { selectSectionInView } from "../../../store/mainPageImagesSlice";
import { forwardRef } from "react";

export const WelcomeGrid = forwardRef(({ welcomeImagesArray }, ref) => {
  const sectionInView = useSelector((state) =>
    selectSectionInView(state, "welcome")
  );

  return (
    <div className={styles.gridContainer} ref={ref}>
      {welcomeImagesArray.map((img) => (
        <ImageTile
          img={img}
          alt={img.name}
          key={img.id}
          isVisible={sectionInView}
        />
      ))}
    </div>
  );
});

WelcomeGrid.displayName = "WelcomeGrid";

export default WelcomeGrid;

WelcomeGrid.propTypes = {
  welcomeImagesArray: PropTypes.array,
};
