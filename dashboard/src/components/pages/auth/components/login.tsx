import React from "react";
import {
  LoginFormTypes,
  LoginPageProps,
  useActiveAuthProvider,
  useLink,
  useLogin,
  useRouterContext,
  useRouterType,
  useTranslate,
} from "@refinedev/core";
import {
  bodyStyles,
  containerStyles,
  headStyles,
  layoutStyles,
  titleStyles,
} from "./styles";
import {
  Button,
  Card,
  CardProps,
  Checkbox,
  Col,
  Divider,
  Form,
  FormProps,
  Input,
  Layout,
  LayoutProps,
  Row,
  theme,
  Typography,
} from "antd";
import { ThemedTitleV2 } from "../../../themedLayout/title";
import { useContextSelector } from "use-context-selector";
import { userContext } from "../../../../UserContext";
import jwt_decode from "jwt-decode";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const { useToken } = theme;

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
}) => {
  const { token } = useToken();
  const [form] = Form.useForm<LoginFormTypes>();
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const setUserD = useContextSelector(userContext, (v) => v[1]);

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {/* {title ?? <ThemedTitle collapsed={false} />} */}
        {title ?? <ThemedTitleV2 collapsed={true} />}
      </div>
    );

  const CardTitle = (
    <Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {translate("pages.login.title", "Sign in to your account")}
    </Title>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                className="btn-primary"
                key={provider.name}
                block
                icon={provider.icon}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "8px",
                  backgroundColor: "#6cd9cb",
                  color: "white",
                }}
                onClick={() =>
                  login({
                    providerName: provider.name,
                  })
                }
              >
                {provider.label}
              </Button>
            );
          })}
          <Divider>
            <Text
              style={{
                color: token.colorTextLabel,
              }}
            >
              {translate("pages.login.divider", "or")}
            </Text>
          </Divider>
        </>
      );
    }
    return null;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      email: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    login(values);
  };

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      <Form<LoginFormTypes>
        layout="vertical"
        form={form}
        onSubmitCapture={(event) => {
          event.preventDefault();
        }}
        onFinish={(values) => {
          return login(values, {
            onSuccess: (data) => {
              // console.log("loged in");
              const localStorageToken = localStorage.getItem("refine-auth");
              if (localStorageToken) {
                if (localStorageToken != localStorage.getItem("refine-auth")) {
                  window.location.reload();
                  // console.log("reloading");
                }
                const key = import.meta.env.VITE_JWT_SECRET;
                const decoded: { user: any; iat: number; exp: number } =
                  jwt_decode(localStorageToken, key);
                setUserD((s) => ({
                  ...s,
                  user: { ...decoded.user },
                }));
              }
            },
            onError: (data) => {
              // console.log("login error");
            },
            onSettled: (data) => {
              // console.log("login settled");
            },
          });
        }}
        requiredMark={false}
        initialValues={{
          remember: false,
        }}
        {...formProps}
      >
        <Form.Item
          name="email"
          // label={translate("pages.login.fields.email", "Email")}
          rules={[
            { required: true },
            {
              type: "email",
              message: translate(
                "pages.login.errors.validEmail",
                "Invalid email address"
              ),
            },
          ]}
        >
          <Input
            prefix={
              <UserOutlined
                style={{
                  color: "#2bb19c",
                }}
                className="site-form-item-icon"
              />
            }
            size="large"
            placeholder={translate("pages.login.fields.email", "Email")}
          />
        </Form.Item>
        <Form.Item
          name="password"
          // label={translate("pages.login.fields.password", "Password")}
          rules={[{ required: true }]}
        >
          <Input
            prefix={
              <LockOutlined
                style={{
                  color: "#2bb19c",
                }}
                className="site-form-item-icon"
              />
            }
            type="password"
            placeholder="●●●●●●●●"
            size="large"
          />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          {rememberMe ?? (
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
                style={{
                  fontSize: "12px",
                }}
              >
                {translate("pages.login.buttons.rememberMe", "Remember me")}
              </Checkbox>
            </Form.Item>
          )}
          {forgotPasswordLink ?? (
            <ActiveLink
              style={{
                color: token.colorPrimaryTextHover,
                fontSize: "12px",
                marginLeft: "auto",
              }}
              to="/forgot-password"
            >
              {translate(
                "pages.login.buttons.forgotPassword",
                "Forgot password?"
              )}
            </ActiveLink>
          )}
        </div>
        <Form.Item>
          <Button
            className="btn-primary w-full"
            style={{
              backgroundColor: "#6cd9cb",
              color: "white",
            }}
            htmlType="submit"
            loading={isLoading}
            block
          >
            {translate("pages.login.signin", "Sign in")}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 8 }}>
        {registerLink ?? (
          <Text style={{ fontSize: 12 }}>
            {translate(
              "pages.login.buttons.noAccount",
              "Don’t have an account?"
            )}{" "}
            <ActiveLink
              to="/register"
              style={{
                fontWeight: "bold",
                color: token.colorPrimaryTextHover,
              }}
            >
              {translate("pages.login.signup", "Sign up")}
            </ActiveLink>
          </Text>
        )}
      </div>
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, PageTitle)
          ) : (
            <>
              {PageTitle}
              {CardContent}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};
