import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ImageDisplay from "../../elements/imageDisplay/ImageDisplay";

import {
  fetchPageImagesForRole,
  selectHeroImage,
} from "../../../store/mainPageImagesSlice";

import styles from "./adminStart.module.scss";

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
          <ImageDisplay type={"pageImage"} img={heroImage} isVisible={true} />
        )}
      </div>
    </div>
  );
}
