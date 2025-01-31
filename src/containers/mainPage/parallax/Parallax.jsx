import { useMemo } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import ImageDisplay from "../../../components/elements/imageDisplay/ImageDisplay";

import { Parallax as ReactParallax, Background } from "react-parallax";

import styles from "./parallax.module.scss";

export default function Parallax({
  imageSelector,
  children,
}) {
  const parallaxImage = useSelector(imageSelector)?.[0];
  const MemoizedImageDisplay = useMemo(
    () => (
      <ImageDisplay
        img={parallaxImage}
        type={"parallaxImage"}
        isVisible={true}
      />
    ),
    [parallaxImage]
  );

  if (!parallaxImage) return null;

  return (
    <ReactParallax strength={200} className={styles.parallax}>
      <Background>{MemoizedImageDisplay}</Background>
      {children && children}
    </ReactParallax>
  );
}

Parallax.propTypes = {
  imageSelector: PropTypes.func,
  sectionId: PropTypes.string,
  children: PropTypes.node,
};
