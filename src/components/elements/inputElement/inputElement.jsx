import { classNameFormatter } from "../../../utilities/utilities";
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
}) {
  return (
    <div
      className={classNameFormatter({
        styles,
        classNames: ["inputElementContainer", width && `width-${width}`],
      })}
    >
      {label && <label className={styles.label}>{label}:</label>}
      <input
        className={styles.inputElement}
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
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
};
