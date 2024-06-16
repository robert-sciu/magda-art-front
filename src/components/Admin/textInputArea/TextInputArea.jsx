import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./textInputArea.module.scss";

export default function TextInputArea({
  heading,
  inputData,
  onChange,
  large,
  submit,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [originalContent, setOriginalContent] = useState("");

  function handleToggleEdit(e) {
    e.preventDefault();
    if (showEdit) {
      onChange(originalContent);
    }
    if (!showEdit) {
      setOriginalContent(inputData);
    }
    setShowEdit(!showEdit);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowEdit(false);

    submit(e, heading, inputData);
  }

  return (
    <>
      <button
        className={showEdit ? styles.activeEditButton : null}
        onClick={handleToggleEdit}
      >
        {showEdit ? "Cancel" : `Edit ${heading}`}
      </button>
      <textarea
        rows={showEdit && large ? 8 : 1}
        type="text"
        id={heading}
        name={heading}
        value={inputData}
        onChange={(e) => onChange(e.target.value)}
        disabled={!showEdit}
      />
      {showEdit ? (
        <button className={styles.saveButton} onClick={handleSubmit}>
          Save Changes
        </button>
      ) : null}
    </>
  );
}

TextInputArea.propTypes = {
  role: PropTypes.string,
  inputData: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.string,
  large: PropTypes.bool,
  submit: PropTypes.func,
  heading: PropTypes.string,
};
