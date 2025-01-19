// import Spinner from "../spinner/Spinner";

import LoadingState from "../../loadingState/loadingState";
import styles from "./grayBackground.module.scss";
export default function GrayBackground() {
  return (
    <div className={styles.grayBackground}>
      {/* <Spinner /> */}
      <LoadingState />
    </div>
  );
}
