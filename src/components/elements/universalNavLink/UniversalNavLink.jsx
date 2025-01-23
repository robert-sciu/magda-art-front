import PropTypes from "prop-types";

import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

import styles from "./universalNavLink.module.scss";

import { classNameFormatter } from "../../../utilities/utilities";

export default function UniversalNavLink({
  isNav,
  isScroll,
  to,
  label,
  onLinkClick,
  isMobile,
}) {
  if (isScroll && isNav) {
    return null;
  }
  if (isScroll) {
    return (
      <Link
        href={`#${to}`}
        className={classNameFormatter({
          styles,
          classNames: [isMobile ? "navLinkMobile" : "navLink"],
        })}
        activeClass={classNameFormatter({
          styles,
          classNames: [isMobile ? "navLinkActiveMobile" : "navLinkActive"],
        })}
        to={to}
        smooth={true}
        onClick={onLinkClick}
      >
        {label}
      </Link>
    );
  }
  if (isNav) {
    return (
      <NavLink
        className={({ isActive }) =>
          isActive
            ? isMobile
              ? styles.navLinkActiveMobile
              : styles.navLinkActive
            : isMobile
            ? styles.navLinkMobile
            : styles.navLink
        }
        to={to}
      >
        {label}
      </NavLink>
    );
  }
}

UniversalNavLink.propTypes = {
  isNav: PropTypes.bool,
  isScroll: PropTypes.bool,
  to: PropTypes.string,
  label: PropTypes.string,
  onLinkClick: PropTypes.func,
  isMobile: PropTypes.bool,
};
