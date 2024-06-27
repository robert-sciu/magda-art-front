import PropTypes from "prop-types";

import ContactGridTile from "../contactGridTile/ContactGridTile";

import styles from "./contactGrid.module.scss";

export default function ContactGrid({ allImagesArray }) {
  return (
    <div className={styles.galleryGrid}>
      {allImagesArray.map((img, i) => (
        <ContactGridTile img={img} key={i} />
      ))}
    </div>
  );
}

ContactGrid.propTypes = {
  allImagesArray: PropTypes.array,
  pageWidth: PropTypes.number,
};
