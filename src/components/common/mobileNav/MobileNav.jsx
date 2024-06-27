import PropTypes from "prop-types";

import NavLinks from "../navLinks/NavLinks";
import menuBtn from "../../../assets/menu-outline.svg";
import closeBtn from "../../../assets/close-circle-outline.svg";

import styles from "./mobileNav.module.scss";

export default function MobileNav({
  onSocialsLoaded,
  mobileNavOpen,
  onMobileNavOpen,
}) {
  return (
    <>
      <div className={styles.menuBtn}>
        <img
          src={menuBtn}
          alt="menu button"
          onClick={() => onMobileNavOpen(true)}
        />
      </div>

      <div
        className={`${styles.mobileNav} ${
          mobileNavOpen ? styles.mobileNavOpen : styles.mobileNavClose
        }`}
      >
        <div className={styles.closeBtn}>
          <img
            src={closeBtn}
            alt="close button"
            onClick={() => onMobileNavOpen(false)}
          />
        </div>

        <NavLinks
          showAdmin={false}
          navClass={"mobileNav"}
          onSocialsLoaded={onSocialsLoaded}
          onMobileNavOpen={onMobileNavOpen}
        />
      </div>
    </>
  );
}

MobileNav.propTypes = {
  onSocialsLoaded: PropTypes.func,
  mobileNavOpen: PropTypes.bool,
  onMobileNavOpen: PropTypes.func,
};
