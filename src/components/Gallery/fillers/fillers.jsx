import { useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SocialIcons from "../../common/socialIcons/SocialIcons";
import ModalWindowMain from "../../../containers/modalWindow/modalWindowMain";
import ImageDisplay from "../../elements/imageDisplay/ImageDisplay";

import { selectLogoImage } from "../../../store/mainPageImagesSlice";

import styles from "./fillers.module.scss";

function SocialsFiller() {
  return (
    <div>
      <SocialIcons size={"L"} />
    </div>
  );
}

function ContactFiller() {
  const [showContactOverlay, setShowContactOverlay] = useState(false);
  function handleClick() {
    setShowContactOverlay(true);
  }

  return (
    <div>
      <Link className={styles.link} onClick={handleClick}>
        Contact
      </Link>

      {showContactOverlay && (
        <ModalWindowMain
          modalType={"contact"}
          onSetState={setShowContactOverlay}
        />
      )}
    </div>
  );
}

function LogoFiller() {
  const logo = useSelector(selectLogoImage)[0];
  return (
    <div className={styles.logo}>
      <ImageDisplay img={logo} isVisible={true} type={"pageImage"} />
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
