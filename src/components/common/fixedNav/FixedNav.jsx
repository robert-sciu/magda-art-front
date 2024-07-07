import PropTypes from "prop-types";

import NavLinks from "../../../containers/common/navLinks/NavLinks";

import styles from "./fixedNav.module.scss";
import Logo from "../../../containers/common/logo/Logo";

export default function FixedNav({ showFixedNav }) {
  return (
    <div
      className={`${styles.fixedNav} ${showFixedNav ? styles.showNav : null}`}
    >
      <div className={styles.logo}>
        <Logo />
      </div>

      <NavLinks navClass={"desktopNav"} />
    </div>
  );
}

FixedNav.propTypes = {
  showFixedNav: PropTypes.bool,
};
