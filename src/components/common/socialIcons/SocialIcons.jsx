import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectSocialIcons } from "../../../store/mainPageImagesSlice";

import styles from "./socialIcons.module.scss";

import { createArrayFromObject } from "../../../utilities";
import { classNameFormatter } from "../../../utilities/utilities";

/**
 * Renders a component that displays social icons.
 *
 * @param {Object} props - The properties for the component.
 * @param {Function} props.onLoad - A callback function to be called when all social icons have loaded.
 * @return {JSX.Element} The rendered component.
 */
export default function SocialIcons({ onLoad, size = "S" }) {
  const [socialIconsLoaded, setSocialIconsLoaded] = useState(0);

  const socialIcons = useSelector(selectSocialIcons);
  const socialIconsArray = createArrayFromObject(socialIcons);

  const numberOfIcons = socialIconsArray.length;

  useEffect(() => {
    if (socialIconsLoaded === numberOfIcons && onLoad) {
      onLoad(true);
    }
  }, [socialIconsLoaded, numberOfIcons, onLoad]);

  return (
    <div className={styles.socials}>
      {numberOfIcons &&
        socialIcons.map((socialIcon) => (
          <Link
            className={classNameFormatter({
              styles,
              classNames: ["socialIcon", `size${size}`],
            })}
            key={socialIcon.id}
            to={`https://${socialIcon.externalUrl}`}
            target="blank"
          >
            <img
              src={socialIcon.url_mobile}
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
  size: PropTypes.string,
};
