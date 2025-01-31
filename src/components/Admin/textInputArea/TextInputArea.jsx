import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import InputElement from "../../elements/inputElement/InputElement";
import Button from "../../elements/button/Button";

import styles from "./textInputArea.module.scss";

/**
 * A component that renders an input field with edit/save functionality.
 *
 * When the edit button is clicked, the input field becomes editable and the
 * save button appears. The input field is disabled until the edit button is
 * clicked. When the save button is clicked, the onSubmit function is called
 * with the heading and new input data. The component then reverts back to
 * non-editable state.
 *
 * @param {string} heading - The heading text to be displayed above the input field
 * @param {string} inputData - The initial input value
 * @param {function} onChange - The function to call when the input value changes
 * @param {boolean} isTextArea - Whether the input field should be a text area or a normal input field
 * @param {function} onSubmit - The function to call when the save button is clicked
 * @param {boolean} isLoading - Whether the component is currently loading
 */
export default function TextInputArea({
  heading,
  inputData,
  onChange,
  isTextArea,
  onSubmit,
  isLoading,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [originalContent, setOriginalContent] = useState("");
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  useEffect(() => {
    if (showEdit && isLoading) {
      setBtnIsLoading(true);
    }
    if (btnIsLoading && !isLoading) {
      const timeoutId = setTimeout(() => {
        setBtnIsLoading(false);
        setShowEdit(false);
      }, 1000); // this timeout may be unnecessary but from the user's experience perspective,
      // it looks better to wait a second than to just see the flash of the button spinner
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, showEdit, btnIsLoading]);

  function handleToggleEdit(e) {
    e.preventDefault();
    if (showEdit) {
      onChange(originalContent); // if the user is canceling the edit, we need to revert back to the original content
    }
    if (!showEdit) {
      setOriginalContent(inputData); // if the user is editing for the first time, we need to store the original content
    }
    setShowEdit(!showEdit);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(e, heading, inputData, onChange, originalContent);
  }

  return (
    <>
      <div className={styles.buttonsContainer}>
        <div className={styles.actionBtn}>
          <Button
            onClick={handleToggleEdit}
            label={`Edit ${heading}`}
            activeLabel={"Cancel"}
            isActive={showEdit}
            disabled={btnIsLoading}
            flexStretch={true}
          />
        </div>
        <div className={styles.actionBtn}>
          <Button
            onClick={handleSubmit}
            label={"Save Changes"}
            activeLabel={"Save Changes"}
            style={showEdit ? "greenBtn" : null}
            isLoading={btnIsLoading}
            loadingLabel={"Save Changes"}
            disabled={!showEdit}
            flexStretch={true}
          />
        </div>
      </div>

      <InputElement
        type={isTextArea && showEdit ? "textArea" : "text"}
        value={inputData}
        name={heading}
        width={100}
        onChange={(e) => onChange(e.target.value)}
        isDisabled={!showEdit}
        textAlign={"left"}
      />
    </>
  );
}

TextInputArea.propTypes = {
  role: PropTypes.string,
  inputData: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.string,
  isTextArea: PropTypes.bool,
  onSubmit: PropTypes.func,
  heading: PropTypes.string,
  isLoading: PropTypes.bool,
};
