import { useSelector } from "react-redux";
import styles from "./welcome.module.scss";
import { selectWelcome } from "../../../containers/mainPage/mainPageContentSlice";
import WelcomeGrid from "../welcomeGrid/WelcomeGrid";
import SocialIcons from "../socialIcons/SocialIcons";

export default function Welcome() {
  const welcomeText = useSelector(selectWelcome);
  return (
    <div className={styles.gridContainer}>
      <div className={styles.welcomeContent}>
        <h2>Welcome</h2>
        <p>{welcomeText}</p>
        <div className={styles.socials}>
          <SocialIcons />
        </div>
      </div>
      <WelcomeGrid />
    </div>
  );
}
