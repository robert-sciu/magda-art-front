export function managePendingState(state) {
  state.isLoadingContent = true;
  state.hasError = true;
}

export function manageFulfilledState(state) {
  state.isLoadingContent = false;
  state.hasError = false;
}

export function manageRejectedState(state) {
  state.isLoadingContent = false;
  state.hasError = true;
}

export function createImageObject(imageObject) {
  return {
    url: imageObject.url,
    name: imageObject.name,
    id: imageObject.id,
    placement: imageObject.placement ?? undefined,
  };
}

export function matchTextToImage(imagePlacement, visualizationTexts) {
  return visualizationTexts[`visualization${imagePlacement}`]["content"];
}
