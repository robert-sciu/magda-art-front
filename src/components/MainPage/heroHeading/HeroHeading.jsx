import PropTypes from "prop-types";

import styles from "./heroHeading.module.scss";
import Logo from "../../../containers/common/logo/Logo";

export default function HeroHeading({ showHeading, name }) {
  return (
    <div className={`${styles.heading} ${showHeading && styles.show}`}>
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
};
