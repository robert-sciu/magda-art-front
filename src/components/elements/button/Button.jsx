import PropTypes from "prop-types";

import LoadingState from "../../loadingState/LoadingState";

import styles from "./button.module.scss";

import { classNameFormatter } from "../../../utilities/utilities";

/**
 * A button component with a built in loading state and support for icons.
 *
 * @param {string} label - The default label for the button.
 * @param {boolean} isActive - Whether to display the active label.
 * @param {string} activeLabel - The label to display when isActive is true.
 * @param {React.ElementType} icon - An optional icon to display on the button.
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {boolean} isLoading - Whether to display the loading state.
 * @param {boolean} disabled - Whether the button is disabled.
 * @param {string} loadingLabel - The label to display when isLoading is true.
 * @param {string} style - The class name for the button style (e.g., primary, secondary, link, iconOnly).
 * @param {string} color - An optional color class name for the button style.
 * @param {string} secondaryStyle - An optional secondary class name for the button style.
 * @param {boolean} fixedHeight - Whether to set a fixed height for the button.
 * @param {boolean} flexStretch - Whether to set a flex stretch for the button. parent display must be flex.
 *
 * @return {React.ElementType} A JSX button element.
 */
export default function Button({
  label,
  isActive,
  activeLabel,
  icon,
  onClick,
  isLoading,
  disabled,
  loadingLabel,
  style,
  color = "basicGrayBtn",
  secondaryStyle,
  fixedHeight = false,
  flexStretch = false,
}) {
  return (
    <button
      className={classNameFormatter({
        styles,
        classNames: [
          style !== "iconOnly" && style !== "navIcon" && "button",
          style,
          color,
          secondaryStyle,
          disabled && "disabled",
          fixedHeight ? "fixedHeight" : "flexHeight",
          flexStretch && "flexStretch",
        ],
      })}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading && (
        <>
          <LoadingState spinnerOnly={true} background={"none"} />
          <p>{loadingLabel}</p>
        </>
      )}
      {!isLoading && (
        <>
          {icon && <div className={styles.icon}>{icon}</div>}
          <p>{isActive ? activeLabel : label}</p>
        </>
      )}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  isActive: PropTypes.bool,
  activeLabel: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  loadingLabel: PropTypes.string,
  style: PropTypes.string,
  color: PropTypes.string,
  secondaryStyle: PropTypes.string,
  fixedHeight: PropTypes.bool,
  flexStretch: PropTypes.bool,
};
