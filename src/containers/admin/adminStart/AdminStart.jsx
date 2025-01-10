import { useSelector } from "react-redux";

import ImageTile from "../../../components/common/imageTile/ImageTile";

import { selectHeroImage } from "../../../store/mainPageImagesSlice";

import styles from "./adminStart.module.scss";

import { createArrayFromObject } from "../../../utilities";

export default function AdminStart() {
  const heroImage = useSelector(selectHeroImage);
  const heroImageData = createArrayFromObject(heroImage)[0];

  return (
    <div className={styles.adminStartContainer}>
      <h2>Welcome to your Admin Panel</h2>
      <p>
        Choose a category from a menu above to start working on your content
      </p>
      <div>{heroImage && <ImageTile img={heroImageData} />}</div>
    </div>
  );
}
