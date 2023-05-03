import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider } from "./custom-data-provider/data-provider";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
//import dataProvider from "@refinedev/simple-rest";
import { AppIcon } from "components/app-icon";
import { ForgotPassword } from "pages/forgotPassword";
import { Login } from "pages/login";
import { Register } from "pages/register";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { UserList } from "pages/users/list";
import { UserEdit } from "pages/users/edit";
import { UserCreate } from "pages/users/create";
import { UserShow } from "pages/users/show";
import { OrganisationTypeList } from "pages/organisation_types/list";
import { OrganisationCreate } from "pages/organisations/create";
import { OrganisationList } from "pages/organisations/list";
import { OrganisationEdit } from "pages/organisations/edit";
import { OrganisationShow } from "pages/organisations/show";

function App() {
  const { t, i18n } = useTranslation();
  const OnProd = "https://backend-possible-africa.onrender.com";
  const OnDev = "http://localhost:5000";
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider(
              process.env.NODE_ENV === "production" ? OnProd : OnDev
            )}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "users",
                list: "/users",
                show: "/users/show/:id",
                create: "/users/create",
                edit: "/users/edit/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "organisation_types",
                list: "/organisation_types",
                show: "/organisation_types/show/:id",
                create: "/organisation_types/create",
                edit: "/organisation_types/edit/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "organisations",
                list: "/organisations",
                show: "/organisations/show/:id",
                create: "/organisations/create",
                edit: "/organisations/edit/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Header={Header}
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text=""
                          icon={<AppIcon />}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="users" />}
                />
                <Route path="users">
                  <Route index element={<UserList />} />
                  <Route path="show/:id" element={<UserShow />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                  <Route path="create" element={<UserCreate />} />
                </Route>
                <Route path="organisation_types">
                  <Route index element={<OrganisationTypeList />} />
                  <Route path="show/:id" element={<AntdInferencer />} />
                  <Route path="edit/:id" element={<AntdInferencer />} />
                  <Route path="create" element={<AntdInferencer />} />
                </Route>
                <Route path="organisations">
                  <Route index element={<OrganisationList />} />
                  <Route path="show/:id" element={<OrganisationShow />} />
                  <Route path="edit/:id" element={<OrganisationEdit />} />
                  <Route path="create" element={<OrganisationCreate />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
              <Route
                element={
                  <Authenticated>
                    <ThemedLayoutV2
                      Header={Header}
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text="refine Project"
                          icon={<AppIcon />}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
