import styles from "./bioParalax.module.scss";
import { selectParalaxImage } from "../../../containers/mainPage/mainPageImagesSlice";
import { useSelector } from "react-redux";
export default function Paralax() {
  const paralaxImg = useSelector(selectParalaxImage);
  const imgStyle = { backgroundImage: `url(${paralaxImg?.url})` };
  return (
    <div className={styles.paralax} style={imgStyle}>
      <h2>BIO</h2>
    </div>
  );
}
