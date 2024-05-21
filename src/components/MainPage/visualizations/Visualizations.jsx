import { useSelector } from "react-redux";
// import { selectVisualizationsTexts } from "../../../containers/mainPage/mainPageContentSlice";
import { selectVisualizationsImages } from "../../../containers/mainPage/mainPageImagesSlice";
import { selectVisualizationsTexts } from "../../../containers/mainPage/mainPageContentSlice";
import { matchTextToImage } from "../../../utilities";
import styles from "./visualizations.module.scss";
import VisualizationTile from "../visualizationTile/VisualizationTile";

export default function Visualizations() {
  const visualizationTexts = useSelector(selectVisualizationsTexts);

  const visualizationImages = useSelector(selectVisualizationsImages);

  return (
    <div className={styles.visualizationsContainer}>
      <h2>Visualizations</h2>
      {Object.values(visualizationImages).map((img, i) => {
        const imgSideReverse = i % 2 === 0 ? false : true;
        const text = matchTextToImage(img.placement, visualizationTexts);

        return (
          <VisualizationTile
            image={img}
            text={text}
            imgSideReverse={imgSideReverse}
            key={i}
          />
        );
      })}
    </div>
  );
}
