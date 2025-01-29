import { createArrayFromObject, createImageObject } from ".";
import scss from "../../styles/variables.module.scss";

/**
 * Populate the pageImages state with the images from the payload.
 * @param {Object} state - The state to populate.
 * @param {Object} action - The action with the payload of images.
 * @param {Boolean} clearCommonOnly - If true, only clear the common roles.
 * @param {String} roleToClear - If set, clear only the images for this role.
 */
function populatePageImagesState({
  state,
  action,
  commonOnly = false,
  role = null,
}) {
  const commonRoles = Object.keys(state.commonImages);

  if (commonOnly) {
    commonRoles.forEach((role) => {
      state.commonImages[role] = [];
    });
    action.payload.forEach((imageObject) => {
      state.commonImages[imageObject.role].push(createImageObject(imageObject));
    });
    return;
  }

  if (role) {
    if (commonRoles.includes(role)) {
      state.commonImages[role] = [];
    } else {
      state.pageImages[role] = [];
    }
  }

  const clearAll = !commonOnly && !role;

  if (clearAll) {
    Object.keys(state.pageImages).forEach((role) => {
      state.pageImages[role] = [];
    });
  }

  action.payload.forEach((imageObject) => {
    if (commonRoles.includes(imageObject.role)) {
      state.commonImages[imageObject.role].push(createImageObject(imageObject));
    } else {
      state.pageImages[imageObject.role].push(createImageObject(imageObject));
    }
  });
}

function populateGalleryPageColumns({ state, action }) {
  const numberOfColumns = action.payload.numberOfColumns;
  const fillers = state.fillers;
  const paintings = state.galleryImages;

  const columns = {};
  for (let i = 1; i <= numberOfColumns; i++) {
    columns[`column-${i}`] = {
      height: 0,
      isHighest: false,
      paintings: [],
    };
  }

  paintings.forEach((image) => {
    const colHeights = createArrayFromObject(columns).map((col) => col.height);
    const lowestColHeight = Math.min(...colHeights);
    const lowestCol = Object.keys(columns).find(
      (col) => columns[col].height === lowestColHeight
    );
    const gapSize = parseFloat(scss.sizeXxxs);
    columns[lowestCol].height += image.height_px + gapSize;
    columns[lowestCol].paintings.push(image);
  });
  const colHeights = createArrayFromObject(columns).map((col) => col.height);

  const highestColHeight = Math.max(...colHeights);
  const highestCol = Object.keys(columns).find(
    (col) => columns[col].height === highestColHeight
  );

  columns[highestCol].isHighest = true;

  createArrayFromObject(columns).forEach((column) => {
    const columnFreeSpace = highestColHeight - column.height;
    const minimumFreeSpace = 300;
    const minimumFreeSpaceForLogo =
      parseInt(scss.sizeXxl) + parseInt(scss.sizeXxs);

    if (columnFreeSpace > minimumFreeSpace && fillers.length > 0) {
      const filler = fillers.shift();

      // If the current column is the logo column, but it doesn't have enough space and we have fillers left in the array,
      // we will use the next filler in the array to fill the column.
      if (
        filler.type === "logo" &&
        columnFreeSpace < minimumFreeSpaceForLogo &&
        fillers.length > 0
      ) {
        const nextFiller = fillers.shift();
        column.filler = nextFiller.type;
      } else {
        column.filler = filler.type;
      }
    }
  });

  state.columns = columns;
}

export { populatePageImagesState, populateGalleryPageColumns };
