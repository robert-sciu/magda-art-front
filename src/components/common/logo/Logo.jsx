import { useSelector } from "react-redux";
import { selectLogoImage } from "../../../containers/mainPage/mainPageImagesSlice";
import styles from "./logo.module.scss";

export default function Logo() {
  const logo = useSelector(selectLogoImage);

  return (
    <div className={styles.logo}>
      <img
        src={logo?.url}
        alt={logo?.name}
        // onLoad={() => setLogoLoaded(true)}
      />
    </div>
  );
}
