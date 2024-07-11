import Spinner from "../spinner/Spinner";

import styles from "./grayBackground.module.scss";
export default function GrayBackground() {
  return (
    <div className={styles.grayBackground}>
      <Spinner />
    </div>
  );
}
