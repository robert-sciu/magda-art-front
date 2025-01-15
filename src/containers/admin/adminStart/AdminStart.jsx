import { useDispatch, useSelector } from "react-redux";

import ImageTile from "../../../components/common/imageTile/ImageTile";

import {
  fetchPageImagesForRole,
  selectHeroImage,
} from "../../../store/mainPageImagesSlice";

import styles from "./adminStart.module.scss";

// import { createArrayFromObject } from "../../../utilities";
import { useEffect, useState } from "react";

export default function AdminStart() {
  const [showHero, setShowHero] = useState(false);

  const dispatch = useDispatch();

  const heroImage = useSelector(selectHeroImage);
  // const heroImageData = createArrayFromObject(heroImage)[0];

  useEffect(() => {
    if (heroImage) {
      setShowHero(true);
    } else {
      dispatch(fetchPageImagesForRole("hero"));
    }
  }, [heroImage, dispatch]);

  return (
    <div className={styles.adminStartContainer}>
      <h2>Welcome to your Admin Panel</h2>
      <p>
        Choose a category from a menu above to start working on your content
      </p>
      {showHero && (
        <div className={styles.heroImageContainer}>
          <ImageTile img={heroImage} qualityOverride={"desktop"} />
        </div>
      )}
      {/* <div>{heroImage && <ImageTile img={heroImageData} />}</div> */}
    </div>
  );
}
