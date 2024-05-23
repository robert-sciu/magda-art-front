import styles from "./contactGridTile.module.scss";
import PropTypes from "prop-types";

export default function ContactGridTile({ img }) {
  return (
    <div className={img.placement === 1 ? styles.imgBig : styles.imgSmall}>
      <img src={img.url} alt="" />
    </div>
  );
}

ContactGridTile.propTypes = {
  img: PropTypes.object.isRequired,
};
