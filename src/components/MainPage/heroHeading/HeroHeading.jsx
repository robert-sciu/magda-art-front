import PropTypes from "prop-types";

import styles from "./heroHeading.module.scss";
import Logo from "../../../containers/common/logo/Logo";
import { classNameFormatter } from "../../../utilities/utilities";

export default function HeroHeading({ showHeading, name, disableFadeIn }) {
  return (
    <div
      className={classNameFormatter({
        styles,
        classNames: [
          "heading",
          showHeading ? "show" : disableFadeIn ? null : "hide",
        ],
      })}
    >
      <Logo isMainLogo={true} />
      <h1>{name}</h1>
      <h2>Porfolio</h2>
    </div>
  );
}

HeroHeading.propTypes = {
  showHeading: PropTypes.bool,
  logoImageArray: PropTypes.array,
  name: PropTypes.string,
  disableFadeIn: PropTypes.bool,
};
