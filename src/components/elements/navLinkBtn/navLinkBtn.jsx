import { NavLink } from "react-router-dom";

import styles from "./navLinkBtn.module.scss";

import Button from "../button/button";

import PropTypes from "prop-types";

export default function NavLinkBtn({ to, label, onClick = () => {} }) {
  return (
    <li>
      <NavLink className={styles.navLink} to={to} onClick={onClick}>
        {({ isActive }) => (
          <Button label={label} style={isActive ? "" : "lightBtn"} />
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
