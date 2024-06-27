import { NavLink } from "react-router-dom";

import { Link } from "react-scroll";
import PropTypes from "prop-types";

import styles from "./navLinks.module.scss";
import SocialIcons from "../../../containers/common/socialIcons/SocialIcons";

export default function NavLinks({
  showAdmin,
  onSocialsLoaded,
  navClass,
  onMobileNavOpen,
}) {
  function handleMobileMenuClose(e) {
    if (navClass !== "mobileNav") return;
    console.log(e);
    e.preventDefault();
    onMobileNavOpen(false);
  }
  return (
    <>
      <ul className={styles[navClass]} onClick={handleMobileMenuClose}>
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
            smooth={true}
            onClick={handleMobileMenuClose}
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
            onClick={handleMobileMenuClose}
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
            onClick={handleMobileMenuClose}
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
      </ul>
      <div className={styles.socials}>
        <SocialIcons onLoad={onSocialsLoaded} />
      </div>
    </>
  );
}

NavLinks.propTypes = {
  showAdmin: PropTypes.bool,
  onSocialsLoaded: PropTypes.func,
  navClass: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};
