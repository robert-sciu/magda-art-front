// import PropTypes from "prop-types";

// import Chunk12 from "../bioGridChunks/Chunk12/Chunk12";
// import Chunk21 from "../bioGridChunks/Chunk21/Chunk21";
// import Chunk111 from "../bioGridChunks/Chunk111/Chunk111";
// import Chunk11 from "../bioGridChunks/Chunk11/Chunk11";
// import Chunk1 from "../bioGridChunks/Chunk1/Chunk1";

// import styles from "./bioGrid.module.scss";

// export default function BioGrid({ sortedImages, gridType, pageWidth }) {
//   return (
//     // prettier-ignore
//     <div className={styles.bioGallery}>
//       {gridType === "gridLarge" && <>
//       <Chunk12 images={sortedImages.slice(0, 3)} />
//       <Chunk21 images={sortedImages.slice(3, 6)} />
//       <Chunk111 images={sortedImages.slice(6, 9)} />
//       <Chunk11 images={sortedImages.slice(9, 11)} />
//        </>}
//       {gridType === "gridMedium" && <>
//         <Chunk12 images={sortedImages.slice(0, 3)} />
//       {pageWidth < 1520 &&<Chunk11 images={sortedImages.slice(4,6)} />}
//       <Chunk1 images={sortedImages.slice(-1)} />
//       <Chunk21 images={sortedImages.slice(3, 6)} />
//       </>}

//       {gridType === "gridMediumSmall" && <> 
//       {pageWidth < 1100 && <Chunk11 images={sortedImages.slice(0, 2)} />}
//      <Chunk12 images={sortedImages.slice(2, 5)} />
//       <Chunk1 images={sortedImages.slice(5, 6)} />
//       <Chunk21 images={sortedImages.slice(6, 9)} />
//       {pageWidth < 1300 && <Chunk11 images={sortedImages.slice(9, 11)} />}
//       </>}

//       {gridType === "gridSmall" && <>
//       <Chunk11 images={sortedImages.slice(0, 2)} />
//       <Chunk1 images={sortedImages.slice(2, 3)} />
//       <Chunk21 images={sortedImages.slice(3, 6)} />
//       <Chunk11 images={sortedImages.slice(6, 8)} />
//       <Chunk1 images={sortedImages.slice(8, 9)} />
//       <Chunk11 images={sortedImages.slice(9, 11)} />
//       </>}

//       {gridType === "gridTablet1" && <>
//       <Chunk111 images={sortedImages.slice(0, 3)} />
//       <Chunk111 images={sortedImages.slice(3, 6)} />
//       </>}

//       {gridType === "gridTablet2" && <>
//       <Chunk111 images={sortedImages.slice(0, 3)} />
//       <Chunk111 images={sortedImages.slice(3, 6)} />
//       </>
//      }
//     </div>
//   );
// }

// BioGrid.propTypes = {
//   sortedImages: PropTypes.array,
//   pageWidth: PropTypes.number,
//   gridType: PropTypes.string,
// };
