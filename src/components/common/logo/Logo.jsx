import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import styles from "./logo.module.scss";

import { selectLogoImage } from "../../../store/mainPageImagesSlice";
import { selectDevice } from "../../../store/rootNavSlice";
import {
  capitalizeString,
  classNameFormatter,
} from "../../../utilities/utilities";

/**
 * Renders a logo component that displays an image.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onLoad - A callback function that is called when the logo image is loaded.
 * @return {JSX.Element} The rendered logo component.
 */

export default function Logo({ onLoad, isMainLogo, size }) {
  const logo = useSelector(selectLogoImage)[0];
  const device = useSelector(selectDevice);

  return (
    <div
      className={classNameFormatter({
        styles,
        classNames: [
          isMainLogo ? "mainLogo" : "logoGlow",
          size && `size${capitalizeString(size)}`,
        ],
      })}
    >
      {logo && (
        <img src={logo?.[`url_${device}`]} alt={logo?.title} onLoad={onLoad} />
      )}
    </div>
  );
}

Logo.propTypes = {
  onLoad: PropTypes.func,
  isMainLogo: PropTypes.bool,
  size: PropTypes.string,
};
