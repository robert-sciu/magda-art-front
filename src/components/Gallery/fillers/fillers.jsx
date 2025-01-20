import { useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import SocialIcons from "../../../containers/common/socialIcons/SocialIcons";
// import GalleryOverlayContact from "../../../containers/galleryPage/galleryOverlayContact/GalleryOverlayContact";

import styles from "./fillers.module.scss";
import { selectLogoImage } from "../../../store/mainPageImagesSlice";
import ModalWindowMain from "../../../containers/modalWindow/modalWindowMain";

function SocialsFiller() {
  return (
    <div>
      <SocialIcons />
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
        // <GalleryOverlayContact onCloseOverlay={setShowContactOverlay} />
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
      <img className={styles.logoImg} src={logo?.url_mobile} alt={"logo"} />
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

ContactFiller.propTypes = {
  contactComponent: PropTypes.object,
};
