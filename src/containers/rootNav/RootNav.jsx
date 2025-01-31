import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Footer from "../../components/common/footer/Footer";
import DesktopNav from "../../components/common/desktopNav/DesktopNav";
import MobileNav from "../../components/common/mobileNav/MobileNav";

import {
  selectDevice,
  selectFixedNav,
  selectLocation,
  selectMobileNavIsOpen,
  setDevice,
  setMobileNavIsOpen,
  setWindowWidth,
} from "../../store/rootNavSlice";
import { selectAuthAuthenticationStatus } from "../../store/authSlice";
import { fetchCommonImages } from "../../store/mainPageImagesSlice";

import scss from "../../../styles/variables.module.scss";
import styles from "./rootNav.module.scss";

/**
 * Renders the root navigation component with dynamic links based on user authentication.
 *
 * @return {JSX.Element} The root navigation component JSX.
 *
 */

const tabletWidth = parseInt(scss.tabletWidth);

export default function RootNav() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [socialsLoaded, setSocialsLoaded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(false);

  const dispatch = useDispatch();

  const userIsAuthenticated = useSelector(selectAuthAuthenticationStatus);
  const navIsFixed = useSelector(selectFixedNav);
  const location = useSelector(selectLocation);
  const device = useSelector(selectDevice);
  const mobileNavOpen = useSelector(selectMobileNavIsOpen);

  const navRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCommonImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setWindowWidth(window.innerWidth));
    if (window.innerWidth <= tabletWidth || window.innerHeight <= tabletWidth) {
      dispatch(setDevice("mobile"));
    } else {
      dispatch(setDevice("desktop"));
    }
  }, [dispatch]);

  useEffect(() => {
    userIsAuthenticated ? setShowAdmin(true) : setShowAdmin(false);
  }, [userIsAuthenticated]);

  useEffect(() => {
    (logoLoaded || socialsLoaded) && setShowNav(true);
  }, [logoLoaded, socialsLoaded]);

  useEffect(() => {
    if (navIsFixed) {
      const timeoutId = setTimeout(() => {
        setShowFixedNav(true);
      }, 100);

      return () => clearTimeout(timeoutId);
    } else {
      setShowFixedNav(false);
    }
  }, [navIsFixed]);

  useEffect(() => {
    function handleResize() {
      if (
        window.innerWidth <= tabletWidth ||
        window.innerHeight <= tabletWidth
      ) {
        dispatch(setDevice("mobile"));
      } else {
        dispatch(setDevice("desktop"));
      }
      dispatch(setWindowWidth(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideNavClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideNavClick);
  });

  function handleOutsideNavClick(e) {
    if (navRef.current && !navRef.current.contains(e.target)) {
      dispatch(setMobileNavIsOpen(false));
    }
  }

  function handleMobileNavOpen(state) {
    dispatch(setMobileNavIsOpen(state));
  }

  return (
    <div className={styles.rootNavContainer}>
      {device === "desktop" && (
        <DesktopNav
          showNav={showNav}
          isFixedNav={false}
          showAdmin={showAdmin}
          onLogoLoaded={setLogoLoaded}
          onSocialsLoaded={setSocialsLoaded}
        />
      )}
      {navIsFixed && location === "/" && device === "desktop" && (
        <DesktopNav
          showNav={showFixedNav}
          isFixedNav={true}
          onLogoLoaded={setLogoLoaded}
          onSocialsLoaded={setSocialsLoaded}
        />
      )}
      {device === "mobile" && (
        <MobileNav
          ref={navRef}
          onSocialsLoaded={setSocialsLoaded}
          mobileNavOpen={mobileNavOpen}
          onMobileNavOpen={handleMobileNavOpen}
        />
      )}
      <Outlet />
      <Footer />
    </div>
  );
}
