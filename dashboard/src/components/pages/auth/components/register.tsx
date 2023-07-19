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
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      <Form<RegisterFormTypes>
        layout="horizontal"
        form={form}
        onFinish={(values) => register(values)}
        requiredMark={false}
        {...formProps}
      >
        <Form.Item
          name="email"
          label={translate("pages.register.fields.email", "Email")}
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
            size="large"
            placeholder={translate("pages.register.fields.email", "Email")}
          />
        </Form.Item>
        <Form.Item
          name="lastname"
          label={translate("pages.register.fields.lastname", "Lastname")}
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
            size="large"
            placeholder={translate(
              "pages.register.fields.lastname",
              "Lastname"
            )}
          />
        </Form.Item>
        <Form.Item
          name="firstname"
          label={translate("pages.register.fields.firstname", "Firstname")}
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
            size="large"
            placeholder={translate(
              "pages.register.fields.firstname",
              "Firstname"
            )}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={translate("pages.register.fields.password", "Password")}
          rules={[{ required: true }]}
        >
          <Input type="password" placeholder="●●●●●●●●" size="large" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={translate(
            "pages.register.fields.confirmPassword",
            "Confirm Password"
          )}
          rules={[
            {
              required: true,
              message: "Veuillez confirmer votre mot de passe.",
            },
            { validator: validatePassword },
          ]}
        >
          <Input type="password" placeholder="●●●●●●●●" size="large" />
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
              {translate("pages.login.buttons.haveAccount", "Have an account?")}{" "}
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
            type="primary"
            size="large"
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
