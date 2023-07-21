import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { userContext } from "./UserContext";

import App from "./App";
import "./i18n";

import { store } from "./store";
import { Provider } from "react-redux";
import { headerRechardedContext } from "./HeaderRechargedContext";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

export const UserStateProvider = ({ children }) => (
  <userContext.Provider value={useState({ user: {} })}>
    {children}
  </userContext.Provider>
);

export const HeaderRechardedStateProvider = ({ children }) => (
  <headerRechardedContext.Provider value={useState({ headerRecharged: false })}>
    {children}
  </headerRechardedContext.Provider>
);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="">
      <Provider store={store}>
        <UserStateProvider>
          {/*<HeaderRechardedStateProvider>*/}
          <App />
          {/*</HeaderRechardedStateProvider>*/}
        </UserStateProvider>
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);
