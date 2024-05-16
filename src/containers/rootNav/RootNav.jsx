import { NavLink, Outlet } from "react-router-dom";
import styles from "./rootNav.module.scss";
import {
  selectLogoImage,
  selectSocialsIcons,
} from "../mainPage/mainPageImagesSlice";
import { useSelector } from "react-redux";
export default function Root() {
  const logo = useSelector(selectLogoImage);
  const socials = useSelector(selectSocialsIcons);
  console.log(socials);
  return (
    <>
      <div className={styles.navBar}>
        {logo ? (
          <div className={styles.logo}>
            <img src={logo.url} alt={logo.name} />
          </div>
        ) : (
          "loading"
        )}
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
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
              to="/s"
            >
              Bio
            </NavLink>
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
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
              to="/s"
            >
              Visualizations
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
              to="/s"
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className={styles.socials}>
          <NavLink to="https://instagram.com" target="blank">
            <img src={socials.instagram?.url} alt="instagram icon" />
          </NavLink>
          <NavLink to="https://facebook.com">
            <img src={socials.facebook?.url} alt="facebook icon" />
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
}
