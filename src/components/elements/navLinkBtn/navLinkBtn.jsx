import { NavLink } from "react-router-dom";

import styles from "./navLinkBtn.module.scss";

import Button from "../button/button";

import PropTypes from "prop-types";
// import { classNameFormatter } from "../../../utilities/utilities";

export default function NavLinkBtn({ to, label, onClick = () => {} }) {
  // function activeStateStyleHandler({ isActive }) {
  // return classNameFormatter({
  //   styles,
  //   classNames: ["navLink", isActive && "active"],
  // });
  // }
  return (
    <li>
      <NavLink className={styles.navLink} to={to} onClick={onClick}>
        <Button label={label} />
        {/* {label} */}
        {/* <div className={styles.icon}></div> */}
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
