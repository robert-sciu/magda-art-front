import styles from "./bioParallax.module.scss";
import { selectBioParallaxImage } from "../../../containers/mainPage/mainPageImagesSlice";
import { useSelector } from "react-redux";

export default function BioParallax() {
  const parallaxImg = useSelector(selectBioParallaxImage);

  const imgStyle = {
    backgroundImage: `url(${parallaxImg?.url})`,
  };
  return (
    <div className={styles.paralax} style={imgStyle}>
      <h2>BIO</h2>
    </div>
  );
}
