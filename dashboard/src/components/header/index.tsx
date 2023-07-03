import { DownOutlined } from "@ant-design/icons";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useGetLocale, useLink, useRouterContext, useRouterType, useSetLocale } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  Space,
  Switch,
  Typography,
  theme,
} from "antd";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  role: string;
  roleSlug: string;
  username: string;
  lastname: string;
  firstname: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
}) => {
  const { token } = useToken();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);
  const routerType = useRouterType();
  const NewLink = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;

  const currentLocale = locale();

  const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
    .sort()
    .map((lang: string) => ({
      key: lang,
      onClick: () => changeLanguage(lang),
      icon: (
        <span style={{ marginRight: 8 }}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`} />
        </span>
      ),
      label: lang === "fr" ? "Français" : lang === "en" ? "English" : "Deutsch",
    }));

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "70px",
  };

  if (isSticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        <Dropdown
          menu={{
            items: menuItems,
            selectedKeys: currentLocale ? [currentLocale] : [],
          }}
        >
          <Button type="text">
            <Space>
              <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
              {currentLocale === "fr"
                ? "Français"
                : currentLocale === "en"
                ? "English"
                : "Deutsch"}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "light"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.lastname && (
            <Link to="profil">
              <Text strong>
                {user.lastname} {user.firstname}
              </Text>
            </Link>
          )}
          {user?.avatar && (
            <Link to="profil">
              <Avatar src={user?.avatar} alt={user?.name} />
            </Link>
          )}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
