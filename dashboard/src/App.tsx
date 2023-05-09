import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { UserList } from "./pages/users/list";
import { UserShow } from "./pages/users/show";
import { UserEdit } from "./pages/users/edit";
import { UserCreate } from "./pages/users/create";
import { OrganisationTypeList } from "./pages/organisation_types/list";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { OrganisationList } from "./pages/organisations/list";
import { OrganisationShow } from "./pages/organisations/show";
import { OrganisationEdit } from "./pages/organisations/edit";
import { OrganisationCreate } from "./pages/organisations/create";
import { dataProvider } from "./custom-data-provider/data-provider";
import { EventList } from "./pages/events/list";

// const prodapi = import.meta.env.VITE_BACKEND_PROD;
const ENV = import.meta.env.VITE_NODE_ENV;
export const API_URL =
  ENV === "developement"
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;

function App() {
  const { t, i18n } = useTranslation();

  const onDev = "http://localhost:5000";
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
            dataProvider={dataProvider(API_URL, axiosInstance)}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            resources={[
              {
                name: "users",
                list: "/users",
                show: "/users/show/:id",
                create: "/users/create",
                edit: "/users/edit/:id",
                meta: {
                  canDelete: true,
                  token: localStorage.getItem("refine-auth"),
                },
              },
              {
                name: "Organisation",
              },
              {
                name: "organisation_types",
                list: "/organisation_types",
                show: "/organisation_types/show/:id",
                create: "/organisation_types/create",
                edit: "/organisation_types/edit/:id",
                meta: {
                  parent: "Organisation",
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
                  parent: "Organisation",
                  canDelete: true,
                },
              },
              {
                name: "jobs",
                list: "/jobs",
                show: "/jobs/show/:id",
                create: "/jobs/create",
                edit: "/jobs/edit/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "Opportunité",
              },
              {
                name: "opportunity_types",
                list: "/opportunity_types",
                show: "/opportunity_types/show/:id",
                create: "/opportunity_types/create",
                edit: "/opportunity_types/edit/:id",
                meta: {
                  parent: "Opportunité",
                  canDelete: true,
                },
              },
              {
                name: "opportunities",
                list: "/opportunities",
                show: "/opportunities/show/:id",
                create: "/opportunities/create",
                edit: "/opportunities/edit/:id",
                meta: {
                  parent: "Opportunité",
                  canDelete: true,
                },
              },
              {
                name: "Evenement",
              },
              {
                name: "event_types",
                list: "/event_types",
                show: "/event_types/show/:id",
                create: "/event_types/create",
                edit: "/event_types/edit/:id",
                meta: {
                  parent: "Evenement",
                  canDelete: true,
                },
              },
              {
                name: "events",
                list: "/events",
                show: "/events/show/:id",
                create: "/events/create",
                edit: "/events/edit/:id",
                meta: {
                  parent: "Evenement",
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
                    <ThemedLayoutV2 Header={() => <Header isSticky={true} />}>
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
                <Route path="jobs">
                  <Route index element={<AntdInferencer />} />
                  <Route path="show/:id" element={<AntdInferencer />} />
                  <Route path="edit/:id" element={<AntdInferencer />} />
                  <Route path="create" element={<AntdInferencer />} />
                </Route>

                <Route path="opportunity_types">
                  <Route index element={<AntdInferencer />} />
                  <Route path="show/:id" element={<AntdInferencer />} />
                  <Route path="edit/:id" element={<AntdInferencer />} />
                  <Route path="create" element={<AntdInferencer />} />
                </Route>
                <Route path="opportunities">
                  <Route index element={<AntdInferencer />} />
                  <Route path="show/:id" element={<AntdInferencer />} />
                  <Route path="edit/:id" element={<AntdInferencer />} />
                  <Route path="create" element={<AntdInferencer />} />
                </Route>
                <Route path="event_types">
                  <Route index element={<AntdInferencer />} />
                  <Route path="show/:id" element={<AntdInferencer />} />
                  <Route path="edit/:id" element={<AntdInferencer />} />
                  <Route path="create" element={<AntdInferencer />} />
                </Route>
                <Route path="events">
                  <Route index element={<AntdInferencer />} />
                  <Route path="show/:id" element={<AntdInferencer />} />
                  <Route path="edit/:id" element={<AntdInferencer />} />
                  <Route path="create" element={<AntdInferencer />} />
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
