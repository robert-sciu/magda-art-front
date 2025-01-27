// import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store/store.js";

import App from "./App.jsx";

import "./index.scss";
import LoadingState from "./components/loadingState/loadingState.jsx";
import { selectAppLoaded } from "./store/rootNavSlice.js";

const env = import.meta.env.ENV;

if (env !== "development") {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <LoadingState appLoadedSelector={selectAppLoaded} />
  </Provider>
  // </React.StrictMode>
);
