import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import SocialIcons from "../../../components/common/socialIcons/SocialIcons";

import { selectLocation, setLocation } from "../../../store/rootNavSlice";

import styles from "./navLinks.module.scss";
import UniversalNavLink from "../../../components/elements/universalNavLink/UniversalNavLink";

export default function NavLinks({
  showAdmin,
  navClass,
  onMobileNavOpen = () => {},
}) {
  const location = useSelector(selectLocation);
  const dispatch = useDispatch();

  function handleLinkClick(e) {
    if (navClass === "mobileNav") {
      dispatch(setLocation(window.location.pathname));
    } else if (navClass === "desktopNav") {
      dispatch(setLocation(window.location.pathname));
    }
    e.preventDefault();
    onMobileNavOpen(false);
  }

  return (
    <>
      <ul className={styles[navClass]} onClick={handleLinkClick}>
        {location === "/" ? (
          <UniversalNavLink
            isScroll={true}
            to="hero"
            label="Home"
            onLinkClick={handleLinkClick}
            isMobile={navClass === "mobileNav"}
          />
        ) : (
          <UniversalNavLink
            isNav={true}
            to="/"
            label="Home"
            isMobile={navClass === "mobileNav"}
          />
        )}

        {(location === "/" || location === "/admin") && (
          <UniversalNavLink
            isScroll={true}
            to="bio"
            label="Bio"
            onLinkClick={handleLinkClick}
            isMobile={navClass === "mobileNav"}
          />
        )}

        <UniversalNavLink
          isNav={true}
          to="/gallery"
          label="Gallery"
          isMobile={navClass === "mobileNav"}
        />

        {(location === "/" || location === "/admin") && (
          <UniversalNavLink
            isScroll={true}
            to="visualizations"
            label="Visualizations"
            onLinkClick={handleLinkClick}
            isMobile={navClass === "mobileNav"}
          />
        )}
        {(location === "/" || location === "/admin") && (
          <UniversalNavLink
            isScroll={true}
            to="contact"
            label="Contact"
            onLinkClick={handleLinkClick}
            isMobile={navClass === "mobileNav"}
          />
        )}

        {showAdmin ? (
          <UniversalNavLink
            isNav={true}
            to="/admin"
            label="Admin"
            isMobile={navClass === "mobileNav"}
          />
        ) : null}
      </ul>
      <div className={styles.socials}>
        <SocialIcons />
      </div>
    </>
  );
}

NavLinks.propTypes = {
  showAdmin: PropTypes.bool,
  onSocialsLoaded: PropTypes.func,
  navClass: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};
