import { forwardRef } from "react";
import PropTypes from "prop-types";

import { IoCloseCircleOutline, IoMenu } from "react-icons/io5";

import Logo from "../logo/Logo";
import NavLinks from "../../../containers/common/navLinks/NavLinks";
import styles from "./mobileNav.module.scss";
import Button from "../../elements/button/Button";

import { classNameFormatter } from "../../../utilities/utilities";

function MobileNavComponent(
  //eslint-disable-next-line
  { onSocialsLoaded, mobileNavOpen, onMobileNavOpen },
  ref
) {
  return (
    <div ref={ref}>
      <div className={styles.menuBtn}>
        <Button
          icon={<IoMenu />}
          style={"navIcon"}
          color={"basicLightIcon"}
          onClick={() => onMobileNavOpen(true)}
        />
      </div>
      <div
        className={classNameFormatter({
          styles,
          classNames: [
            "mobileNav",
            mobileNavOpen ? "mobileNavOpen" : "mobileNavClose",
          ],
        })}
      >
        <div className={styles.closeBtn}>
          <Button
            icon={<IoCloseCircleOutline />}
            style={"navIcon"}
            color={"basicDarkIcon"}
            onClick={() => onMobileNavOpen(false)}
          />
        </div>
        <Logo size={"L"} />
        <NavLinks
          showAdmin={false}
          navClass={"mobileNav"}
          onSocialsLoaded={onSocialsLoaded}
          onMobileNavOpen={onMobileNavOpen}
        />
      </div>
    </div>
  );
}

const MobileNav = forwardRef(MobileNavComponent);

MobileNav.propTypes = {
  onSocialsLoaded: PropTypes.func,
  mobileNavOpen: PropTypes.bool,
  onMobileNavOpen: PropTypes.func,
};

// MobileNav.displayName = "MobileNav";

export default MobileNav;
