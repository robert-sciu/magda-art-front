import { NavLink, Outlet } from "react-router-dom";
import styles from "./rootNav.module.scss";
export default function Root() {
  return (
    <>
      <div className={styles.navBar}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
          to="/"
        >
          HOME
        </NavLink>
        <ul>
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
      </div>
      <Outlet />
    </>
  );
}
