import scss from "../../../../styles/variables.module.scss";
import PropTypes from "prop-types";
import { SpinnerDotted } from "spinners-react";

export default function Spinner({
  size = scss.sizeXxxxl,
  color = scss.mainLightGray,
}) {
  return <SpinnerDotted size={size} color={color} />;
}

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};
