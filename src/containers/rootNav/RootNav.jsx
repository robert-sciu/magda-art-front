import { NavLink, Outlet } from "react-router-dom";
import { Link } from "react-scroll";
import styles from "./rootNav.module.scss";
import SocialIcons from "../../components/MainPage/socialIcons/SocialIcons";
import Logo from "../../components/common/logo/Logo";
import Footer from "../../components/common/footer/Footer";
export default function Root() {
  return (
    <>
      <div className={styles.navBar}>
        <Logo />
        <ul>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.navLinkActive : styles.navLink
            }
            to="/"
          >
            HOME
          </NavLink>
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
        </ul>
        <div className={styles.socials}>
          <SocialIcons />
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
