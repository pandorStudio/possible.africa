import { useContextSelector } from "use-context-selector";
import { userContext } from "../UserContext";

export function Connected({ children }) {
  const user = useContextSelector(userContext, (v) => v[0].user);
  if (user) {
    // dispatch(update(user));
    // console.log(user);
    return <>{children}</>;
  }
  return <div>Vous n'êtes pas connecté !</div>;
}

export function AdminOrContributor({ children }) {
  const user = useContextSelector(userContext, (v) => v[0].user);
  if (user?.role?.slug === "admin" || user?.role?.slug === "contributor") {
    return <>{children}</>;
  }
  return null;
}

export function AdminOrContributorOrUser({ children }) {
  const user = useContextSelector(userContext, (v) => v[0].user);
  if (
    user?.role?.slug === "admin" ||
    user?.role?.slug === "contributor" ||
    user?.role?.slug === "user"
  ) {
    return <>{children}</>;
  }
  return null;
}

export function Admin({ children }) {
  const user = useContextSelector(userContext, (v) => v[0].user);
  // console.log(user);
  if (user?.role?.slug === "admin") {
    return <>{children}</>;
  }
  return null;
}

export function Contributor({ children }) {
  const user = useContextSelector(userContext, (v) => v[0].user);
  if (user?.role?.slug === "contributor") {
    return <>{children}</>;
  }

  return null;
}

export function User({ children }) {
  const user = useContextSelector(userContext, (v) => v[0].user);
  if (user?.role?.slug === "user") {
    return <>{children}</>;
  }

  return null;
}
