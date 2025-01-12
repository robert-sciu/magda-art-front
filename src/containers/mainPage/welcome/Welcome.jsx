import { useSelector } from "react-redux";

import WelcomeGrid from "../../../components/MainPage/welcomeGrid/WelcomeGrid";
import SocialIcons from "../../common/socialIcons/SocialIcons";

import { selectWelcome } from "../../../store/mainPageContentSlice";
import { selectWelcomeImages } from "../../../store/mainPageImagesSlice";
import {
  selectSocialsIcons,
  selectWindowWidth,
} from "../../rootNav/rootNavSlice";

import styles from "./welcome.module.scss";
import scss from "../../../../styles/variables.module.scss";

import { createArrayFromObject } from "../../../utilities";

const tabletWidth = parseInt(scss.tabletWidth);

export default function Welcome() {
  const welcomeText = useSelector(selectWelcome);
  const welcomeImages = useSelector(selectWelcomeImages);
  const socialIcons = useSelector(selectSocialsIcons);

  const socialIconsArray = createArrayFromObject(socialIcons);
  const welcomeImagesArray = createArrayFromObject(welcomeImages);

  const pageWidth = useSelector(selectWindowWidth);

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <h2>Welcome</h2>
        <p>{welcomeText}</p>
        <div className={styles.socials}>
          <SocialIcons socialIconsArray={socialIconsArray} />
        </div>
      </div>
      <div className={styles.welcomeGrid}>
        <WelcomeGrid
          welcomeImagesArray={
            pageWidth <= tabletWidth
              ? welcomeImagesArray.slice(0, 2)
              : welcomeImagesArray
          }
        />
      </div>
    </div>
  );
}
