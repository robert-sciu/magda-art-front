import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import styles from "./adminNav.module.scss";

import {
  selectAuthAuthenticationStatus,
  logoutUser,
  selectTokenVerificationStatus,
} from "../../../store/authSlice";
import NavLinkBtn from "../../../components/elements/navLinkBtn/navLinkBtn";
import { setLocation } from "../../../store/rootNavSlice";

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
