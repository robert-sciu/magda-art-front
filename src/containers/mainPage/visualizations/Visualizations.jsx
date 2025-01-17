// import { useSelector } from "react-redux";

// import { selectVisualizationsImages } from "../../../store/mainPageImagesSlice";
// import { selectVisualizationsTexts } from "../../../store/mainPageContentSlice";

// import VisualizationTile from "../../../components/MainPage/visualizationTile/VisualizationTile";

// import styles from "./visualizations.module.scss";

// import { matchTextToImage, createArrayFromObject } from "../../../utilities";

// export default function Visualizations() {
//   const visualizationTexts = useSelector(selectVisualizationsTexts);
//   const visualizationImages = useSelector(selectVisualizationsImages);

//   return (
//     <div className={styles.visualizationsBackground}>
//       <div className={styles.visualizationsContainer} name="visualizations">
//         <div className={styles.visualizationsHeader}>
//           <h2>Visualizations</h2>
//         </div>
//         {createArrayFromObject(visualizationImages).map((img, i) => {
//           const imgSideReverse = i % 2 === 0 ? false : true;
//           const text = matchTextToImage(img.placement, visualizationTexts);

//           return (
//             <VisualizationTile
//               image={img}
//               text={text}
//               imgSideReverse={imgSideReverse}
//               key={i}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }
