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
  state.fillers = action.payload.fillers;
  action.payload.paintings.forEach((image) => {
    const colHeights = createArrayFromObject(state.columns).map(
      (col) => col.height
    );
    const lowestColHeight = Math.min(...colHeights);
    const lowestCol = Object.keys(state.columns).find(
      (col) => state.columns[col].height === lowestColHeight
    );
    const gapSize = parseFloat(scss.sizeXxxs);
    state.columns[lowestCol].height += image.height_px + gapSize;
    state.columns[lowestCol].paintings.push(image);
    state.columns[lowestCol].imagesCount++;
  });
  const colHeights = createArrayFromObject(state.columns).map(
    (col) => col.height
  );
  const highestColHeight = Math.max(...colHeights);
  const highestCol = Object.keys(state.columns).find(
    (col) => state.columns[col].height === highestColHeight
  );
  state.columns[highestCol].isHighest = true;

  createArrayFromObject(state.columns).forEach((column) => {
    const columnFreeSpace = highestColHeight - column.height;
    const minimumFreeSpace = 300;
    const minimumFreeSpaceForLogo =
      parseInt(scss.sizeXxl) + parseInt(scss.sizeXxs);

    if (columnFreeSpace > minimumFreeSpace && state.fillers.length > 0) {
      const filler = state.fillers.shift();

      // If the current column is the logo column, but it doesn't have enough space and we have fillers left in the array,
      // we will use the next filler in the array to fill the column.
      if (
        filler.type === "logo" &&
        columnFreeSpace < minimumFreeSpaceForLogo &&
        state.fillers.length > 0
      ) {
        const nextFiller = state.fillers.shift();
        column.filler = nextFiller.type;
      } else {
        column.filler = filler.type;
      }
    }
  });
}

export { populatePageImagesState, populateGalleryPageColumns };
