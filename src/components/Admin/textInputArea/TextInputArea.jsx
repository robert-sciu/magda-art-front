import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./textInputArea.module.scss";
import InputElement from "../../elements/inputElement/inputElement";
import Button from "../../elements/button/button";

export default function TextEditor({
  heading,
  inputData,
  onChange,
  large,
  submit,
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
      setTimeout(() => {
        setBtnIsLoading(false);
        setShowEdit(false);
      }, 1000);
    }
  }, [isLoading, showEdit, btnIsLoading]);

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
    // setShowEdit(false);

    submit(e, heading, inputData, onChange, originalContent);
  }

  return (
    <>
      <div className={styles.buttonsContainer}>
        <Button
          onClick={handleToggleEdit}
          label={`Edit ${heading}`}
          activeLabel={"Cancel"}
          isActive={showEdit}
          disabled={btnIsLoading}
        />
        <Button
          onClick={handleSubmit}
          label={"Save Changes"}
          activeLabel={"Save Changes"}
          style={showEdit ? "greenBtn" : null}
          // isActive={showEdit}
          isLoading={btnIsLoading}
          loadingLabel={"Save Changes"}
          disabled={!showEdit}
        />
      </div>

      <InputElement
        type={large && showEdit ? "textArea" : "text"}
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

TextEditor.propTypes = {
  role: PropTypes.string,
  inputData: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.string,
  large: PropTypes.bool,
  submit: PropTypes.func,
  heading: PropTypes.string,
  isLoading: PropTypes.bool,
};
