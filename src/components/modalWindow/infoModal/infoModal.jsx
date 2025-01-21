import { desanitizeString } from "../../../utilities/utilities";
import Button from "../../elements/button/button";
import styles from "./infoModal.module.scss";

import PropTypes from "prop-types";

export default function InfoModal({ info, onCancel, dispatch }) {
  function handleClick(e) {
    e.stopPropagation();
    dispatch(onCancel());
  }
  return (
    <div className={styles.modalWindow}>
      <div className={styles.infoContainer}>
        {Object.entries(info).map(([key, value]) => {
          if (
            [
              "id",
              "width_px",
              "height_px",
              "filename_desktop",
              "filename_mobile",
              "filename_lazy",
            ].includes(key)
          )
            return;
          return (
            <div key={key} className={styles.infoTextContainer}>
              <p>{`${key}: `}</p>
              <p>{desanitizeString(`${value}`)}</p>
            </div>
          );
        })}
      </div>
      <Button label={"Ok"} onClick={handleClick} />
    </div>
  );
}

InfoModal.propTypes = {
  info: PropTypes.obj,
  onCancel: PropTypes.func,
  dispatch: PropTypes.func,
};
