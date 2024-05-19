import styles from "./galleryParallax.module.scss";
import { selectGalleryParallaxImage } from "../../../containers/mainPage/mainPageImagesSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function GalleryParallax() {
  const parallaxImg = useSelector(selectGalleryParallaxImage);
  const imgStyle = { backgroundImage: `url(${parallaxImg?.url})` };
  return (
    <div className={styles.parallax} style={imgStyle}>
      <div className={styles.galleryLinkBackground}>
        <div className={styles.container}>
          <Link to="/gallery">Visit Gallery</Link>
        </div>
      </div>
    </div>
  );
}
