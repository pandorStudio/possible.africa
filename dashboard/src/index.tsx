import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";

import { store } from "./store";
import { Provider } from "react-redux";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <Provider store={store}>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);
