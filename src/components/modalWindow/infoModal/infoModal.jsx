import PropTypes from "prop-types";

import Button from "../../elements/button/Button";

import styles from "./infoModal.module.scss";

import { desanitizeString } from "../../../utilities/utilities";

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
  info: PropTypes.object,
  onCancel: PropTypes.func,
  dispatch: PropTypes.func,
};
