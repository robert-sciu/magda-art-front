import { useSelector } from "react-redux";
import { selectBio } from "../../../containers/mainPage/mainPageContentSlice";
import BioGrid from "../bioGrid/BioGrid";
import styles from "./bio.module.scss";

export default function Bio() {
  const bioText = useSelector(selectBio);
  return (
    <div className={styles.background}>
      <div className={styles.gridContainer}>
        <BioGrid />
        <div className={styles.bioContent}>
          <h2>Bio</h2>
          <p>{bioText}</p>
        </div>
      </div>
    </div>
  );
}
