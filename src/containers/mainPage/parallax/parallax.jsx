import { useSelector } from "react-redux";
import { selectDevice } from "../../../store/rootNavSlice";
import { selectSectionInView } from "../../../store/mainPageImagesSlice";
import { useEffect, useState } from "react";
import { classNameFormatter } from "../../../utilities/utilities";

import styles from "./parallax.module.scss";

import PropTypes from "prop-types";

/**
 * Parallax component that renders a section with a parallax background image.
 *
 * This component uses the provided imageSelector function to select an image from the Redux store,
 * and dynamically adjusts the image quality based on the device type and section visibility.
 *
 * @param {Object} props - The props for the component.
 * @param {Function} props.imageSelector - A function that selects the image data from the Redux store.
 * @param {string} props.sectionId - The unique identifier for the section, used to determine visibility.
 * @param {React.ReactNode} props.children - Optional children elements to be rendered within the parallax section.
 *
 * @returns {JSX.Element} The rendered parallax component.
 */

export default function Parallax({ imageSelector, sectionId, children }) {
  const [imgQuality, setImgQuality] = useState("lazy");

  const device = useSelector(selectDevice);
  const parallaxImage = useSelector(imageSelector)?.[0];
  const isVisible = useSelector((state) =>
    selectSectionInView(state, sectionId)
  );

  const imgStyle = {
    backgroundImage: parallaxImage
      ? `url(${parallaxImage[`url_${imgQuality}`]})`
      : null,
  };

  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.src = parallaxImage[`url_${device}`];
      img.onload = () => {
        setImgQuality(device);
      };
    }
  }, [parallaxImage, device, isVisible]);

  return (
    <div
      className={classNameFormatter({
        styles,
        classNames: ["parallax"],
      })}
      style={imgStyle}
    >
      <div
        className={classNameFormatter({
          styles,
          classNames: ["blur", imgQuality !== "lazy" && "noBlur"],
        })}
      ></div>
      {children && children}
    </div>
  );
}

Parallax.propTypes = {
  imageSelector: PropTypes.func,
  sectionId: PropTypes.string,
  children: PropTypes.node,
};
