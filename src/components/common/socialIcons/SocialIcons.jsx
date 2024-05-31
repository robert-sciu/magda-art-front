import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSocialsIcons } from "../../../containers/rootNav/rootNavSlice";
import styles from "./socialIcons.module.scss";
import { useState } from "react";

export default function SocialIcons() {
  const socials = useSelector(selectSocialsIcons);
  const [socialIconsLoaded, setSocialIconsLoaded] = useState(0);

  return (
    <div
      className={styles.socials}
      style={socialIconsLoaded >= 2 ? { opacity: "1" } : null}
    >
      <NavLink to="https://instagram.com" target="blank">
        <img
          src={socials.instagram?.url}
          alt="instagram icon"
          onLoad={() => setSocialIconsLoaded((prevCount) => prevCount + 1)}
        />
      </NavLink>
      <NavLink to="https://facebook.com" target="blank">
        <img
          src={socials.facebook?.url}
          alt="facebook icon"
          onLoad={() => setSocialIconsLoaded((prevCount) => prevCount + 1)}
        />
      </NavLink>
    </div>
  );
}
