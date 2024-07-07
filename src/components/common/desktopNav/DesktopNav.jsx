import PropTypes from "prop-types";

import Logo from "../../../containers/common/logo/Logo";
import NavLinks from "../../../containers/common/navLinks/NavLinks";

import styles from "./desktopNav.module.scss";

export default function DesktopNav({
  showNav,
  showAdmin,
  onLogoLoaded,
  onSocialsLoaded,
}) {
  return (
    <div className={`${styles.desktopNav} ${showNav ? styles.showNav : null}`}>
      <Logo onLoad={onLogoLoaded} />
      <NavLinks
        showAdmin={showAdmin}
        navClass={"desktopNav"}
        onSocialsLoaded={onSocialsLoaded}
      />
    </div>
  );
}

DesktopNav.propTypes = {
  showNav: PropTypes.bool,
  showAdmin: PropTypes.bool,
  onLogoLoaded: PropTypes.func,
  onSocialsLoaded: PropTypes.func,
};
