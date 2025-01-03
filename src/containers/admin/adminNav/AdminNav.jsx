import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import styles from "./adminNav.module.scss";
import { fetchImages } from "../../galleryPage/galleryPageUi/galleryPageSlice";
import { fetchPageImages } from "../../mainPage/mainPageUi/mainPageImagesSlice";
import { fetchContent } from "../../../store/mainPageContentSlice";
import { isAuthenticated, logoutUser } from "../../../store/authSlice";

export default function AdminNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIsAuthenticated = useSelector(isAuthenticated);

  useEffect(() => {
    if (!userIsAuthenticated) {
      navigate("/login");
    }
  }, [userIsAuthenticated, navigate]);

  useEffect(() => {
    if (!userIsAuthenticated) return;
    dispatch(fetchPageImages());
    dispatch(fetchImages());
    dispatch(fetchContent());
  }, [dispatch, userIsAuthenticated]);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser());

    // navigate("/login");
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
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
              onClick={handleLogout}
              to="/login"
            >
              logout
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.adminContainer}>
        <Outlet />
      </div>
    </div>
  );
}
