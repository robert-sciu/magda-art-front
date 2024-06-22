import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SocialIcons from "../../../containers/common/socialIcons/SocialIcons";

import { selectLogoImage } from "../../../containers/rootNav/rootNavSlice";

import styles from "./fillers.module.scss";

function SocialsFiller() {
  return (
    <div>
      <SocialIcons />
    </div>
  );
}

function ContactFiller() {
  return (
    <div>
      <Link className={styles.link} to="/">
        Contact
      </Link>
    </div>
  );
}

function LogoFiller() {
  const logo = useSelector(selectLogoImage);
  return (
    <div className={styles.logo}>
      <img src={logo?.externalUrl} alt={"logo"} />
    </div>
  );
}

function RandomFiller() {
  return (
    <div className={styles.randomFiller}>
      <p>I hope You&apos;re having a fantasic day! :)</p>
    </div>
  );
}

const FillerComponents = {
  socials: SocialsFiller,
  contact: ContactFiller,
  logo: LogoFiller,
  random: RandomFiller,
};

export default FillerComponents;
