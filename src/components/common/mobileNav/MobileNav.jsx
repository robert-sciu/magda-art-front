import PropTypes from "prop-types";

import NavLinks from "../navLinks/NavLinks";
import menuBtn from "../../../assets/menu-outline.svg";
import closeBtn from "../../../assets/close-circle-outline.svg";

import styles from "./mobileNav.module.scss";

export default function MobileNav({ onSocialsLoaded }) {
  return (
    <div className={styles.mobileNav}>
      <div className={styles.closeBtn}>
        <img src={closeBtn} alt="close button" />
      </div>

      <div className={styles.menuBtn}>
        <img src={menuBtn} alt="menu button" />
      </div>

      <NavLinks
        showAdmin={false}
        navClass={"mobileNav"}
        onSocialsLoaded={onSocialsLoaded}
      />
    </div>
  );
}

MobileNav.propTypes = {
  onSocialsLoaded: PropTypes.func,
};
