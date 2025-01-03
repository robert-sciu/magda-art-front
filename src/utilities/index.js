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

export function extractResponseData(response) {
  return response?.data?.data || response?.data?.message || "empty response";
}

export function extractErrorResponse(error) {
  return error?.response?.data?.message || error.message || "unknown error";
}

export function createImageObject(imageObject) {
  return {
    url: imageObject.url,
    name: imageObject.name,
    id: imageObject.id,
    placement: imageObject.placement ?? undefined,
    externalUrl: imageObject.externalUrl ?? undefined,
  };
}

export function createArrayFromObject(object) {
  return Object.values(object);
}

export function matchTextToImage(imagePlacement, visualizationTexts) {
  return visualizationTexts[`visualization${imagePlacement}`]?.["content"];
}

export async function checkImageDimensions(file, role) {
  return new Promise((resolve, reject) => {
    const rolesWithSquareImages = [
      "welcome",
      "bio",
      "visualizations",
      "contactSmall",
      "socials",
      "logo",
    ];
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      let errorMessage = null;
      if (
        rolesWithSquareImages.includes(role) &&
        image.width !== image.height
      ) {
        errorMessage = "Image should be square";
      }
      if (role === "contactBig" && image.width * 3 !== image.height) {
        errorMessage =
          "Image ratio should be 3:1. It would just look weird if it's not.";
      }

      URL.revokeObjectURL(image.src);
      resolve(errorMessage);
    };

    image.onerror = () => {
      URL.revokeObjectURL(image.src);
      reject(
        new Error("Failed to load file. Are you sure you're uploading an image")
      );
    };
  });
}

export function splitOnUppercase(str) {
  return str
    .split(/(?=[A-Z])/)
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function checkUploadInfo({
  imageName,
  file,
  externalUrl,
  urlInput,
  height_cm,
  width_cm,
  description,
  onImageNameError,
  onFileError,
  onUrlError,
  onHeightError,
  onWidthError,
  onDescriptionError,
}) {
  return new Promise((resolve) => {
    let isValid = true;
    if (!imageName && onImageNameError) {
      onImageNameError("Please enter an image name");
      isValid = false;
    }

    if (!file) {
      onFileError("Please select a file");
      isValid = false;
    }

    if (urlInput && !externalUrl && onUrlError) {
      onUrlError("Please enter an external url");
      isValid = false;
    }

    if ((!height_cm || !Number(height_cm)) && onHeightError) {
      onHeightError("Please enter a valid number for height");
      isValid = false;
    }

    if ((!width_cm || !Number(width_cm)) && onWidthError) {
      onWidthError("Please enter a valid number for width");
      isValid = false;
    }

    if (!description && onDescriptionError) {
      onDescriptionError("Please enter a description");
      isValid = false;
    }

    resolve(isValid);
  });
}

export function resetErrors(setters) {
  setters.forEach((setter) => setter(null));
}
