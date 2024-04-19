import { useSelector } from "react-redux";
import styles from "./welcome.module.scss";
import { selectWelcome } from "../../../containers/mainPage/mainPageContentSlice";
import WelcomeGrid from "../welcomeGrid/WelcomeGrid";

export default function Welcome() {
  const welcomeText = useSelector(selectWelcome);
  return (
    <div className={styles.gridContainer}>
      <div>
        <h2>Welcome</h2>
        <p>{welcomeText}</p>
      </div>
      <WelcomeGrid />
    </div>
  );
}
