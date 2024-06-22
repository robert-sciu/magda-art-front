import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { selectSocialsIcons } from "../../rootNav/rootNavSlice";

import styles from "./socialIcons.module.scss";

import { createArrayFromObject } from "../../../utilities";

/**
 * Renders a component that displays social icons.
 *
 * @param {Object} props - The properties for the component.
 * @param {Function} props.onLoad - A callback function to be called when all social icons have loaded.
 * @return {JSX.Element} The rendered component.
 */
export default function SocialIcons({ onLoad }) {
  const [socialIconsLoaded, setSocialIconsLoaded] = useState(0);

  const socialIcons = useSelector(selectSocialsIcons);
  const socialIconsArray = createArrayFromObject(socialIcons);

  const numberOfIcons = socialIconsArray.length;

  useEffect(() => {
    if (socialIconsLoaded === numberOfIcons && onLoad) {
      onLoad(true);
    }
  }, [socialIconsLoaded, numberOfIcons, onLoad]);

  return (
    <div className={styles.socials}>
      {socialIconsArray &&
        socialIconsArray.map((socialIcon) => (
          <Link key={socialIcon.id} to={socialIcon.externalUrl} target="blank">
            <img
              src={socialIcon.url}
              alt={socialIcon.name}
              onLoad={() => setSocialIconsLoaded((prev) => prev + 1)}
            />
          </Link>
        ))}
    </div>
  );
}

SocialIcons.propTypes = {
  onLoad: PropTypes.func,
};
