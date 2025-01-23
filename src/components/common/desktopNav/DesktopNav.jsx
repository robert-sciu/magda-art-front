import PropTypes from "prop-types";

import Logo from "../logo/Logo";
import NavLinks from "../../../containers/common/navLinks/NavLinks";

import styles from "./desktopNav.module.scss";
import { classNameFormatter } from "../../../utilities/utilities";

export default function DesktopNav({
  showNav,
  showAdmin,
  onLogoLoaded,
  onSocialsLoaded,
  isFixedNav,
}) {
  return (
    <div
      className={classNameFormatter({
        styles,
        classNames: [
          "desktopNav",
          isFixedNav ? "fixedNav" : "topNav",
          showNav && "showNav",
        ],
      })}
    >
      <Logo onLoad={onLogoLoaded} />
      <NavLinks
        showAdmin={!isFixedNav && showAdmin}
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
  isFixedNav: PropTypes.bool,
};
