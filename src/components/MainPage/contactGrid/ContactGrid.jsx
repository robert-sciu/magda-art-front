import { useSelector } from "react-redux";
import styles from "./contactGrid.module.scss";
import { selectContactImages } from "../../../containers/mainPage/mainPageImagesSlice";
import ContactGridTile from "../contactGridTile/ContactGridTile";

export default function ContactGrid() {
  const images = useSelector(selectContactImages);

  return (
    <div className={styles.galleryGrid}>
      {Object.values(images).map((img, i) => (
        <ContactGridTile img={img} key={i} />
      ))}
    </div>
  );
}
