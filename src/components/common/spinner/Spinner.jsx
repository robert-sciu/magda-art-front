import PropTypes from "prop-types";

import scss from "../../../../styles/variables.module.scss";

import { SpinnerDotted } from "spinners-react";
import ClipLoader from "react-spinners/ClipLoader";

import spinner from "../../../assets/svg-spinners--eclipse.svg";
// import spinner from "../../../assets/spinner.svg";

import styles from "./spinner.module.scss";

export default function Spinner({
  size = scss.sizeXxxxl,
  color = scss.mainLightGray,
}) {
  return <SpinnerDotted size={size} color={color} />;
}

// export default function Spinner({
//   size = scss.sizeXxxxl,
//   color = scss.mainLightGray,
// }) {
//   return <ClipLoader size={size} color={color} />;
// }

// export default function Spinner({
//   size = scss.sizeXxxxl,
//   color = scss.mainLightGray,
// }) {
//   return <img src={spinner} alt="spinner" className={styles.spinner} />;
// }

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};
