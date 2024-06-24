import { NavLink } from "react-router-dom";

import { Link } from "react-scroll";
import PropTypes from "prop-types";

import styles from "./navLinks.module.scss";
import SocialIcons from "../../../containers/common/socialIcons/SocialIcons";

export default function NavLinks({ showAdmin, onSocialsLoaded, navClass }) {
  return (
    <ul className={styles[navClass]}>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
          to="/"
        >
          HOME
        </NavLink>
      </li>
      <li>
        <Link
          className={styles.navLink}
          activeClass={styles.navLinkActive}
          to="bio"
          smooth={"true"}
        >
          Bio
        </Link>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
          to="/gallery"
        >
          Gallery
        </NavLink>
      </li>
      <li>
        <Link
          className={styles.navLink}
          activeclass={styles.navLinkActive}
          to="visualizations"
          smooth={true}
        >
          Visualizations
        </Link>
      </li>
      <li>
        <Link
          className={styles.navLink}
          activeclass={styles.navLinkActive}
          to="contact"
          smooth={true}
        >
          Contact
        </Link>
      </li>

      {showAdmin ? (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navLinkActive} ${styles.admin}`
                : styles.navLink
            }
            to="/admin"
          >
            ADMIN
          </NavLink>
        </li>
      ) : null}
      <div className={styles.socials}>
        <SocialIcons onLoad={onSocialsLoaded} />
      </div>
    </ul>
  );
}

NavLinks.propTypes = {
  showAdmin: PropTypes.bool,
  onSocialsLoaded: PropTypes.func,
  navClass: PropTypes.string,
};
