import React from "react";
import { useActiveAuthProvider, useGetIdentity } from "@refinedev/core";
import { Avatar, Layout as AntdLayout, Space, theme, Typography } from "antd";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";

const { Text } = Typography;
const { useToken } = theme;

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
}) => {
  const { token } = useToken();
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const shouldRenderHeader = user && (user.firstname || user.avatar);

  if (!shouldRenderHeader) {
    return null;
  }

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
        <Space size="middle">
          {user?.lastname && (
            <Text strong>
              {user.lastname} {user.firstname}
            </Text>
          )}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
