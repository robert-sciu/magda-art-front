import { useDispatch, useSelector } from "react-redux";
import {
  fetchPageImagesForRole,
  selectHeroImage,
} from "../../../store/mainPageImagesSlice";

import styles from "./adminStart.module.scss";

// import { createArrayFromObject } from "../../../utilities";
import { useEffect, useState } from "react";
import ImageDisplay from "../../common/imageDisplay/imageDisplay";

export default function AdminStart() {
  const [showHero, setShowHero] = useState(false);

  const dispatch = useDispatch();

  const heroImage = useSelector(selectHeroImage)[0];

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

      <div className={styles.heroImageContainer}>
        {showHero && (
          <ImageDisplay type={"adminImage"} img={heroImage} isVisible={true} />
        )}
      </div>
    </div>
  );
}
