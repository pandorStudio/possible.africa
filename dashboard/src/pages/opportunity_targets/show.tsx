import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { DeleteButton, Show, TextField } from "@refinedev/antd";
import { Space, Typography } from "antd";
import { Admin } from "../../custom-components/AccessControl";

const { Title } = Typography;

export const OpportunityTargetShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        extra: (
          <Admin>
            <Space>
              <DeleteButton recordItemId={record?.id} />
            </Space>
          </Admin>
        ),
      }}
    >
      <Title level={5}>Nom</Title>
      <TextField value={record?.name} />
      <Title level={5}>Slug</Title>
      <TextField value={record?.slug} />
    </Show>
  );
};
