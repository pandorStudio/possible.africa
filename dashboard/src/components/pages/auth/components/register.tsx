import React from "react";
import {
  RegisterFormTypes,
  RegisterPageProps,
  useActiveAuthProvider,
  useLink,
  useRegister,
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
import jwt_decode from "jwt-decode";
import { useContextSelector } from "use-context-selector";
import { userContext } from "../../../../UserContext";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const { useToken } = theme;

type RegisterProps = RegisterPageProps<LayoutProps, CardProps, FormProps>;
/**
 * **refine** has register page form which is served on `/register` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
  providers,
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
}) => {
  const { token } = useToken();
  const [form] = Form.useForm<RegisterFormTypes>();
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const setUserD = useContextSelector(userContext, (v) => v[1]);

  const authProvider = useActiveAuthProvider();
  const { mutate: register, isLoading } = useRegister<RegisterFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

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
        {<ThemedTitleV2 collapsed={true} />}
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
      {translate("pages.register.title", "Sign up for your account")}
    </Title>
  );

  const validatePassword = (_: any, value: string | undefined) => {
    const { getFieldValue } = form;

    if (value && value !== getFieldValue("password")) {
      return Promise.reject(
        new Error("Les deux mots de passe ne sont pas identiques.")
      );
    }

    return Promise.resolve();
  };

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                className="btn-primary"
                key={provider.name}
                type="default"
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
                  register({
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

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
        maxHeight: "60vh",
        overflowY: "scroll",
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      <Form<RegisterFormTypes>
        layout="vertical"
        form={form}
        onFinish={(values) => {
          return register(values, {
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
        {...formProps}
      >
        <Form.Item
          name="email"
          // label={translate("pages.register.fields.email", "Email")}
          rules={[
            { required: true },
            {
              type: "email",
              message: translate(
                "pages.register.errors.validEmail",
                "Invalid email address"
              ),
            },
          ]}
        >
          <Input
            prefix={
              <MailOutlined
                style={{
                  color: "#2bb19c",
                }}
                className="site-form-item-icon"
              />
            }
            size="large"
            placeholder={translate("pages.register.fields.email", "Email")}
          />
        </Form.Item>
        <Form.Item
          name="lastname"
          // label={translate("pages.register.fields.lastname", "Lastname")}
          rules={[
            { required: true },
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              type: "text",
              message: translate(
                "pages.register.errors.validLastname",
                "Mauvais Nom de famille"
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
            placeholder={translate(
              "pages.register.fields.lastname",
              "Lastname"
            )}
          />
        </Form.Item>
        <Form.Item
          name="firstname"
          // label={translate("pages.register.fields.firstname", "Firstname")}
          rules={[
            { required: true },
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              type: "text",
              message: translate(
                "pages.register.errors.validFirstname",
                "Mauvaises entrée pour le.s prénom.s"
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
            placeholder={translate(
              "pages.register.fields.firstname",
              "Firstname"
            )}
          />
        </Form.Item>
        <Form.Item
          name="password"
          // label={translate("pages.register.fields.password", "Password")}
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
        <Form.Item
          name="confirmPassword"
          // label={translate(
          //   "pages.register.fields.confirmPassword",
          //   "Confirm Password"
          // )}
          rules={[
            {
              required: true,
              message: "Veuillez confirmer votre mot de passe.",
            },
            { validator: validatePassword },
          ]}
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
          {loginLink ?? (
            <Text
              style={{
                fontSize: 12,
                marginLeft: "auto",
              }}
            >
              {translate("pages.login.buttons.noAccount", "Have an account?")}{" "}
              <ActiveLink
                style={{
                  fontWeight: "bold",
                  color: token.colorPrimaryTextHover,
                }}
                to="/login"
              >
                {translate("pages.login.signin", "Sign in")}
              </ActiveLink>
            </Text>
          )}
        </div>

        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Button
            style={{
              backgroundColor: "#6cd9cb",
              color: "white",
            }}
            className="btn-primary w-full"
            htmlType="submit"
            loading={isLoading}
            block
          >
            {translate("pages.register.buttons.submit", "Sign up")}
          </Button>
        </Form.Item>
      </Form>
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
