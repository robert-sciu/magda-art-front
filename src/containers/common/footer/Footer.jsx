import { useSelector } from "react-redux";

import Logo from "../logo/Logo";

import {
  selectFooterDesign,
  selectFooterOwner,
} from "../../../store/mainPageContentSlice";

import styles from "./footer.module.scss";

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
          <p>{`Design by ${designer}`}</p>
        </div>
      </div>
    </footer>
  );
}
