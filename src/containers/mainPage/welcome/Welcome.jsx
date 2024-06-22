import { useSelector } from "react-redux";

import WelcomeGrid from "../../../components/MainPage/welcomeGrid/WelcomeGrid";
import SocialIcons from "../../common/socialIcons/SocialIcons";

import { selectWelcome } from "../mainPageUi/mainPageContentSlice";
import { selectWelcomeImages } from "../mainPageUi/mainPageImagesSlice";
import { selectSocialsIcons } from "../../rootNav/rootNavSlice";

import styles from "./welcome.module.scss";

import { createArrayFromObject } from "../../../utilities";

export default function Welcome() {
  const welcomeText = useSelector(selectWelcome);
  const welcomeImages = useSelector(selectWelcomeImages);
  const socialIcons = useSelector(selectSocialsIcons);

  const socialIconsArray = createArrayFromObject(socialIcons);
  const welcomeImagesArray = createArrayFromObject(welcomeImages);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.welcomeContent}>
        <h2>Welcome</h2>
        <p>{welcomeText}</p>
        <div className={styles.socials}>
          <SocialIcons socialIconsArray={socialIconsArray} />
        </div>
      </div>
      <WelcomeGrid welcomeImagesArray={welcomeImagesArray} />
    </div>
  );
}
