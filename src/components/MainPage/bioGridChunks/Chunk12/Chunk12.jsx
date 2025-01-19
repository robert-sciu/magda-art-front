// import PropTypes from "prop-types";

// import ImageTile from "../../../common/imageTile/ImageTile";

// import universalStyles from "../universalChunkStyle.module.scss";
// import styles from "./chunk12.module.scss";

// export default function Chunk12({ images }) {
//   const [img1, ...otherImages] = images;
//   return (
//     <div className={styles.grid12}>
//       <figure className={`${universalStyles.bioGalleryItem} ${styles.imgXlL}`}>
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

// Chunk12.propTypes = {
//   images: PropTypes.array.isRequired,
// };
