import.meta.url;
import("_").catch(() => 1);
(async function* () {})().next();
if (location.protocol !== "file:") {
  window.__vite_is_modern_browser = true;
}
