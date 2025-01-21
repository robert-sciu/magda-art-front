import he from "he";

function classNameFormatter({ styles, classNames }) {
  const formatted = classNames.map((className) => {
    return styles[className];
  });
  return formatted.join(" ");
}

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getFileNameFromUrl(url) {
  if (url.includes("/")) {
    return url.split("/").pop();
  } else {
    return url.split("\\").pop();
  }
}

function desanitizeString(str) {
  return he.decode(he.decode(str));
}

export {
  classNameFormatter,
  capitalizeString,
  getFileNameFromUrl,
  desanitizeString,
};
