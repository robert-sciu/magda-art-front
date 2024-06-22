import PropTypes from "prop-types";

import Chunk12 from "../bioGridChunks/Chunk12/Chunk12";
import Chunk21 from "../bioGridChunks/Chunk21/Chunk21";
import Chunk111 from "../bioGridChunks/Chunk111/Chunk111";
import Chunk11 from "../bioGridChunks/Chunk11/Chunk11";

import styles from "./bioGrid.module.scss";

export default function BioGrid({ sortedImages }) {
  return (
    // prettier-ignore
    <div className={styles.bioGallery}>
      {sortedImages.length > 0 && <Chunk12 images={sortedImages.slice(0, 3)} />}
      {sortedImages.length > 3 && <Chunk21 images={sortedImages.slice(3, 6)} />}
      {sortedImages.length > 6 && <Chunk111 images={sortedImages.slice(6, 9)} />}
      {sortedImages.length > 9 && <Chunk11 images={sortedImages.slice(9)} />}
    </div>
  );
}

BioGrid.propTypes = {
  sortedImages: PropTypes.array,
};
