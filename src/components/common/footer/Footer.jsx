import { useSelector } from "react-redux";
import {
  selectFooterDesign,
  selectFooterOwner,
} from "../../../containers/mainPage/mainPageUi/mainPageContentSlice";
import Logo from "../../../containers/common/logo/Logo";
import styles from "./footer.module.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  const owner = useSelector(selectFooterOwner);
  const designer = useSelector(selectFooterDesign);
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className={styles.footerContainer}>
        <Logo />
        <div className={styles.footerInfo}>
          <p>Copyrights &copy; {`${year} by ${owner}`}</p>
          <p>
            {`Desig by ${designer}`} <Link to="#">{designer}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
