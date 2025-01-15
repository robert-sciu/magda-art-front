import { useSelector } from "react-redux";
import styles from "./pageSection.module.scss";
import WelcomeGrid from "../../../components/MainPage/welcomeGrid/WelcomeGrid";
import { useEffect, useRef, useState } from "react";
import { classNameFormatter } from "../../../utilities/utilities";
import he from "he";
import { GiConsoleController } from "react-icons/gi";

export default function PageSection({ contentSelector, imageSelector }) {
  const [decodedContent, setDecodedContent] = useState("");
  const [textHeight, setTextHeight] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  const textRef = useRef(null);
  const imgRef = useRef(null);

  const content = useSelector(contentSelector);
  const images = useSelector(imageSelector);
  // console.log(typeof content);

  useEffect(() => {
    if (content) {
      /////// what the hell is this about
      //TODO: get to the bottom of this

      setDecodedContent(he.decode(he.decode(content)));
    }
  }, [content]);

  useEffect(() => {
    // Function to update the height
    const updateHeight = () => {
      if (textRef.current) {
        const height = textRef.current.getBoundingClientRect().height;
        setTextHeight(height);
        // console.log("text " + height);
      }
    };

    updateHeight();

    // Add a resize listener to update height dynamically
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    // Function to update the height
    const updateHeight = () => {
      if (imgRef.current) {
        const height = imgRef.current.getBoundingClientRect().height;
        setImgHeight(height);
        // console.log("img " + height);
      }
    };

    updateHeight();

    // Add a resize listener to update height dynamically
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div
      className={classNameFormatter({
        styles,
        classNames: ["pageSectionContainer", "grid21", "gridGap"],
      })}
    >
      <div
        className={classNameFormatter({
          styles,
          classNames: ["contentContainer", "fontM"],
        })}
        ref={textRef}
      >
        {decodedContent}
      </div>
      <div className={styles.imageContainer}>
        <WelcomeGrid welcomeImagesArray={images} ref={imgRef} />
        {/* <img
          src={images[0].url_desktop}
          key={images[0].id}
          ref={imgRef}
          alt={images[0].name}
        /> */}
      </div>
      {/* <h2>Page Section</h2> */}
    </div>
  );
}
