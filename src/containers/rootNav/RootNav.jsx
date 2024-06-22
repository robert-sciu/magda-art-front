import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { Link } from "react-scroll";

import SocialIcons from "../common/socialIcons/SocialIcons";
import Logo from "../common/logo/Logo";
import Footer from "../../components/common/footer/Footer";

import { fetchCommonImages } from "./rootNavSlice";
import { filesLoaded } from "../../store/loadingStateSlice";
import { isAuthenticated } from "../admin/loginSlice";

import styles from "./rootNav.module.scss";

/**
 * Renders the root navigation component with dynamic links based on user authentication.
 *
 * @return {JSX.Element} The root navigation component JSX.
 */

export default function RootNav() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [socialsLoaded, setSocialsLoaded] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();

  const loadState = useSelector(filesLoaded);
  const userIsAuthenticated = useSelector(isAuthenticated);

  useEffect(() => {
    if (!loadState) return;
    dispatch(fetchCommonImages());
  }, [dispatch, loadState]);

  useEffect(() => {
    userIsAuthenticated ? setShowAdmin(true) : setShowAdmin(false);
  }, [userIsAuthenticated]);

  useEffect(() => {
    (logoLoaded || socialsLoaded) && setShowNav(true);
  }, [logoLoaded, socialsLoaded]);

  return (
    <>
      <div
        className={styles.navBar}
        style={showNav ? { opacity: "1", transition: "opacity 2s" } : null}
      >
        <Logo onLoad={setLogoLoaded} />
        <ul>
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
              activeClass={styles.navLinkActive}
              to="visualizations"
              smooth={true}
            >
              Visualizations
            </Link>
          </li>
          <li>
            <Link
              className={styles.navLink}
              activeClass={styles.navLinkActive}
              to="contact"
              smooth={true}
            >
              Contact
            </Link>
          </li>

          {showAdmin ? (
            <li>
              <NavLink
                className={`${styles.navLink} ${styles.admin}`}
                activeClass={styles.navLinkActive}
                to="/admin"
              >
                ADMIN
              </NavLink>
            </li>
          ) : null}
        </ul>
        <div className={styles.socials}>
          <SocialIcons onLoad={setSocialsLoaded} />
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
