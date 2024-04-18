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
