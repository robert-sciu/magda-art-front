import { createImageObject } from ".";

function populatePageImagesState({ state, action, commonRoles }) {
  action.payload.forEach((imageObject) => {
    if (commonRoles.includes(imageObject.role)) {
      state.pageImages.common[imageObject.role][imageObject.imageName] =
        createImageObject(imageObject);
    } else {
      state.pageImages[imageObject.role][imageObject.imageName] =
        createImageObject(imageObject);
    }
  });
}

function clearPageImageStateForRoleToRefetch({ state, commonRoles }) {
  if (commonRoles.includes(state.roleToRefetch)) {
    state.pageImages.common[state.roleToRefetch] = {};
  } else {
    state.pageImages[state.roleToRefetch] = {};
  }
}

export { populatePageImagesState, clearPageImageStateForRoleToRefetch };
