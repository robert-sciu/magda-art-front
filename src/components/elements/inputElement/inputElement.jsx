import {
  capitalizeString,
  classNameFormatter,
  getFileNameFromUrl,
} from "../../../utilities/utilities";
import Button from "../button/button";
import styles from "./inputElement.module.scss";

import PropTypes from "prop-types";

/**
 * Renders an input element with optional label and error message.
 *
 * @param {Object} props - The properties for the input element.
 * @param {string} props.type - The type of the input element (e.g., "text", "password").
 * @param {*} props.value - The value of the input element.
 * @param {string} [props.label=false] - The label text for the input element.
 * @param {string} [props.inputError=false] - The error message to display below the input.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {string} props.width - The width class for the input container (e.g., "100", "80").
 * @param {string} [props.name=""] - The name attribute for the input element.
 * @param {string} [props.autoComplete="off"] - The autocomplete attribute for the input element.
 * @param {string} [props.alignment="center"] - The alignment class for the input container (e.g., "center", "left", 'right').
 *
 * @return {JSX.Element} A JSX element representing an input field with optional label and error message.
 */

export default function InputElement({
  type,
  value,
  label = false,
  inputError = false,
  onChange,
  width,
  name = "",
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
