import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";
import { AppIcon } from "components/app-icon";

export const Login = () => {
  const icon = <AppIcon page="login" />;
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2 collapsed={false} text="" icon={icon} />
      }
      formProps={{
        initialValues: { email: "john@mail.com", password: "iuhfiuqhewufhw" },
      }}
    />
  );
};
