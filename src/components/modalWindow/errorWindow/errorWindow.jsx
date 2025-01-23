import Button from "../../elements/button/Button";
import styles from "./errorWindow.module.scss";
import PropTypes from "prop-types";

export default function ErrorWindow({ error, onCancel, dispatch }) {
  function handleClick() {
    dispatch(onCancel());
  }
  return (
    <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
      <p>{error}</p>
      <Button label={"close"} onClick={handleClick} />
    </div>
  );
}

ErrorWindow.propTypes = {
  error: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
