// import PropTypes from "prop-types";

import styles from "./bioParallaxContent.module.scss";
// import { useSelector } from "react-redux";
// import {
//   selectBioParallaxImage,
//   selectSectionInView,
// } from "../../../store/mainPageImagesSlice";
// import { useEffect, useState } from "react";
// import { selectDevice } from "../../../store/rootNavSlice";

// import { classNameFormatter } from "../../../utilities/utilities";
// import Parallax from "../../../containers/mainPage/parallax/parallax";

export default function BioParallaxContent() {
  // const [imgQuality, setImgQuality] = useState("lazy");

  // const device = useSelector(selectDevice);
  // const bioParallaxImage = useSelector(selectBioParallaxImage);
  // const isVisible = useSelector((state) =>
  //   selectSectionInView(state, "bioParallax")
  // );

  // const imgStyle = {
  //   backgroundImage: bioParallaxImage
  //     ? `url(${bioParallaxImage[`url_${imgQuality}`]})`
  //     : null,
  // };

  // useEffect(() => {
  //   if (isVisible) {
  //     const img = new Image();
  //     img.src = bioParallaxImage[`url_${device}`];
  //     img.onload = () => {
  //       setImgQuality(device);
  //     };
  //   }
  // }, [bioParallaxImage, device, isVisible]);

  return (
    // <div
    //   className={classNameFormatter({
    //     styles,
    //     classNames: ["parallax"],
    //   })}
    //   style={imgStyle}
    // >
    //   <div
    //     className={classNameFormatter({
    //       styles,
    //       classNames: ["blur", imgQuality !== "lazy" && "noBlur"],
    //     })}
    //   ></div>
    <h2 className={styles.parallaxText}>BIO</h2>
    // </div>
    // <Parallax
    //   imageSelector={selectBioParallaxImage}
    //   sectionId={"bioParallax"}
    // />
  );
}

// BioParallax.propTypes = {
//   bioParallaxImageArray: PropTypes.array,
// };
