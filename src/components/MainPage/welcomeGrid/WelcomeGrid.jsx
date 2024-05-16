import { useSelector } from "react-redux";
import styles from "./welcomeGrid.module.scss";
import { selectWelcomeImages } from "../../../containers/mainPage/mainPageImagesSlice";
import { useEffect, useState } from "react";

export default function WelcomeGrid() {
  const welcomeImages = useSelector(selectWelcomeImages);

  // const [scrollPercentage, setScrollPercentage] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const newScrollPercentage =
  //       window.scrollY / (document.body.scrollHeight - window.innerHeight);
  //     setScrollPercentage(newScrollPercentage);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const imgStyle = {
  //   padding: `${40 - scrollPercentage * 30}px`,
  // };
  return (
    <div className={styles.gridContainer}>
      {Object.values(welcomeImages).map((img) => (
        <img src={img.url} alt={img.name} key={img.id} />
      ))}
    </div>
  );
}
