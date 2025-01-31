import { Link } from "react-router-dom";

import styles from "./galleryParallaxContent.module.scss";

export default function GalleryParallaxContent() {
  return (
    <div className={styles.galleryLinkBackground}>
      <div className={styles.container}>
        <Link className={styles.link} to="/gallery">
          Visit Gallery
        </Link>
      </div>
    </div>
  );
}
