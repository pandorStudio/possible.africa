import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { DeleteButton, Show, TagField, TextField } from "@refinedev/antd";
import { Space, Typography } from "antd";
import { AdminOrContributor } from "../../custom-components/AccessControl";

const { Title } = Typography;

export const EventTypeShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        extra: (
          <AdminOrContributor>
            <Space>
              <DeleteButton recordItemId={record?.id} />
            </Space>
          </AdminOrContributor>
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
