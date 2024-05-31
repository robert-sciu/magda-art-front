import { useSelector } from "react-redux";
import { selectLogoImage } from "../../../containers/rootNav/rootNavSlice";
import styles from "./logo.module.scss";
import { useState } from "react";

export default function Logo() {
  const logo = useSelector(selectLogoImage);
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <div className={styles.logo} style={logoLoaded ? { opacity: "1" } : null}>
      {logo ? (
        <img
          src={logo?.url}
          alt={logo?.name}
          onLoad={() => setLogoLoaded(true)}
        />
      ) : null}
    </div>
  );
}
