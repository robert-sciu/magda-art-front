import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

import Button from "../button/Button";

import styles from "./navLinkBtn.module.scss";

export default function NavLinkBtn({ to, label, onClick = () => {} }) {
  return (
    <li className={styles.navLinkContainer}>
      <NavLink className={styles.navLink} to={to} onClick={onClick}>
        {({ isActive }) => (
          <Button label={label} flexStretch={true} disabled={isActive} />
        )}
      </NavLink>
    </li>
  );
}

NavLinkBtn.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};
