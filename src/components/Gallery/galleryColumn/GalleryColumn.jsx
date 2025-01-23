import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import ImageDisplay from "../../elements/imageDisplay/ImageDisplay";

import { selectLazyLoadStatus } from "../../../store/galleryPageSlice";

import styles from "./galleryColumn.module.scss";

export default function GalleryColumn({ column, isHighest, Filler = null }) {
  const refs = useRef([]);
  const [visibleImages, setVisibleImages] = useState(new Set());
  const lazyLoaded = useSelector(selectLazyLoadStatus);

  useEffect(() => {
    if (!lazyLoaded) return;
    const curentRefs = refs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => {
              if (!prev.has(entry.target.dataset.id)) {
                // Create a new Set to trigger React state updates
                const newSet = new Set(prev);
                newSet.add(entry.target.dataset.id);
                return newSet;
              }
              return prev;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    // Observe each `GalleryTile` using refs
    curentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      // Cleanup
      curentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, [lazyLoaded, column]); // the column is here to rebuild the observer when the column changes when resized

  return (
    <div className={styles.galleryColumn}>
      {column.map((image, index) => (
        <ImageDisplay
          img={image}
          key={image.id}
          isVisible={visibleImages.has(image.id.toString())}
          ref={(el) => (refs.current[index] = el)}
          type={"gallery"}
        />
      ))}
      {!isHighest ? (
        <div className={styles.filler}>{Filler ? <Filler /> : null}</div>
      ) : null}
    </div>
  );
}

GalleryColumn.propTypes = {
  column: PropTypes.array,
  isHighest: PropTypes.bool,
  Filler: PropTypes.func,
  columnName: PropTypes.string,
};
