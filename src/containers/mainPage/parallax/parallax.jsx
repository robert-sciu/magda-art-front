import { useMemo } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import ImageDisplay from "../../../components/elements/imageDisplay/ImageDisplay";

import { selectSectionInView } from "../../../store/mainPageImagesSlice";

import styles from "./parallax.module.scss";

import { classNameFormatter } from "../../../utilities/utilities";

import { Parallax as ReactParallax, Background } from "react-parallax";

export default function Parallax({ imageSelector, sectionId, children }) {
  const parallaxImage = useSelector(imageSelector)?.[0];
  const isVisible = useSelector((state) =>
    selectSectionInView(state, sectionId)
  );
  const MemoizedImageDisplay = useMemo(
    () => (
      <ImageDisplay
        img={parallaxImage}
        type={"parallaxImage"}
        isVisible={isVisible}
      />
    ),
    [parallaxImage, isVisible]
  );

  if (!parallaxImage) return null;

  return (
    <ReactParallax
      strength={300}
      className={classNameFormatter({
        styles,
        classNames: ["parallax"],
      })}
    >
      <Background>{MemoizedImageDisplay}</Background>
      <div
        className={classNameFormatter({
          styles,
          classNames: ["header"],
        })}
      >
        {children && children}
      </div>
    </ReactParallax>
  );
}

Parallax.propTypes = {
  imageSelector: PropTypes.func,
  sectionId: PropTypes.string,
  children: PropTypes.node,
};
