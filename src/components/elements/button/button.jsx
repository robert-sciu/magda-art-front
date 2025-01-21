import { classNameFormatter } from "../../../utilities/utilities";
import LoadingState from "../../loadingState/loadingState";
// import LoadingState from "../../loadingState/loadingState";
import styles from "./button.module.scss";
import PropTypes from "prop-types";

/**
 * A button component.
 *
 * @param {string} label - The label for the button.
 * @param {boolean} isActive - Whether the button is active.
 * @param {string} activeLabel - The label for the button when it is active.
 * @param {ReactElement} icon - The icon for the button.
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {boolean} isLoading - Whether the button is in a loading state.
 * @param {boolean} disabled - Whether the button is disabled.
 * @param {string} loadingLabel - The label for the button when it is loading.
 * @param {string} style - A class name to add to the button. Available styles are "greenBtn", "redBtn", "lightBtn" "smallBtn".
 *
 * @return {ReactElement}
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
  secondaryStyle,
  fixedHeight = false,
}) {
  return (
    <button
      className={classNameFormatter({
        styles,
        classNames: [
          style !== "iconOnly" && "button",
          style,
          secondaryStyle,
          disabled && "disabled",
          fixedHeight ? "fixedHeight" : "flexHeight",
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
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  isActive: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
  activeLabel: PropTypes.string,
  loadingLabel: PropTypes.string,
  style: PropTypes.string,
  secondaryStyle: PropTypes.string,
  disabled: PropTypes.bool,
  fixedHeight: PropTypes.bool,
};
