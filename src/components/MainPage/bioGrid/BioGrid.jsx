import { useSelector } from "react-redux";
import { selectBioImages } from "../../../containers/mainPage/mainPageImagesSlice";
import styles from "./bioGrid.module.scss";
import Chunk12 from "../bioGridChunks/Chunk12/Chunk12";
import Chunk21 from "../bioGridChunks/Chunk21/Chunk21";
import Chunk111 from "../bioGridChunks/Chunk111/Chunk111";
import Chunk11 from "../bioGridChunks/Chunk11/Chunk11";

export default function BioGrid() {
  const images = useSelector(selectBioImages);
  const sortedImages = Object.values(images).sort(
    (img1, img2) => img1.placement - img2.placement
  );
  return (
    <div className={styles.bioGallery}>
      <Chunk12 images={sortedImages.slice(0, 3)} />
      <Chunk21 images={sortedImages.slice(3, 6)} />
      <Chunk111 images={sortedImages.slice(6, 9)} />
      <Chunk11 images={sortedImages.slice(9)} />
    </div>
  );
}
