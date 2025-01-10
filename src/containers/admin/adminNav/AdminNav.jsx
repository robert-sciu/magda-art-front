import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import styles from "./adminNav.module.scss";
import { fetchImages } from "../../galleryPage/galleryPageUi/galleryPageSlice";
// import { fetchPageImages } from "../../../store/mainPageImagesSlice";
import { fetchContent } from "../../../store/mainPageContentSlice";
import {
  selectAuthAuthenticationStatus,
  logoutUser,
} from "../../../store/authSlice";
import NavLinkBtn from "../../../components/elements/navLinkBtn/navLinkBtn";

export default function AdminNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIsAuthenticated = useSelector(selectAuthAuthenticationStatus);

  useEffect(() => {
    if (!userIsAuthenticated) {
      navigate("/login");
    }
  }, [userIsAuthenticated, navigate]);

  useEffect(() => {
    if (!userIsAuthenticated) return;
    // dispatch(fetchPageImages());
    dispatch(fetchImages());
    dispatch(fetchContent());
  }, [dispatch, userIsAuthenticated]);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <div>
      <div className={styles.adminNav}>
        <ul>
          <NavLinkBtn to="/admin/texts" label={"Page Texts"} />
          <NavLinkBtn to="/admin/images/pageImages" label={"Page Images"} />
          <NavLinkBtn
            to="/admin/images/galleryImages"
            label={"Gallery Images"}
          />
          <NavLinkBtn to="/login" label={"Logout"} onClick={handleLogout} />
        </ul>
      </div>
      <div className={styles.adminContainer}>
        <Outlet />
      </div>
    </div>
  );
}
