import { NavLink, Outlet } from "react-router-dom";
import styles from "./rootNav.module.scss";
import { selectLogoImage } from "../mainPage/mainPageImagesSlice";
import { useSelector } from "react-redux";
import SocialIcons from "../../components/MainPage/socialIcons/SocialIcons";
export default function Root() {
  const logo = useSelector(selectLogoImage);

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
          <SocialIcons />
        </div>
      </div>
      <Outlet />
    </>
  );
}
