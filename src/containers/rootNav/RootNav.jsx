import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Footer from "../common/footer/Footer";

import DesktopNav from "../../components/common/desktopNav/DesktopNav";
import { fetchCommonImages, setWindowWidth } from "./rootNavSlice";
import { filesLoaded } from "../../store/loadingStateSlice";
import { isAuthenticated } from "../admin/login/loginSlice";

import MobileNav from "../../components/common/mobileNav/MobileNav";

import scss from "../../../styles/variables.module.scss";

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
  const [desktopNav, setDesktopNav] = useState(window.innerWidth > tabletWidth);
  const [mobileNav, setMobileNav] = useState(window.innerWidth <= tabletWidth);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const dispatch = useDispatch();

  const loadState = useSelector(filesLoaded);
  const userIsAuthenticated = useSelector(isAuthenticated);

  useEffect(() => {
    if (!loadState) return;
    dispatch(fetchCommonImages());
  }, [dispatch, loadState]);

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
    function handleResize() {
      if (window.innerWidth <= tabletWidth) {
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
      {mobileNav && (
        <MobileNav
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
