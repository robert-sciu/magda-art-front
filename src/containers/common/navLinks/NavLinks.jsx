import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import SocialIcons from "../socialIcons/SocialIcons";

import { selectLocation, setLocation } from "../../rootNav/rootNavSlice";

import styles from "./navLinks.module.scss";
import Logo from "../logo/Logo";

export default function NavLinks({
  showAdmin,
  onSocialsLoaded,
  navClass,
  onMobileNavOpen = () => {},
}) {
  const location = useSelector(selectLocation);
  const dispatch = useDispatch();

  function handleLinkClick(e) {
    if (navClass === "mobileNav") {
      setTimeout(() => {
        dispatch(setLocation(window.location.pathname));
      }, 500);
    } else if (navClass === "desktopNav") {
      dispatch(setLocation(window.location.pathname));
    }

    e.preventDefault();
    onMobileNavOpen(false);
  }

  return (
    <>
      <ul className={styles[navClass]} onClick={handleLinkClick}>
        <li>{navClass === "mobileNav" && <Logo />}</li>
        <li>
          {location === "/" ? (
            <Link
              // href="#hero"
              className={styles.navLink}
              activeClass={styles.navLinkActive}
              // to="hero"
              smooth={true}
              // onClick={handleLinkClick}
            >
              Home
            </Link>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
              to="/"
            >
              Home
            </NavLink>
          )}
        </li>
        {(location === "/" || location === "/admin") && (
          <li>
            <Link
              // href="#bio"
              className={styles.navLink}
              activeClass={styles.navLinkActive}
              // to="bio"
              smooth={true}
              // onClick={handleLinkClick}
            >
              Bio
            </Link>
          </li>
        )}

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
        {(location === "/" || location === "/admin") && (
          <li>
            <Link
              // href="#visualizations"
              className={styles.navLink}
              activeclass={styles.navLinkActive}
              // to="visualizations"
              smooth={true}
              // onClick={handleLinkClick}
            >
              Visualizations
            </Link>
          </li>
        )}
        {(location === "/" || location === "/admin") && (
          <li>
            <Link
              // href="#contact"
              className={styles.navLink}
              activeclass={styles.navLinkActive}
              // to="contact"
              smooth={true}
              // onClick={handleLinkClick}
            >
              Contact
            </Link>
          </li>
        )}

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
