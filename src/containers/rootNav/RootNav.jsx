import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Footer from "../common/footer/Footer";

import DesktopNav from "../../components/common/desktopNav/DesktopNav";
import { fetchCommonImages } from "./rootNavSlice";
import { filesLoaded } from "../../store/loadingStateSlice";
import { isAuthenticated } from "../admin/login/loginSlice";

import MobileNav from "../../components/common/mobileNav/MobileNav";

/**
 * Renders the root navigation component with dynamic links based on user authentication.
 *
 * @return {JSX.Element} The root navigation component JSX.
 */

const mobileWidth = 768;

export default function RootNav() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [socialsLoaded, setSocialsLoaded] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [desktopNav, setDesktopNav] = useState(window.innerWidth > mobileWidth);
  const [mobileNav, setMobileNav] = useState(window.innerWidth <= mobileWidth);
  const dispatch = useDispatch();

  const loadState = useSelector(filesLoaded);
  const userIsAuthenticated = useSelector(isAuthenticated);

  useEffect(() => {
    if (!loadState) return;
    dispatch(fetchCommonImages());
  }, [dispatch, loadState]);

  useEffect(() => {
    userIsAuthenticated ? setShowAdmin(true) : setShowAdmin(false);
  }, [userIsAuthenticated]);

  useEffect(() => {
    (logoLoaded || socialsLoaded) && setShowNav(true);
  }, [logoLoaded, socialsLoaded]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= mobileWidth) {
        setMobileNav(true);
        setDesktopNav(false);
      } else {
        setMobileNav(false);
        setDesktopNav(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {mobileNav && <MobileNav onSocialsLoaded={setSocialsLoaded} />}
      <Outlet />
      <Footer />
    </>
  );
}
