import "./init";
import {
  Authenticated,
  CanAccess,
  GitHubBanner,
  Refine,
  useGetIdentity,
} from "@refinedev/core";
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
import { OrganisationList } from "./pages/organisations/list";
import { OrganisationShow } from "./pages/organisations/show";
import { OrganisationEdit } from "./pages/organisations/edit";
import { OrganisationCreate } from "./pages/organisations/create";
import { dataProvider } from "./custom-data-provider/data-provider";
import { EventList } from "./pages/events/list";
import { JobList } from "./pages/jobs/list";
import { JobShow } from "./pages/jobs/show";
import { JobEdit } from "./pages/jobs/edit";
import { JobCreate } from "./pages/jobs/create";
import { OpportunityTypeList } from "./pages/opportunity_types/list";
import { OpportunityTypeShow } from "./pages/opportunity_types/show";
import { OpportunityTypeEdit } from "./pages/opportunity_types/edit";
import { OpportunityTypeCreate } from "./pages/opportunity_types/create";
import { OpportunityList } from "./pages/opportunities/list";
import { OpportunityEdit } from "./pages/opportunities/edit";
import { OpportunityCreate } from "./pages/opportunities/create";
import { OpportunityShow } from "./pages/opportunities/show";
import { EventTypeList } from "./pages/event_types/list";
import { EventTypeEdit } from "./pages/event_types/edit";
import { EventTypeShow } from "./pages/event_types/show";
import { EventTypeCreate } from "./pages/event_types/create";
import { EventEdit } from "./pages/events/edit";
import { EventCreate } from "./pages/events/create";
import { EventShow } from "./pages/events/show";
import { RegisterPage } from "./components/pages/auth/components";
import { PostList } from "./pages/posts/list";
import { PostEdit } from "./pages/posts/edit";
import { PostCreate } from "./pages/posts/create";
import { PostShow } from "./pages/posts/show";
import { PostCategoryList } from "./pages/post_categories/list";
import { PostCategoryEdit } from "./pages/post_categories/edit";
import { PostCategoryShow } from "./pages/post_categories/show";
import { PostCategoryCreate } from "./pages/post_categories/create";
import {
  FileTextOutlined,
  GroupOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CustomIconJob from "./custom-components/Icons/CustomIconJob";
import { ThemedTitleV2 } from "./components/themedLayout/title";
import { ThemedSiderV2 } from "./components/themedLayout/sider";

// const prodapi = import.meta.env.VITE_BACKEND_PROD;
const ENV = import.meta.env.VITE_NODE_ENV;
export const API_URL =
  ENV === "developement"
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;
import { AntdInferencer } from "@refinedev/inferencer/antd";
import CustomIconArticle from "./custom-components/Icons/CustomIconArticle";
import CustomIconOrganisation from "./custom-components/Icons/CustomIconOrganisation";
import CustomIconEvent from "./custom-components/Icons/CustomIconEvent";
import CustomIconOpportunity from "./custom-components/Icons/CustomIconOpportunity";
import { UserRoleCreate } from "./pages/user roles/create";
import { UserRoleEdit } from "./pages/user roles/edit";
import { UserRoleList } from "./pages/user roles/list";
import { UserRoleShow } from "./pages/user roles/show";
import { newEnforcer } from "casbin";
import { model, adapter } from "./accessControl";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { AdminOrContributor } from "./custom-components/AccessControl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { update } from "./features/user/userSlice";
import { UserFromDb } from "./types/UserFromDb";
import { Profil } from "./pages/me/list";
import { ProfilEdit } from "./pages/me/edit";
import { OrganisationTypeShow } from "./pages/organisation_types/show";
import { OrganisationTypeEdit } from "./pages/organisation_types/edit";
import { OrganisationTypeCreate } from "./pages/organisation_types/create";
import CustomDashboard from "./pages/dashboard";

function Logo() {
  return <img src="./assets/logos/logo.png" alt="n" />;
}

function App() {
  const { t, i18n } = useTranslation();
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [resource, setResource] = useState([]);
  const onDev = "http://localhost:5000";
  const [userConnected, setUserConnected] = useState<UserFromDb>({
    id: "",
    _id: "",
    username: "",
    avatar: "",
    email: "",
    firstname: "",
    lastname: "",
    role: {
      id: "",
      _id: "",
      name: "",
      slug: "",
    },
    gender: "",
    createdAt: "",
  });
  const [token, setToken] = useState<string>(
    localStorage.getItem("refine-auth")
  );
  // let userConnected: UserFromDb;
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  // get token from local storage
  // if (token) {
  //   setInterval(() => {
  //     token = localStorage.getItem("refine-auth");
  //     if (!token) {
  //       window.location.reload();
  //     }
  //     console.log("again");
  //   }, 500);
  // }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (token) {
    //     if (token !== localStorage.getItem("refine-auth")) {
    //       window.location.reload();
    //     }
    //   } else {
    //     setUserConnected({
    //       id: "",
    //       _id: "",
    //       username: "",
    //       avatar: "",
    //       email: "",
    //       firstname: "",
    //       lastname: "",
    //       role: {
    //         id: "",
    //         _id: "",
    //         name: "",
    //         slug: "",
    //       },
    //       gender: "",
    //       createdAt: "",
    //     });
    //   }
    // }, 500);

    if (token) {
      if (token !== localStorage.getItem("refine-auth")) {
        window.location.reload();
      }
      const key = import.meta.env.VITE_JWT_SECRET;
      const decoded: { user: any; iat: number; exp: number } = jwt_decode(
        token,
        key
      );
      dispatch(
        update({
          id: decoded.user.id,
          role: decoded.user.role.name,
          roleSlug: decoded.user.role.slug,
          username: decoded.user.username,
          lastname: decoded.user.lastname,
          firstname: decoded.user.firstname,
          avatar: decoded.user.avatar,
        })
      );
      setUserConnected({ ...decoded.user });
    }
    // console.log("user", userConnected);
    // console.log("token", token);

    // return () => clearInterval(interval);
  }, [token]);

  const adminOrContributorsRessources = [
    {
      name: "Organisation",
      meta: {
        icon: <CustomIconOrganisation />,
      },
    },
    {
      name: "organisation_types",
      list: "/organisation_types",
      show: "/organisation_types/show/:id",
      create: "/organisation_types/create",
      edit: "/organisation_types/edit/:id",
      meta: {
        label: "Types d'organisations",
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
        label: "Emplois",
        icon: <CustomIconJob />,
      },
    },
    {
      name: "Opportunité",
      meta: {
        label: "Section Opportunités",
        icon: <CustomIconOpportunity />,
      },
    },
    {
      name: "opportunity_types",
      list: "/opportunity_types",
      show: "/opportunity_types/show/:id",
      create: "/opportunity_types/create",
      edit: "/opportunity_types/edit/:id",
      meta: {
        label: "Types d'opportunités",
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
        label: "Opportunités",
        parent: "Opportunité",
        canDelete: true,
      },
    },
    {
      name: "Evenement",
      meta: {
        label: "Section Evènements",
        icon: <CustomIconEvent />,
      },
    },
    {
      name: "event_types",
      list: "/event_types",
      show: "/event_types/show/:id",
      create: "/event_types/create",
      edit: "/event_types/edit/:id",
      meta: {
        label: "Types d'évènements",
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
        label: "Evènements",
        parent: "Evenement",
        canDelete: true,
      },
    },
    {
      name: "Articles",
      meta: {
        label: "Articles",
        icon: <CustomIconArticle />,
      },
    },
    {
      name: "post_categories",
      list: "/post_categories",
      show: "/post_categories/show/:id",
      create: "/post_categories/create",
      edit: "/post_categories/edit/:id",
      meta: {
        label: "Catégories d'articles",
        parent: "Articles",
        canDelete: true,
      },
    },
    {
      name: "posts",
      list: "/posts",
      show: "/posts/show/:id",
      create: "/posts/create",
      edit: "/posts/edit/:id",
      meta: {
        label: "Tous les articles",
        parent: "Articles",
        canDelete: true,
      },
    },
    {
      name: "Utilisateurs",
      meta: {
        label: "Tous les utilisateurs",
        icon: <UserOutlined />,
        canDelete: true,
        token: localStorage.getItem("refine-auth"),
      },
    },
    {
      name: "user_roles",
      list: "/user_roles",
      show: "/user_roles/show/:id",
      create: "/user_roles/create",
      edit: "/user_roles/edit/:id",
      meta: {
        label: "Roles utilisateurs",
        parent: "Utilisateurs",
      },
    },
    {
      name: "users",
      list: "/users",
      show: "/users/show/:id",
      create: "/users/create",
      edit: "/users/edit/:id",
      meta: {
        label: "Utilisateurs",
        parent: "Utilisateurs",
      },
    },
    {
      name: "profil",
      list: "/profil",
      edit: "profil/edit/:id",
      // show: "/users/show/:id",
      // create: "/users/create",
      meta: {
        label: "Profil",
        hided: true,
        // parent: "Utilisateurs",
      },
    },
  ];

  const contributorsRessources = [
    {
      name: "Organisation",
      meta: {
        icon: <CustomIconOrganisation />,
      },
    },
    {
      name: "organisation_types",
      list: "/organisation_types",
      show: "/organisation_types/show/:id",
      create: "/organisation_types/create",
      edit: "/organisation_types/edit/:id",
      meta: {
        label: "Types d'organisations",
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
        label: "Emplois",
        icon: <CustomIconJob />,
      },
    },
    {
      name: "Opportunité",
      meta: {
        label: "Section Opportunités",
        icon: <CustomIconOpportunity />,
      },
    },
    {
      name: "opportunity_types",
      list: "/opportunity_types",
      show: "/opportunity_types/show/:id",
      create: "/opportunity_types/create",
      edit: "/opportunity_types/edit/:id",
      meta: {
        label: "Types d'opportunités",
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
        label: "Opportunités",
        parent: "Opportunité",
        canDelete: true,
      },
    },
    {
      name: "Evenement",
      meta: {
        label: "Section Evènements",
        icon: <CustomIconEvent />,
      },
    },
    {
      name: "event_types",
      list: "/event_types",
      show: "/event_types/show/:id",
      create: "/event_types/create",
      edit: "/event_types/edit/:id",
      meta: {
        label: "Types d'évènements",
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
        label: "Evènements",
        parent: "Evenement",
        canDelete: true,
      },
    },
    {
      name: "Articles",
      meta: {
        label: "Articles",
        icon: <CustomIconArticle />,
      },
    },
    {
      name: "post_categories",
      list: "/post_categories",
      show: "/post_categories/show/:id",
      create: "/post_categories/create",
      edit: "/post_categories/edit/:id",
      meta: {
        label: "Catégories d'articles",
        parent: "Articles",
        canDelete: true,
      },
    },
    {
      name: "posts",
      list: "/posts",
      show: "/posts/show/:id",
      create: "/posts/create",
      edit: "/posts/edit/:id",
      meta: {
        label: "Tous les articles",
        parent: "Articles",
        canDelete: true,
      },
    },
    {
      name: "Utilisateurs",
      meta: {
        label: "Tous les utilisateurs",
        icon: <UserOutlined />,
        canDelete: true,
        token: localStorage.getItem("refine-auth"),
      },
    },
    {
      name: "user_roles",
      list: "/user_roles",
      show: "/user_roles/show/:id",
      create: "/user_roles/create",
      edit: "/user_roles/edit/:id",
      meta: {
        label: "Roles utilisateurs",
        parent: "Utilisateurs",
      },
    },
    {
      name: "profil",
      list: "/profil",
      edit: "profil/edit/:id",
      // show: "/users/show/:id",
      // create: "/users/create",
      meta: {
        label: "Profil",
        hided: true,
        // parent: "Utilisateurs",
      },
    },
  ];

  // userRessources is adminRessources without the create and edit routes

  const userRessources = [
    {
      name: "Organisation",
      meta: {
        icon: <CustomIconOrganisation />,
      },
    },
    {
      name: "organisation_types",
      list: "/organisation_types",
      show: "/organisation_types/show/:id",
      meta: {
        label: "Types d'organisations",
        parent: "Organisation",
        canDelete: true,
      },
    },
    {
      name: "organisations",
      list: "/organisations",
      show: "/organisations/show/:id",
      meta: {
        parent: "Organisation",
        canDelete: true,
      },
    },
    {
      name: "jobs",
      list: "/jobs",
      show: "/jobs/show/:id",
      meta: {
        canDelete: true,
        label: "Emplois",
        icon: <CustomIconJob />,
      },
    },
    {
      name: "Opportunité",
      meta: {
        label: "Section Opportunités",
        icon: <CustomIconOpportunity />,
      },
    },
    {
      name: "opportunity_types",
      list: "/opportunity_types",
      show: "/opportunity_types/show/:id",
      meta: {
        label: "Types d'opportunités",
        parent: "Opportunité",
        canDelete: true,
      },
    },
    {
      name: "opportunities",
      list: "/opportunities",
      show: "/opportunities/show/:id",
      meta: {
        label: "Opportunités",
        parent: "Opportunité",
        canDelete: true,
      },
    },
    {
      name: "Evenement",
      meta: {
        label: "Section Evènements",
        icon: <CustomIconEvent />,
      },
    },
    {
      name: "event_types",
      list: "/event_types",
      show: "/event_types/show/:id",
      meta: {
        label: "Types d'évènements",
        parent: "Evenement",
        canDelete: true,
      },
    },
    {
      name: "events",
      list: "/events",
      show: "/events/show/:id",
      meta: {
        label: "Evènements",
        parent: "Evenement",
        canDelete: true,
      },
    },
    {
      name: "Articles",
      meta: {
        label: "Articles",
        icon: <CustomIconArticle />,
      },
    },
    {
      name: "post_categories",
      list: "/post_categories",
      show: "/post_categories/show/:id",
      meta: {
        label: "Catégories d'articles",
        parent: "Articles",
        canDelete: true,
      },
    },
    {
      name: "posts",
      list: "/posts",
      show: "/posts/show/:id",
      meta: {
        label: "Tous les articles",
        parent: "Articles",
        canDelete: true,
      },
    },
    // {
    //   name: "Utilisateurs",
    //   meta: {
    //     label: "Tous les utilisateurs",
    //     icon: <UserOutlined />,
    //     canDelete: true,
    //     token: localStorage.getItem("refine-auth"),
    //   },
    // },
    {
      name: "profil",
      list: "/profil",
      edit: "profil/edit/:id",
      // show: "/users/show/:id",
      // create: "/users/create",
      meta: {
        label: "Profil",
        hided: true,
        // parent: "Utilisateurs",
      },
    },
  ];

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider(API_URL)}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            DashboardPage={CustomDashboard}
            resources={
              // @ts-ignore
              userConnected.role.slug === "admin"
                ? adminOrContributorsRessources
                : // @ts-ignore
                userConnected.role.slug === "contributor"
                ? contributorsRessources
                : userRessources
            }
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
                      Sider={() => (
                        <ThemedSiderV2
                          Title={() => <ThemedTitleV2 collapsed />}
                        />
                      )}
                      Title={() => <ThemedTitleV2 collapsed />}
                      Header={() => <Header isSticky={true} />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                {/* @ts-ignore */}
                {userConnected.role.slug === "admin" ? (
                  <>
                    <Route
                      index
                      // element={<NavigateToResource resource="organisations" />}
                      element={<CustomDashboard />}
                    />

                    <Route path="organisation_types">
                      <Route index element={<OrganisationTypeList />} />
                      <Route
                        path="show/:id"
                        element={<OrganisationTypeShow />}
                      />
                      <Route
                        path="edit/:id"
                        element={<OrganisationTypeEdit />}
                      />
                      <Route
                        path="create"
                        element={<OrganisationTypeCreate />}
                      />
                    </Route>
                    <Route path="organisations">
                      <Route index element={<OrganisationList />} />
                      <Route path="show/:id" element={<OrganisationShow />} />
                      <Route path="edit/:id" element={<OrganisationEdit />} />
                      <Route path="create" element={<OrganisationCreate />} />
                    </Route>
                    <Route path="jobs">
                      <Route index element={<JobList />} />
                      <Route path="show/:id" element={<JobShow />} />
                      <Route path="edit/:id" element={<JobEdit />} />
                      <Route path="create" element={<JobCreate />} />
                    </Route>

                    <Route path="opportunity_types">
                      <Route index element={<OpportunityTypeList />} />
                      <Route
                        path="show/:id"
                        element={<OpportunityTypeShow />}
                      />
                      <Route
                        path="edit/:id"
                        element={<OpportunityTypeEdit />}
                      />
                      <Route
                        path="create"
                        element={<OpportunityTypeCreate />}
                      />
                    </Route>
                    <Route path="opportunities">
                      <Route index element={<OpportunityList />} />
                      <Route path="show/:id" element={<OpportunityShow />} />
                      <Route path="edit/:id" element={<OpportunityEdit />} />
                      <Route path="create" element={<OpportunityCreate />} />
                    </Route>
                    <Route path="event_types">
                      <Route index element={<EventTypeList />} />
                      <Route path="show/:id" element={<EventTypeShow />} />
                      <Route path="edit/:id" element={<EventTypeEdit />} />
                      <Route path="create" element={<EventTypeCreate />} />
                    </Route>
                    <Route path="events">
                      <Route index element={<EventList />} />
                      <Route path="show/:id" element={<EventShow />} />
                      <Route path="edit/:id" element={<EventEdit />} />
                      <Route path="create" element={<EventCreate />} />
                    </Route>
                    <Route path="post_categories">
                      <Route index element={<PostCategoryList />} />
                      <Route path="show/:id" element={<PostCategoryShow />} />
                      <Route path="edit/:id" element={<PostCategoryEdit />} />
                      <Route path="create" element={<PostCategoryCreate />} />
                    </Route>
                    <Route path="posts">
                      <Route index element={<PostList />} />
                      <Route path="show/:id" element={<PostShow />} />
                      <Route path="edit/:id" element={<PostEdit />} />
                      <Route path="create" element={<PostCreate />} />
                    </Route>
                    <Route path="user_roles">
                      <Route index element={<UserRoleList />} />
                      <Route path="show/:id" element={<UserRoleShow />} />
                      <Route path="edit/:id" element={<UserRoleEdit />} />
                      <Route path="create" element={<UserRoleCreate />} />
                    </Route>
                    <Route path="users">
                      <Route index element={<UserList />} />
                      <Route path="show/:id" element={<UserShow />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="create" element={<UserCreate />} />
                    </Route>
                    <Route path="profil">
                      <Route index element={<Profil />} />
                      <Route path="edit/:id" element={<ProfilEdit />} />
                      {/* <Route path="show/:id" element={<UserShow />} /> */}
                      {/* <Route path="create" element={<UserCreate />} /> */}
                    </Route>
                  </>
                ) : // @ts-ignore
                userConnected.role.slug === "contributor" ? (
                  <>
                    <Route
                      index
                      // element={<NavigateToResource resource="organisations" />}
                      element={<CustomDashboard />}
                    />
                    <Route path="organisation_types">
                      <Route index element={<OrganisationTypeList />} />
                      <Route
                        path="show/:id"
                        element={<OrganisationTypeShow />}
                      />
                      <Route
                        path="edit/:id"
                        element={<OrganisationTypeEdit />}
                      />
                      <Route
                        path="create"
                        element={<OrganisationTypeCreate />}
                      />
                    </Route>
                    <Route path="organisations">
                      <Route index element={<OrganisationList />} />
                      <Route path="show/:id" element={<OrganisationShow />} />
                      <Route path="edit/:id" element={<OrganisationEdit />} />
                      <Route path="create" element={<OrganisationCreate />} />
                    </Route>
                    <Route path="jobs">
                      <Route index element={<JobList />} />
                      <Route path="show/:id" element={<JobShow />} />
                      <Route path="edit/:id" element={<JobEdit />} />
                      <Route path="create" element={<JobCreate />} />
                    </Route>

                    <Route path="opportunity_types">
                      <Route index element={<OpportunityTypeList />} />
                      <Route
                        path="show/:id"
                        element={<OpportunityTypeShow />}
                      />
                      <Route
                        path="edit/:id"
                        element={<OpportunityTypeEdit />}
                      />
                      <Route
                        path="create"
                        element={<OpportunityTypeCreate />}
                      />
                    </Route>
                    <Route path="opportunities">
                      <Route index element={<OpportunityList />} />
                      <Route path="show/:id" element={<OpportunityShow />} />
                      <Route path="edit/:id" element={<OpportunityEdit />} />
                      <Route path="create" element={<OpportunityCreate />} />
                    </Route>
                    <Route path="event_types">
                      <Route index element={<EventTypeList />} />
                      <Route path="show/:id" element={<EventTypeShow />} />
                      <Route path="edit/:id" element={<EventTypeEdit />} />
                      <Route path="create" element={<EventTypeCreate />} />
                    </Route>
                    <Route path="events">
                      <Route index element={<EventList />} />
                      <Route path="show/:id" element={<EventShow />} />
                      <Route path="edit/:id" element={<EventEdit />} />
                      <Route path="create" element={<EventCreate />} />
                    </Route>
                    <Route path="post_categories">
                      <Route index element={<PostCategoryList />} />
                      <Route path="show/:id" element={<PostCategoryShow />} />
                      <Route path="edit/:id" element={<PostCategoryEdit />} />
                      <Route path="create" element={<PostCategoryCreate />} />
                    </Route>
                    <Route path="posts">
                      <Route index element={<PostList />} />
                      <Route path="show/:id" element={<PostShow />} />
                      <Route path="edit/:id" element={<PostEdit />} />
                      <Route path="create" element={<PostCreate />} />
                    </Route>
                    <Route path="user_roles">
                      <Route index element={<UserRoleList />} />
                      <Route path="show/:id" element={<UserRoleShow />} />
                      <Route path="edit/:id" element={<UserRoleEdit />} />
                      <Route path="create" element={<UserRoleCreate />} />
                    </Route>
                    <Route path="users">
                      <Route index element={<UserList />} />
                      <Route path="show/:id" element={<UserShow />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="create" element={<UserCreate />} />
                    </Route>
                    <Route path="profil">
                      <Route index element={<Profil />} />
                      <Route path="edit/:id" element={<ProfilEdit />} />
                      {/* <Route path="show/:id" element={<UserShow />} /> */}
                      {/* <Route path="create" element={<UserCreate />} /> */}
                    </Route>
                  </>
                ) : (
                  <>
                    <Route
                      index
                      // element={<NavigateToResource resource="organisations" />}
                      element={<CustomDashboard />}
                    />

                    <Route path="organisation_types">
                      <Route index element={<OrganisationTypeList />} />
                      <Route
                        path="show/:id"
                        element={<OrganisationTypeShow />}
                      />
                    </Route>
                    <Route path="organisations">
                      <Route index element={<OrganisationList />} />
                      <Route path="show/:id" element={<OrganisationShow />} />
                    </Route>
                    <Route path="jobs">
                      <Route index element={<JobList />} />
                      <Route path="show/:id" element={<JobShow />} />
                    </Route>

                    <Route path="opportunity_types">
                      <Route index element={<OpportunityTypeList />} />
                      <Route
                        path="show/:id"
                        element={<OpportunityTypeShow />}
                      />
                    </Route>
                    <Route path="opportunities">
                      <Route index element={<OpportunityList />} />
                      <Route path="show/:id" element={<OpportunityShow />} />
                    </Route>
                    <Route path="event_types">
                      <Route index element={<EventTypeList />} />
                      <Route path="show/:id" element={<EventTypeShow />} />
                    </Route>
                    <Route path="events">
                      <Route index element={<EventList />} />
                      <Route path="show/:id" element={<EventShow />} />
                    </Route>
                    <Route path="post_categories">
                      <Route index element={<PostCategoryList />} />
                      <Route path="show/:id" element={<PostCategoryShow />} />
                    </Route>
                    <Route path="posts">
                      <Route index element={<PostList />} />
                      <Route path="show/:id" element={<PostShow />} />
                    </Route>
                    <Route path="profil">
                      <Route index element={<Profil />} />
                      <Route path="edit/:id" element={<ProfilEdit />} />
                      {/* <Route path="show/:id" element={<UserShow />} /> */}
                      {/* <Route path="create" element={<UserCreate />} /> */}
                    </Route>
                  </>
                )}
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route
                  path="/register"
                  element={<RegisterPage title={<img />} />}
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>
            {/* @ts-ignore
            {userState.roleSlug === "user" ? (
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2
                        Sider={() => (
                          <ThemedSiderV2
                            Title={() => <ThemedTitleV2 collapsed />}
                          />
                        )}
                        Title={() => <ThemedTitleV2 collapsed />}
                        Header={() => <Header isSticky={true} />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="organisations" />}
                  />

                  <Route path="organisation_types">
                    <Route index element={<OrganisationTypeList />} />
                    <Route path="show/:id" element={<AntdInferencer />} />
                  </Route>
                  <Route path="organisations">
                    <Route index element={<OrganisationList />} />
                    <Route path="show/:id" element={<OrganisationShow />} />
                  </Route>
                  <Route path="jobs">
                    <Route index element={<JobList />} />
                    <Route path="show/:id" element={<JobShow />} />
                  </Route>

                  <Route path="opportunity_types">
                    <Route index element={<OpportunityTypeList />} />
                    <Route path="show/:id" element={<OpportunityTypeShow />} />
                  </Route>
                  <Route path="opportunities">
                    <Route index element={<OpportunityList />} />
                    <Route path="show/:id" element={<OpportunityShow />} />
                  </Route>
                  <Route path="event_types">
                    <Route index element={<EventTypeList />} />
                    <Route path="show/:id" element={<EventTypeShow />} />
                  </Route>
                  <Route path="events">
                    <Route index element={<EventList />} />
                    <Route path="show/:id" element={<EventShow />} />
                  </Route>
                  <Route path="post_categories">
                    <Route index element={<PostCategoryList />} />
                    <Route path="show/:id" element={<PostCategoryShow />} />
                  </Route>
                  <Route path="posts">
                    <Route index element={<PostList />} />
                    <Route path="show/:id" element={<PostShow />} />
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
                  <Route
                    path="/register"
                    element={<RegisterPage title={<img />} />}
                  />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>
            ) : null} */}

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
