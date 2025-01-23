import ContactForm from "../../../containers/common/contactForm/ContactForm";
import styles from "./contactWindow.module.scss";

import PropTypes from "prop-types";

export default function ContactWindow({ onSetState }) {
  return (
    <div className={styles.contactWindowContainer}>
      <ContactForm onSetState={onSetState} padding={"S"} />;
    </div>
  );
}

ContactWindow.propTypes = {
  onSetState: PropTypes.func,
};
