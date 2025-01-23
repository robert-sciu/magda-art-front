import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import NavLinkBtn from "../../../components/elements/navLinkBtn/navLinkBtn";

import {
  selectAuthAuthenticationStatus,
  logoutUser,
  selectTokenVerificationStatus,
} from "../../../store/authSlice";

import { setLocation } from "../../../store/rootNavSlice";

import styles from "./adminNav.module.scss";

export default function AdminNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIsAuthenticated = useSelector(selectAuthAuthenticationStatus);
  const tokenVerificationComplete = useSelector(selectTokenVerificationStatus);

  useEffect(() => {
    dispatch(setLocation(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    if (tokenVerificationComplete && !userIsAuthenticated) {
      navigate("/login");
    }
  }, [userIsAuthenticated, navigate, tokenVerificationComplete]);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <div className={styles.adminContainer}>
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
      <div className={styles.adminOutletContainer}>
        <Outlet />
      </div>
    </div>
  );
}
