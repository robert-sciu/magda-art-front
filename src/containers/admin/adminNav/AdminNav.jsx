import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { isAuthenticated, logout } from "../login/loginSlice";

import styles from "./adminNav.module.scss";

export default function AdminNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIsAuthenticated = useSelector(isAuthenticated);

  useEffect(() => {
    if (!userIsAuthenticated) {
      navigate("/login");
    }
  }, [userIsAuthenticated, navigate]);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div>
      <div className={styles.adminNav}>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
              to="/admin/texts"
            >
              Page Texts
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
              to="/admin/images/pageImages"
            >
              Page Images
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
              to="/admin/images/galleryImages"
            >
              Gallery Images
            </NavLink>
          </li>
          <li className={styles.navLink} onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
      <div className={styles.adminContainer}>
        <Outlet />
      </div>
    </div>
  );
}
