import styles from "./contactInfo.module.scss";

import PropTypes from "prop-types";

export default function ContactInfo({ messageStatus, onConfirm }) {
  function handleClick(e) {
    e.preventDefault();
    onConfirm();
  }
  return (
    <div className={styles.contactInfo}>
      <p>{messageStatus}</p>
      <button onClick={handleClick}>ok</button>
    </div>
  );
}

ContactInfo.propTypes = {
  messageStatus: PropTypes.string,
  onConfirm: PropTypes.func,
};
