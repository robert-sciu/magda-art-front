import React from "react";

const env = import.meta.env;

if (env !== "development") {
  disableReactDevTools();
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    delete window.__REDUX_DEVTOOLS_EXTENSION__;
  }
}

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store/store.js";

import App from "./App.jsx";

import "./index.scss";
import LoadingState from "./components/loadingState/loadingState.jsx";
import { selectAppLoaded } from "./store/rootNavSlice.js";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <LoadingState appLoadedSelector={selectAppLoaded} />
    </Provider>
  </React.StrictMode>
);
