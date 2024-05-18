import { useSelector } from "react-redux";
import styles from "./welcomeGrid.module.scss";
import { selectWelcomeImages } from "../../../containers/mainPage/mainPageImagesSlice";
// import { useEffect, useState } from "react";

export default function WelcomeGrid() {
  const welcomeImages = useSelector(selectWelcomeImages);

  return (
    <div className={styles.gridContainer}>
      {Object.values(welcomeImages).map((img) => (
        <img src={img.url} alt={img.name} key={img.id} />
      ))}
    </div>
  );
}
