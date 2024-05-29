import ImageTile from "../../common/image/ImageTile";
import styles from "./contactGridTile.module.scss";
import PropTypes from "prop-types";
import scss from "../../../../styles/variables.module.scss";

export default function ContactGridTile({ img }) {
  return (
    <div className={img.placement === 1 ? styles.imgBig : styles.imgSmall}>
      <ImageTile img={img} spinnerColor={scss.mainGray} />
    </div>
  );
}

ContactGridTile.propTypes = {
  img: PropTypes.object.isRequired,
};
