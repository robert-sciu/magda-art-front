import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Footer from "../common/footer/Footer";
import DesktopNav from "../../components/common/desktopNav/DesktopNav";
import { MobileNav } from "../../components/common/mobileNav/MobileNav";
import FixedNav from "../../components/common/fixedNav/FixedNav";

import { selectFixedNav, selectLocation, setWindowWidth } from "./rootNavSlice";

import scss from "../../../styles/variables.module.scss";
import { selectAuthAuthenticationStatus } from "../../store/authSlice";
import { fetchCommonImages } from "../../store/mainPageImagesSlice";

/**
 * Renders the root navigation component with dynamic links based on user authentication.
 *
 * @return {JSX.Element} The root navigation component JSX.
 */

const tabletWidth = parseInt(scss.tabletWidth);

export default function RootNav() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [socialsLoaded, setSocialsLoaded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(false);
  const [desktopNav, setDesktopNav] = useState(window.innerWidth > tabletWidth);
  const [mobileNav, setMobileNav] = useState(window.innerWidth <= tabletWidth);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const dispatch = useDispatch();

  // const loadState = useSelector(filesLoaded);
  const userIsAuthenticated = useSelector(selectAuthAuthenticationStatus);
  const navIsFixed = useSelector(selectFixedNav);
  const location = useSelector(selectLocation);

  const navRef = useRef(null);

  useEffect(() => {
    // if (!loadState) return;
    dispatch(fetchCommonImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setWindowWidth(window.innerWidth));
  }, [dispatch]);

  useEffect(() => {
    userIsAuthenticated ? setShowAdmin(true) : setShowAdmin(false);
  }, [userIsAuthenticated]);

  useEffect(() => {
    (logoLoaded || socialsLoaded) && setShowNav(true);
  }, [logoLoaded, socialsLoaded]);

  useEffect(() => {
    if (navIsFixed) {
      setTimeout(() => {
        setShowFixedNav(true);
      }, 100);
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
        setMobileNav(true);
        setDesktopNav(false);
      } else {
        setMobileNav(false);
        setDesktopNav(true);
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
      setMobileNavOpen(false);
    }
  }

  return (
    <>
      {desktopNav && (
        <DesktopNav
          showNav={showNav}
          showAdmin={showAdmin}
          onLogoLoaded={setLogoLoaded}
          onSocialsLoaded={setSocialsLoaded}
        />
      )}
      {navIsFixed && location === "/" && !mobileNav && (
        <FixedNav showFixedNav={showFixedNav} />
      )}
      {mobileNav && (
        <MobileNav
          ref={navRef}
          onSocialsLoaded={setSocialsLoaded}
          mobileNavOpen={mobileNavOpen}
          onMobileNavOpen={setMobileNavOpen}
        />
      )}
      <Outlet />
      <Footer />
    </>
  );
}
