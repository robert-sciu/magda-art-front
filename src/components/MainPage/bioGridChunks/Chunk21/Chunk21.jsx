// import PropTypes from "prop-types";

// import ImageTile from "../../../common/imageTile/ImageTile";

// import universalStyles from "../universalChunkStyle.module.scss";
// import styles from "./chunk21.module.scss";

// export default function Chunk21({ images }) {
//   const [img1, ...otherImages] = images;
//   return (
//     <div className={styles.grid21}>
//       <figure className={`${universalStyles.bioGalleryItem} ${styles.imgXlR}`}>
//         <ImageTile img={img1} />
//       </figure>
//       {otherImages.map((img) => {
//         return (
//           <figure className={universalStyles.bioGalleryItem} key={img?.id}>
//             <ImageTile img={img} />
//           </figure>
//         );
//       })}
//     </div>
//   );
// }

// Chunk21.propTypes = {
//   images: PropTypes.array.isRequired,
// };
