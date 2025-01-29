import PropTypes from "prop-types";

import Button from "../button/Button";

import styles from "./inputElement.module.scss";

import {
  capitalizeString,
  classNameFormatter,
  getFileNameFromUrl,
} from "../../../utilities/utilities";

/**
 * A component that renders an input element with a label and handles
 * various input types such as text, email, password, file, checkbox, and
 * textArea.
 *
 * @param {string} type - The type of input element to render.
 * @param {string} value - The value of the input element.
 * @param {string} [label=false] - The label to display next to the input element.
 * @param {string} [inputError=false] - The error message to display below the input element.
 * @param {function} onChange - The function to call when the input element's value changes.
 * @param {string} [width] - The width of the input element.
 * @param {string} [name=""] - The name of the input element.
 * @param {string} [autoComplete="off"] - The auto complete setting for the input element.
 * @param {string} [alignment="center"] - The alignment of the input element.
 * @param {string} [textAlign="left"] - The text alignment of the input element.
 * @param {boolean} [isDisabled=false] - Whether the input element is disabled.
 * @param {function} [onFocus=() => {}] - The function to call when the input element is focused.
 *
 * @return {ReactElement}
 */
export default function InputElement({
  type,
  value,
  label = false,
  inputError = false,
  onChange,
  width,
  name,
  autoComplete = "off",
  alignment = "center",
  textAlign = "left",
  isDisabled = false,
  onFocus = () => {},
}) {
  function triggerFileInput(e) {
    e.preventDefault();
    document.getElementById(name).click();
  }
  return (
    <div
      className={classNameFormatter({
        styles,
        classNames: [
          "inputElementContainer",
          width && `width-${width}`,
          alignment && `align${capitalizeString(alignment)}`,
        ],
      })}
    >
      {["email", "text", "password"].includes(type) && (
        <>
          {label && <label className={styles.label}>{label}:</label>}
          <input
            className={classNameFormatter({
              styles,
              classNames: [
                "inputElement",
                `textAlign${capitalizeString(textAlign)}`,
              ],
            })}
            type={type}
            name={name}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            onFocus={onFocus}
          />
        </>
      )}

      {type === "file" && (
        <>
          <input
            className={styles.hidden}
            type={type}
            id={name}
            onChange={onChange}
            value={value}
          />
          <div className={styles.inputFileElement}>
            {label && (
              <label className={styles.label}>
                {label}: {getFileNameFromUrl(value)}
              </label>
            )}

            <Button
              label={"choose file"}
              onClick={triggerFileInput}
              style={"lightBtn"}
            />
          </div>
        </>
      )}

      {type === "checkbox" && (
        <>
          <div className={styles.checkboxContainer}>
            {label && <label className={styles.label}>{label}</label>}
            <input
              className={styles.checkbox}
              type={type}
              name={name}
              autoComplete={autoComplete}
              value={value}
              onChange={onChange}
              defaultChecked={value}
            />
          </div>
        </>
      )}

      {type === "textArea" && (
        <>
          {label && <label className={styles.label}>{label}:</label>}
          <textarea
            className={classNameFormatter({
              styles,
              classNames: [
                "inputElement",
                `textAlign${capitalizeString(textAlign)}`,
                "textArea",
              ],
            })}
            rows={8}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            autoFocus={name.includes("description") && true}
          />
        </>
      )}
      {inputError && <p className={styles.inputError}>{inputError}</p>}
    </div>
  );
}

InputElement.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  width: PropTypes.any,
  inputError: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,

  alignment: PropTypes.string,
  textAlign: PropTypes.string,
  isDisabled: PropTypes.bool,
  onFocus: PropTypes.func,
};
