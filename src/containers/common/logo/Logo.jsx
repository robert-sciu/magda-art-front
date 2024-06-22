import { useState } from "react";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { selectLogoImage } from "../../rootNav/rootNavSlice";

import styles from "./logo.module.scss";

import { createArrayFromObject } from "../../../utilities";

/**
 * Renders a logo component that displays an image.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onLoad - A callback function that is called when the logo image is loaded.
 * @return {JSX.Element} The rendered logo component.
 */

export default function Logo({ onLoad }) {
  const [logoLoaded, setLogoLoaded] = useState(false);

  const logo = useSelector(selectLogoImage);

  const logoImgData = createArrayFromObject(logo)[0];

  function handleLoad() {
    setLogoLoaded(true);
    if (onLoad) onLoad(true);
  }

  return (
    <div className={styles.logo} style={logoLoaded ? { opacity: "1" } : null}>
      {logo && (
        <img
          src={logoImgData?.url}
          alt={logoImgData?.name}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
}

Logo.propTypes = {
  onLoad: PropTypes.func,
};
